
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Video, Mic, AlertTriangle, ShieldCheck, BookOpen, Timer, ChevronLeft, ChevronRight, Send, CheckCircle, Loader2, ListChecks } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTestQuestions, submitTestAnswers } from '@/ai/flows/test-session-flow';
import type { TestQuestion, SubmitTestAnswersOutput } from '@/ai/flows/test-session-types';

interface ViolationDialogState {
  isOpen: boolean;
  reason: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const INITIAL_TIME_LEFT_SECONDS = 120 * 60; // 120 minutes

export default function TakeTestPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT_SECONDS); 
  const [testInstructions, setTestInstructions] = useState<string | null>(null);
  const [submissionDetails, setSubmissionDetails] = useState<SubmitTestAnswersOutput | null>(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const [testStarted, _setTestStarted] = useState(false);
  const testStartedRef = useRef(testStarted);
  const setTestStarted = (val: boolean) => {
    testStartedRef.current = val;
    _setTestStarted(val);
  };

  const [testSubmitted, _setTestSubmitted] = useState(false);
  const testSubmittedRef = useRef(testSubmitted);
  const setTestSubmitted = (val: boolean) => {
    testSubmittedRef.current = val;
    _setTestSubmitted(val);
  };

  const [isSubmitting, _setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(isSubmitting);
  const setIsSubmitting = (val: boolean) => {
    isSubmittingRef.current = val;
    _setIsSubmitting(val);
  };
  
  const [answers, _setAnswers] = useState<Record<string, string>>({});
  const answersRef = useRef(answers);
  const setAnswersState = (updater: React.SetStateAction<Record<string, string>>) => {
    const newAnswers = typeof updater === 'function' ? updater(answersRef.current) : updater;
    answersRef.current = newAnswers;
    _setAnswers(newAnswers);
  };

  const [shuffledQuestions, _setShuffledQuestions] = useState<TestQuestion[]>([]);
  const shuffledQuestionsRef = useRef(shuffledQuestions);
  const setShuffledQuestionsState = (newQuestions: TestQuestion[]) => {
    shuffledQuestionsRef.current = newQuestions;
    _setShuffledQuestions(newQuestions);
  };
  
  const [violationDialogState, _setViolationDialogState] = useState<ViolationDialogState>({ isOpen: false, reason: '', onConfirm: () => {}, onCancel: undefined });
  const violationDialogStateRef = useRef(violationDialogState);
  const setViolationDialogState = (updater: React.SetStateAction<ViolationDialogState>) => {
      const newState = typeof updater === 'function' ? updater(violationDialogStateRef.current) : updater;
      violationDialogStateRef.current = newState;
      _setViolationDialogState(newState);
  };

  const requestPermissions = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = mediaStream;
      setHasCameraPermission(true);
      setHasMicPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(e => console.warn("Video play failed on initial permission grant:", e));
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      const errorName = error instanceof Error ? error.name : "UnknownError";
      let title = 'Error Accessing Devices';
      let description = 'Could not access camera or microphone. Please check your browser settings and ensure no other app is using them.';

      if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
        title = 'Permissions Denied';
        description = 'Camera and microphone access are required to take the test. Please enable them in your browser settings.';
      } else if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") {
        title = 'Devices Not Found';
        description = 'No camera or microphone found. Please ensure they are connected and enabled.';
      }
      
      toast({ variant: 'destructive', title, description });
      setHasCameraPermission(false);
      setHasMicPermission(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!testStartedRef.current && (hasCameraPermission === null || hasMicPermission === null) && !streamRef.current) {
      requestPermissions();
    }
  }, [hasCameraPermission, hasMicPermission, requestPermissions]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const currentStream = streamRef.current;
    if (videoElement && currentStream && videoElement.srcObject !== currentStream) {
        videoElement.srcObject = currentStream;
        videoElement.play().catch(error => console.warn("Video play failed when setting srcObject:", error));
    }
  }, [hasCameraPermission, hasMicPermission]);

  const enterFullScreen = useCallback(async () => {
    if (document.fullscreenElement) return;
    const elem = document.documentElement;
    try {
        if (elem.requestFullscreen) {
            await elem.requestFullscreen({ navigationUI: "hide" });
        } else if ((elem as any).webkitRequestFullscreen) { 
            await (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) { 
            await (elem as any).msRequestFullscreen();
        }
    } catch (err) {
        console.warn("Fullscreen request failed:", err instanceof Error ? err.message : err);
        if (testStartedRef.current && !testSubmittedRef.current) { // Only toast if test is active
            toast({variant: 'destructive', title: "Fullscreen Error", description: "Could not enter fullscreen mode automatically. Please try manually enabling it (usually F11) or ensure your browser allows it. This is required for the test."})
        }
    }
  }, [toast]);

  const exitFullScreen = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.warn("Error exiting fullscreen:", err instanceof Error ? err.message : err);
      }
    }
  }, []);

  const handleSubmitTest = useCallback(async (isAutoSubmit = false, autoSubmitReason = "Proctoring violation") => {
    if (testSubmittedRef.current || isSubmittingRef.current) return;

    setIsSubmitting(true);
    
    if (document.fullscreenElement) {
      await exitFullScreen();
    }
    
    try {
      const currentAnswers = answersRef.current;
      const currentQuestions = shuffledQuestionsRef.current;
      const validAnswers: Record<string, string> = {};
      currentQuestions.forEach(q => {
        const answer = currentAnswers[q.id.toString()];
        if (answer !== undefined && answer !== null) {
          validAnswers[q.id.toString()] = answer;
        }
      });
      
      const response = await submitTestAnswers({ 
        testId: 'SAMPLE_TEST_001', 
        answers: validAnswers,
        isAutoSubmitted: isAutoSubmit,
        autoSubmitReason: isAutoSubmit ? autoSubmitReason : undefined
      });
      
      setSubmissionDetails(response); 

      if (response.success) {
        toast({ 
            variant: isAutoSubmit ? 'destructive' : 'default', 
            title: isAutoSubmit ? "Test Terminated" : "Test Submitted!", 
            description: `${isAutoSubmit ? `Test submitted automatically: ${autoSubmitReason}. ` : ''}${response.message}`
        });
        setTestSubmitted(true);
        setTestStarted(false); 
      } else {
        toast({ variant: 'destructive', title: "Submission Failed", description: response.message });
      }
    } catch (error) {
        toast({ variant: 'destructive', title: "Submission Error", description: "Could not submit your test. Please try again or contact support."});
        console.error("Error submitting answers:", error);
    } finally {
        setIsSubmitting(false);
    }
  }, [toast, exitFullScreen]);


  const showViolationWarningDialog = useCallback((reason: string, onConfirmAction: () => void, onCancelAction?: () => void) => {
    if (isSubmittingRef.current || testSubmittedRef.current || violationDialogStateRef.current.isOpen) return;

    setViolationDialogState({
      isOpen: true,
      reason,
      onConfirm: () => {
        onConfirmAction();
        setViolationDialogState(prev => ({ ...prev, isOpen: false, reason: '', onConfirm: () => {}, onCancel: undefined }));
      },
      onCancel: () => {
        if (onCancelAction) onCancelAction();
        setViolationDialogState(prev => ({ ...prev, isOpen: false, reason: '', onConfirm: () => {}, onCancel: undefined }));
      }
    });
  }, []);


  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (testStartedRef.current && !testSubmittedRef.current && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (testStartedRef.current && !testSubmittedRef.current && timeLeft === 0) {
      toast({ title: "Time's Up!", description: "Your test will be submitted automatically." });
      handleSubmitTest(true, "Time expired"); 
    }
    return () => clearInterval(timerId);
  }, [timeLeft, handleSubmitTest, toast]); 
  
  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
      if (!testStartedRef.current || testSubmittedRef.current || violationDialogStateRef.current.isOpen) return;
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your test progress might be lost and the test will be submitted.';
  }, []);

  const handleVisibilityChange = useCallback(() => {
      if (document.hidden && testStartedRef.current && !testSubmittedRef.current && !isSubmittingRef.current && !violationDialogStateRef.current.isOpen) {
        const reason = "Tab switched or window minimized. This is a violation.";
        showViolationWarningDialog(
            reason, 
            () => handleSubmitTest(true, "Tab switched or window minimized")
        );
      }
  }, [handleSubmitTest, showViolationWarningDialog]);
    
  const handleWindowBlur = useCallback(() => {
      if (testStartedRef.current && !testSubmittedRef.current && !isSubmittingRef.current && !violationDialogStateRef.current.isOpen) {
         if (document.activeElement && (document.activeElement.tagName === 'BODY' || document.activeElement.tagName === 'HTML')) {
            // Check if an AlertDialog (our own) is the active element to prevent false positives
            const activeDialog = document.querySelector('[role="alertdialog"]');
            if (activeDialog && activeDialog.contains(document.activeElement)) {
                return;
            }
            const reason = "Test window lost focus. This is a violation.";
            showViolationWarningDialog(
                reason, 
                () => handleSubmitTest(true, "Test window lost focus")
            );
         }
      }
  }, [handleSubmitTest, showViolationWarningDialog]);

  const handleFullscreenChange = useCallback(() => {
      if (!document.fullscreenElement && testStartedRef.current && !testSubmittedRef.current && !isSubmittingRef.current && !violationDialogStateRef.current.isOpen) {
          const reason = "Fullscreen mode exited. This is a violation.";
          showViolationWarningDialog(
            reason, 
            () => handleSubmitTest(true, "Fullscreen mode exited"),
            async () => { 
                // Attempt to re-enter fullscreen if test is still active
                if(testStartedRef.current && !testSubmittedRef.current && !document.fullscreenElement) {
                    await enterFullScreen(); 
                }
            } 
          );
      }
  }, [handleSubmitTest, showViolationWarningDialog, enterFullScreen]);

  const disableContextMenu = useCallback((e: MouseEvent) => {
      if (!testStartedRef.current || testSubmittedRef.current || violationDialogStateRef.current.isOpen) return;
      e.preventDefault();
  }, []);

  const disableShortcuts = useCallback((e: KeyboardEvent) => {
    if (!testStartedRef.current || testSubmittedRef.current || violationDialogStateRef.current.isOpen) return;

    const keyLower = e.key.toLowerCase();

    // Allow Escape key to exit fullscreen (it will be caught by fullscreenchange listener)
    if (e.key === 'Escape' && document.fullscreenElement) {
        return; 
    }
    
    // Common Ctrl/Cmd shortcuts
    if ((e.ctrlKey || e.metaKey) && 
        ['a', 'c', 'v', 'x', 'z', 'y', 's', 'p', 'r', 't', 'n', 'w', 'f', 'h', 'o', 'l', 'k', 'g', 'd', 'b', 'm', 'q', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(keyLower)) {
      e.preventDefault(); return;
    }
    // Ctrl+Shift combinations (like dev tools)
    if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 'k', 'l', 'e'].includes(keyLower)) {
      e.preventDefault(); return;
    }
    // Alt key combinations (Alt+Tab is OS level, Alt+F4, Alt+arrows)
    if (e.altKey && (e.key === 'Tab' || keyLower === 'f4' || e.key.startsWith('Arrow') || e.key === 'Home')) {
      e.preventDefault(); return;
    }
    // Function keys (F1-F12)
    if (e.key.startsWith('F') && !isNaN(parseInt(e.key.substring(1), 10))) {
       e.preventDefault(); return;
    }
    // Other problematic keys
    const otherBlockedKeys = ['PrintScreen', 'ContextMenu', 'ScrollLock', 'Pause', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'Delete', 'Help'];
    if (otherBlockedKeys.includes(e.key) ) {
       e.preventDefault(); return;
    }
  }, []); 


  useEffect(() => {
    if (testStarted && !testSubmitted && !violationDialogState.isOpen) {
      enterFullScreen(); // Attempt to enter fullscreen when test starts/resumes
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleWindowBlur);
      document.addEventListener('fullscreenchange', handleFullscreenChange); 
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange); 
      document.addEventListener('mozfullscreenchange', handleFullscreenChange); 
      document.addEventListener('MSFullscreenChange', handleFullscreenChange); 
      document.addEventListener('contextmenu', disableContextMenu);
      document.addEventListener('keydown', disableShortcuts, { capture: true }); // Use capture phase
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        document.removeEventListener('fullscreenchange', handleFullscreenChange); 
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        document.removeEventListener('contextmenu', disableContextMenu);
        document.removeEventListener('keydown', disableShortcuts, { capture: true });
      };
    } else if (!testStarted || testSubmitted || violationDialogState.isOpen) {
        // Cleanup if test is not active, or submitted, or a dialog is open
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        document.removeEventListener('contextmenu', disableContextMenu);
        document.removeEventListener('keydown', disableShortcuts, { capture: true });
        
        // If test is submitted and still in fullscreen, exit
        if (testSubmitted && document.fullscreenElement) {
            exitFullScreen();
        }
    }
  }, [testStarted, testSubmitted, violationDialogState.isOpen, handleBeforeUnload, handleVisibilityChange, handleWindowBlur, handleFullscreenChange, disableContextMenu, disableShortcuts, enterFullScreen, exitFullScreen]);


  useEffect(() => {
    // Component unmount cleanup
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (document.fullscreenElement) {
         exitFullScreen();
      }
       // Clear all event listeners on unmount as a final safety measure
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableShortcuts, { capture: true });
    };
  }, [exitFullScreen, handleBeforeUnload, handleVisibilityChange, handleWindowBlur, handleFullscreenChange, disableContextMenu, disableShortcuts]);


  const handleStartTest = async () => {
    if (hasCameraPermission !== true || hasMicPermission !== true) {
      toast({
        variant: 'destructive',
        title: 'Permissions Required',
        description: 'Camera and microphone access are mandatory to start the test. Please enable them.',
      });
      requestPermissions(); 
      return;
    }
     if (!videoRef.current?.srcObject && hasCameraPermission === true) { 
        toast({
            variant: 'destructive',
            title: 'Camera Stream Error',
            description: 'Camera permission is granted, but the video stream is not available. Please try refreshing or checking browser settings.',
        });
        return;
    }

    setIsLoadingQuestions(true);
    try {
      const { questions: fetchedQuestions, instructions } = await getTestQuestions({ testId: 'SAMPLE_TEST_001' }); 
      
      const array = [...fetchedQuestions];
      // Fisher-Yates shuffle
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      setShuffledQuestionsState(array);   
      setTestInstructions(instructions || "No specific instructions provided. Follow general test guidelines.");
      
      setCurrentQuestionIndex(0);
      setAnswersState({}); 
      setTimeLeft(INITIAL_TIME_LEFT_SECONDS); 
      setSubmissionDetails(null);
      setTestSubmitted(false); 
      setTestStarted(true); // This will trigger the useEffect to enter fullscreen and add listeners
      
    } catch (error) {
      toast({ variant: 'destructive', title: "Failed to Load Test", description: "Could not fetch test questions. Please try again."});
      console.error("Error fetching questions:", error);
      setTestStarted(false); 
    } finally {
      setIsLoadingQuestions(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h.toString().padStart(2, '0') + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    if (testSubmittedRef.current || isSubmittingRef.current) return;
    setAnswersState(prev => ({ ...prev, [questionId.toString()]: answer }));
  };
  
  if ((hasCameraPermission === null || hasMicPermission === null) && !testStartedRef.current && !streamRef.current) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle>Loading Test Environment</CardTitle>
          <CardDescription className="mt-2">Requesting camera and microphone permissions...</CardDescription>
          <div className="mt-4 flex justify-center">
             <Timer className="h-12 w-12 animate-spin text-primary" />
          </div>
        </Card>
      </div>
    );
  }
  
  const currentQ = testStartedRef.current && shuffledQuestionsRef.current.length > 0 ? shuffledQuestionsRef.current[currentQuestionIndex] : null;

  if (testSubmitted && submissionDetails) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-lg p-8 text-center">
          <CheckCircle className={`h-16 w-16 mx-auto mb-4 ${submissionDetails.proctoringViolation ? 'text-destructive' : (submissionDetails.passed === true ? 'text-green-500' : (submissionDetails.passed === false ? 'text-yellow-500' : 'text-muted-foreground'))}`} />
          <CardTitle className="text-2xl">Test Submitted!</CardTitle>
          <CardDescription className="mt-2 mb-4">
            {submissionDetails.message || "Your answers have been recorded."}
          </CardDescription>
          {submissionDetails.score !== undefined && (
            <p className="text-xl font-semibold">Your Score: {submissionDetails.score}%</p>
          )}
          {submissionDetails.passed !== undefined && (
            <p className={`text-lg font-medium ${submissionDetails.passed ? 'text-green-600' : 'text-red-600'}`}>
              Status: {submissionDetails.passed ? 'Passed' : 'Failed'}
            </p>
          )}
          {submissionDetails.proctoringViolation && (
            <Alert variant="destructive" className="mt-4 text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Proctoring Violation Recorded</AlertTitle>
                <AlertDescription>
                    This test session was flagged due to a proctoring violation. The result may be subject to review.
                </AlertDescription>
            </Alert>
          )}
          <Button onClick={() => window.location.href = '/dashboard'} className="mt-6">Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary flex items-center gap-2">
              <ShieldCheck className="h-8 w-8" /> Secure Online Screening Test
            </CardTitle>
            <CardDescription>Prepare for your test. Please read the instructions carefully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">Instructions:</h3>
            {isLoadingQuestions && <div className="flex items-center justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /> <span className="ml-2">Loading instructions...</span></div>}
            {testInstructions && !isLoadingQuestions && (
                <ScrollArea className="h-48 border rounded-md p-4 bg-muted/30">
                    <div className="whitespace-pre-wrap text-sm text-muted-foreground">{testInstructions}</div>
                </ScrollArea>
            )}
            {!testInstructions && !isLoadingQuestions && <p className="text-muted-foreground">Loading instructions...</p>}


            {(hasCameraPermission === false || hasMicPermission === false) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Permissions Required</AlertTitle>
                <AlertDescription>
                  Camera and/or microphone access are denied or unavailable. You cannot start the test.
                  Please enable permissions in your browser settings and ensure your devices are connected.
                  You may need to refresh the page after enabling permissions.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                    <h4 className="font-semibold mb-1 text-center">Camera Preview</h4>
                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted border" autoPlay muted playsInline />
                    {hasCameraPermission === true ? (
                        <p className="text-xs text-green-600 flex items-center justify-center mt-1"><Video className="h-3 w-3 mr-1"/> Camera Connected</p>
                    ) : (
                        <p className="text-xs text-red-600 flex items-center justify-center mt-1"><Video className="h-3 w-3 mr-1"/> Camera {hasCameraPermission === false ? "Denied/Unavailable" : "Checking..."}</p>
                    )}
                </div>
                 <div>
                    <h4 className="font-semibold mb-1 text-center">Microphone Status</h4>
                    <div className="w-full aspect-video rounded-md bg-muted border flex items-center justify-center">
                       {hasMicPermission === true ? <Mic className="h-16 w-16 text-green-500"/> : <Mic className="h-16 w-16 text-red-500"/>}
                    </div>
                     {hasMicPermission === true ? (
                        <p className="text-xs text-green-600 flex items-center justify-center mt-1"><Mic className="h-3 w-3 mr-1"/> Microphone Connected</p>
                    ) : (
                        <p className="text-xs text-red-600 flex items-center justify-center mt-1"><Mic className="h-3 w-3 mr-1"/> Microphone {hasMicPermission === false ? "Denied/Unavailable" : "Checking..."}</p>
                    )}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleStartTest} 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
              disabled={isLoadingQuestions || hasCameraPermission !== true || hasMicPermission !== true}
            >
              {isLoadingQuestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoadingQuestions ? "Loading Test..." : "Start Test"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* This AlertDialog is for pre-test warnings or critical errors, not proctoring violations during the test */}
        <AlertDialog open={violationDialogState.isOpen && !testStartedRef.current} onOpenChange={(open) => {
            if (!open && violationDialogState.onCancel) {
                 violationDialogState.onCancel(); // Call onCancel if dialog is closed by means other than buttons
            } else if (!open) {
                setViolationDialogState(prev => ({ ...prev, isOpen: false }));
            }
        }}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/> System Alert</AlertDialogTitle>
                <AlertDialogDescription>
                  {violationDialogState.reason}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {violationDialogState.onCancel && <AlertDialogCancel onClick={violationDialogState.onCancel}>Cancel</AlertDialogCancel>}
                <AlertDialogAction onClick={violationDialogState.onConfirm}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

      </div>
    );
  }

  // Test in progress UI
  return (
    <div className="flex flex-col h-[calc(100vh-0rem)] md:h-[calc(100vh-4rem)] max-h-screen bg-background"> {/* Adjusted height for mobile vs desktop */}
      <header className="bg-primary text-primary-foreground p-3 shadow-md flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Online Screening Test</h1>
        </div>
        <div className="flex items-center gap-3">
          <Timer className="h-5 w-5" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-12 gap-0 md:gap-4 p-0 md:p-4 overflow-hidden">
        {/* Question List Sidebar (Hidden on small screens initially, can be toggled) */}
        <Card className="col-span-12 md:col-span-2 shadow-lg flex flex-col hidden md:flex"> {/* Hidden on small screens */}
          <CardHeader className="p-3 border-b">
            <CardTitle className="text-base flex items-center gap-2"><ListChecks className="h-5 w-5 text-primary"/> Questions</CardTitle>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="p-2 space-y-1">
              {shuffledQuestionsRef.current.map((q, index) => (
                <Button
                  key={q.id}
                  variant={currentQuestionIndex === index ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-left h-auto py-2 ${answersRef.current[q.id.toString()]?.trim() ? 'font-semibold' : ''} ${currentQuestionIndex === index ? '' : (answersRef.current[q.id.toString()]?.trim() ? 'border-green-500' : 'border-muted') }`}
                  onClick={() => {if(!testSubmittedRef.current && !violationDialogStateRef.current.isOpen) setCurrentQuestionIndex(index)}}
                  disabled={testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}
                >
                  Q {index + 1} {answersRef.current[q.id.toString()]?.trim() ? <CheckCircle className="ml-auto h-4 w-4 text-green-600" /> : null}
                </Button>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
        
        {/* Main Question Area */}
        <Card className="col-span-12 md:col-span-7 shadow-lg flex flex-col overflow-hidden">
          <CardHeader className="border-b p-3">
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1} of {shuffledQuestionsRef.current.length}</CardTitle>
            <Progress value={shuffledQuestionsRef.current.length > 0 ? ((currentQuestionIndex + 1) / shuffledQuestionsRef.current.length) * 100 : 0} className="mt-2 h-2" />
          </CardHeader>
          {currentQ && (
            <ScrollArea className="flex-grow">
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-lg whitespace-pre-wrap">{currentQ.text}</p>
                {currentQ.type === "mcq" && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map((option, index) => (
                      <Button 
                        key={index} 
                        variant={answersRef.current[currentQ.id.toString()] === option ? "default" : "outline"} 
                        className="w-full justify-start text-left h-auto py-3 whitespace-normal"
                        onClick={() => handleAnswerChange(currentQ.id, option)}
                        disabled={testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
                {currentQ.type === "text" && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Please provide your answer in the text area below. For complex formatting (e.g., mathematical equations, code blocks), please use standard conventions as rich text input is not currently supported.
                    </p>
                    <textarea
                      rows={8}
                      className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary text-sm bg-background disabled:opacity-70 disabled:bg-muted/50"
                      placeholder="Type your answer here..."
                      value={answersRef.current[currentQ.id.toString()] || ""}
                      onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      disabled={testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}
                    />
                  </>
                )}
                {currentQ.type === "truefalse" && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map((option, index) => (
                      <Button 
                        key={index} 
                        variant={answersRef.current[currentQ.id.toString()] === option ? "default" : "outline"} 
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleAnswerChange(currentQ.id, option)}
                        disabled={testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          )}
          <CardFooter className="border-t p-3 flex justify-between shrink-0">
            <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev -1))} disabled={currentQuestionIndex === 0 || testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}>
              <ChevronLeft className="mr-1 h-4 w-4"/> Previous
            </Button>
            {currentQuestionIndex < shuffledQuestionsRef.current.length - 1 ? (
              <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(shuffledQuestionsRef.current.length - 1, prev + 1))} disabled={testSubmittedRef.current || isSubmittingRef.current || violationDialogStateRef.current.isOpen}>
                Next <ChevronRight className="ml-1 h-4 w-4"/>
              </Button>
            ) : (
              <Button 
                onClick={() => {
                    showViolationWarningDialog(
                        "Are you sure you want to submit your test? This action cannot be undone.",
                        () => handleSubmitTest(false, "Manual submission"), // onConfirm
                        () => {} // onCancel
                    )
                }} 
                className="bg-green-600 hover:bg-green-700 text-white" 
                disabled={isSubmittingRef.current || testSubmittedRef.current || violationDialogStateRef.current.isOpen}
              >
                {isSubmittingRef.current ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4"/>}
                {isSubmittingRef.current ? "Submitting..." : "Submit Test"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Video and Security Status (Hidden on small screens initially) */}
        <div className="col-span-12 md:col-span-3 space-y-0 md:space-y-4 flex flex-col hidden md:flex"> {/* Hidden on small screens */}
          <Card className="shadow-md flex-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-base flex items-center gap-2"><Video className="h-5 w-5 text-primary"/> Your Video</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <video ref={videoRef} className="w-full aspect-video rounded-md bg-background border" autoPlay muted playsInline />
            </CardContent>
          </Card>
          <Card className="shadow-md flex-grow flex flex-col">
             <CardHeader className="p-3 pb-1">
                <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary"/> Security Status</CardTitle>
             </CardHeader>
             <ScrollArea>
              <CardContent className="p-3 text-xs space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500"/> Fullscreen Active</p>
                  <p className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500"/> Tab Focus Monitored</p>
                  <p className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500"/> Fullscreen Exit Monitored</p>
                  <p className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500"/> Page Exit/Refresh Warnings Active</p>
                  <p className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500"/> Shortcuts/Context Menu Restricted</p>
                  <p className="flex items-center gap-1"><Video className="h-3 w-3 text-green-500"/> Camera Streaming</p>
                  <p className="flex items-center gap-1"><Mic className="h-3 w-3 text-green-500"/> Microphone Active</p>
              </CardContent>
             </ScrollArea>
          </Card>
        </div>
      </div>
      
      {/* Violation Dialog (only when test is started) */}
      {violationDialogState.isOpen && testStartedRef.current && (
         <AlertDialog open={violationDialogState.isOpen} onOpenChange={(open) => {
            if (!open) { // If dialog is closed by means other than buttons (e.g. Escape key on dialog itself, or overlay click)
                if (violationDialogState.onCancel) {
                    violationDialogState.onCancel(); // Trigger the cancel action if defined
                } else {
                     // Default close action if no specific onCancel (e.g. for submit confirmation)
                    setViolationDialogState(prev => ({ ...prev, isOpen: false, reason: '', onConfirm: () => {}, onCancel: undefined }));
                }
            }
          }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive h-6 w-6"/> Proctoring Violation Alert</AlertDialogTitle>
              <AlertDialogDescription className="py-4">
                {violationDialogState.reason}
                <br/><br/>
                {violationDialogState.reason.toLowerCase().includes("submit your test") 
                    ? "This action cannot be undone." 
                    : "Confirming this action will result in your test being submitted immediately and may be flagged for review."
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {
                if (violationDialogState.onCancel) violationDialogState.onCancel();
                else setViolationDialogState(prev => ({ ...prev, isOpen: false, reason: '', onConfirm: () => {}, onCancel: undefined }));
              }}>
                {violationDialogState.reason.toLowerCase().includes("submit your test") ? "Cancel" : "Cancel / Go Back"}
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={violationDialogState.onConfirm} 
                className={violationDialogState.reason.toLowerCase().includes("submit your test") ? "bg-green-600 hover:bg-green-700" : "bg-destructive hover:bg-destructive/90"}>
                {violationDialogState.reason.toLowerCase().includes("submit your test") ? "Confirm Submission" : "Acknowledge & Submit Test"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
