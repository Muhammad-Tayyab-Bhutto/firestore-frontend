
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Video, Mic, AlertTriangle, ShieldCheck, BookOpen, Timer, ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getTestQuestions, submitTestAnswers, type TestQuestion } from '@/ai/flows/test-session-flow';

export default function TakeTestPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [proctoringWarning, setProctoringWarning] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // question.id (string) -> answer

  const videoRef = useRef<HTMLVideoElement>(null);
  const testContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCameraPermission(true);
      setHasMicPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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
    if (!testStarted && hasCameraPermission === null && hasMicPermission === null) {
      requestPermissions();
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [testStarted, requestPermissions, hasCameraPermission, hasMicPermission]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (testStarted && timeLeft > 0 && !testSubmitted) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (testStarted && timeLeft === 0 && !testSubmitted) {
      toast({ title: "Time's Up!", description: "Your test will be submitted automatically." });
      handleSubmitTest(true); // Auto-submit
    }
    return () => clearInterval(timerId);
  }, [testStarted, timeLeft, toast, testSubmitted]);
  
  const handleFullscreenAndFocus = useCallback(() => {
    // Fullscreen
    if (testContainerRef.current && !document.fullscreenElement) {
      testContainerRef.current.requestFullscreen().catch(err => {
        toast({variant: 'destructive', title: "Fullscreen Failed", description: "Could not enter fullscreen mode. Please try manually."})
        console.warn("Cannot enter fullscreen", err);
      });
    }

    // Tab focus listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setProctoringWarning("AI Alert: You have switched tabs/windows. This is being monitored.");
        // In a real scenario, this could trigger more severe actions.
      } else {
        setProctoringWarning(null);
      }
    };
    const handleBlur = () => {
       setProctoringWarning("AI Alert: Test window lost focus. Please return to the test immediately.");
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [toast]);


  const handleStartTest = async () => {
    if (hasCameraPermission === false || hasMicPermission === false) {
      toast({
        variant: 'destructive',
        title: 'Permissions Required',
        description: 'Camera and microphone access are mandatory to start the test. Please enable them.',
      });
      return;
    }

    setIsLoadingQuestions(true);
    try {
      const { questions: fetchedQuestions } = await getTestQuestions({ testId: 'SAMPLE_TEST_001' }); // Replace with actual test ID
      
      // Shuffle questions
      const array = [...fetchedQuestions];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      setQuestions(array);
      
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTimeLeft(120 * 60);
      setTestStarted(true);
      setTestSubmitted(false);
      setProctoringWarning(null);
      
      // Setup fullscreen and focus listeners
      const cleanupFocusListeners = handleFullscreenAndFocus();
      // Store cleanup function to call when test ends or component unmounts
      // This is a bit simplified; in a real app, manage this more robustly
      (window as any).cleanupFocusListeners = cleanupFocusListeners;


      // Simulate AI warnings
      setTimeout(() => setProctoringWarning("AI Alert: Please keep your face clearly visible."), 30000);
      setTimeout(() => setProctoringWarning(null), 40000);
      // setTimeout(() => setProctoringWarning("AI Alert: Multiple faces detected. Please ensure you are alone."), 90000);
      // setTimeout(() => setProctoringWarning(null), 100000);
    } catch (error) {
      toast({ variant: 'destructive', title: "Failed to Load Test", description: "Could not fetch test questions. Please try again."});
      console.error("Error fetching questions:", error);
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
    setAnswers(prev => ({ ...prev, [questionId.toString()]: answer }));
  };

  const handleSubmitTest = async (isAutoSubmit = false) => {
    if (!isAutoSubmit) {
      const unansweredQuestions = questions.filter(q => !answers[q.id.toString()]?.trim());
      if (unansweredQuestions.length > 0) {
        toast({ variant: "destructive", title: "Incomplete Test", description: `Please answer all ${questions.length} questions before submitting. You have ${unansweredQuestions.length} unanswered.` });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = await submitTestAnswers({ testId: 'SAMPLE_TEST_001', answers });
      if (response.success) {
        toast({ title: "Test Submitted!", description: response.message });
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
         // Cleanup fullscreen and focus listeners
        if ((window as any).cleanupFocusListeners) {
          (window as any).cleanupFocusListeners();
          delete (window as any).cleanupFocusListeners;
        }
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
    }
  };

  if (hasCameraPermission === null || hasMicPermission === null && !testStarted) {
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
  
  const currentQ = testStarted && questions.length > 0 ? questions[currentQuestionIndex] : null;

  if (testSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Test Submitted Successfully!</CardTitle>
          <CardDescription className="mt-2">Your answers have been recorded. You will be notified about the results later.</CardDescription>
          <Button onClick={() => router.push('/dashboard')} className="mt-6">Back to Dashboard</Button>
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
            <ul className="list-disc list-inside space-y-1 text-muted-foreground bg-muted/50 p-4 rounded-md">
              <li>Ensure you are in a quiet, well-lit room, alone.</li>
              <li>Your webcam and microphone must remain on throughout the test.</li>
              <li>The test will be proctored using AI. Any suspicious activity will be flagged.</li>
              <li>Do not switch tabs, open other applications, or use external devices.</li>
              <li>Copying, pasting, or screen recording is strictly prohibited.</li>
              <li>Violations will result in immediate test termination and disqualification (simulated).</li>
              <li>You have {formatTime(timeLeft)} to complete the test once started.</li>
            </ul>

            {(hasCameraPermission === false || hasMicPermission === false) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Permissions Required</AlertTitle>
                <AlertDescription>
                  Camera and microphone access are denied or unavailable. You cannot start the test.
                  Please enable permissions in your browser settings and ensure your devices are connected.
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
                        <p className="text-xs text-red-600 flex items-center justify-center mt-1"><Video className="h-3 w-3 mr-1"/> Camera Access Denied/Unavailable</p>
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
                        <p className="text-xs text-red-600 flex items-center justify-center mt-1"><Mic className="h-3 w-3 mr-1"/> Microphone Access Denied/Unavailable</p>
                    )}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleStartTest} 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
              disabled={isLoadingQuestions || hasCameraPermission === false || hasMicPermission === false}
            >
              {isLoadingQuestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoadingQuestions ? "Loading Questions..." : "Start Test"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Test Interface
  return (
    <div ref={testContainerRef} className="flex flex-col h-[calc(100vh-4rem)] max-h-screen bg-muted/30">
      {/* Header Bar */}
      <div className="bg-primary text-primary-foreground p-3 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Online Screening Test</h1>
        </div>
        <div className="flex items-center gap-3">
          <Timer className="h-5 w-5" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Test Area */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Questions Area (Left/Main Panel) */}
        <Card className="md:col-span-2 shadow-lg flex flex-col overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
            <Progress value={questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0} className="mt-2 h-2" />
          </CardHeader>
          {currentQ && (
            <CardContent className="flex-grow p-6 space-y-4 overflow-y-auto">
              <p className="text-lg">{currentQ.text}</p>
              {currentQ.type === "mcq" && currentQ.options && (
                <div className="space-y-2">
                  {currentQ.options.map((option, index) => (
                    <Button 
                      key={index} 
                      variant={answers[currentQ.id.toString()] === option ? "default" : "outline"} 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleAnswerChange(currentQ.id, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
              {currentQ.type === "text" && (
                <textarea
                  rows={8}
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary text-sm bg-background"
                  placeholder="Type your answer here..."
                  value={answers[currentQ.id.toString()] || ""}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                />
              )}
              {currentQ.type === "truefalse" && currentQ.options && (
                 <div className="space-y-2">
                  {currentQ.options.map((option, index) => (
                    <Button 
                      key={index} 
                      variant={answers[currentQ.id.toString()] === option ? "default" : "outline"} 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleAnswerChange(currentQ.id, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          )}
          <CardFooter className="border-t p-3 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev -1))} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-1 h-4 w-4"/> Previous
            </Button>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}>
                Next <ChevronRight className="ml-1 h-4 w-4"/>
              </Button>
            ) : (
              <Button onClick={() => handleSubmitTest(false)} className="bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4"/>}
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Proctoring Area (Right Panel) */}
        <div className="space-y-4 flex flex-col">
          <Card className="shadow-md flex-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Video className="h-5 w-5 text-primary"/> Your Video</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <video ref={videoRef} className="w-full aspect-video rounded-md bg-background border" autoPlay muted playsInline />
            </CardContent>
          </Card>
           {proctoringWarning && (
            <Alert variant="destructive" className="flex-none">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>AI Proctoring Alert!</AlertTitle>
              <AlertDescription>{proctoringWarning}</AlertDescription>
            </Alert>
          )}
          <Card className="shadow-md flex-grow flex flex-col">
             <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary"/> Security Status</CardTitle>
             </CardHeader>
             <CardContent className="p-4 text-sm space-y-2 text-muted-foreground">
                <p className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500"/> Fullscreen Active (Attempted)</p>
                <p className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500"/> Tab Focus Monitored</p>
                <p className="flex items-center gap-1"><Video className="h-4 w-4 text-green-500"/> Camera Streaming</p>
                <p className="flex items-center gap-1"><Mic className="h-4 w-4 text-green-500"/> Microphone Active</p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
