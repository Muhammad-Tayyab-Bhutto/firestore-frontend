"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Video, Mic, AlertTriangle, ShieldCheck, BookOpen, Timer, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';


export default function TakeTestPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds

  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Placeholder questions
  const questions = [
    { id: 1, text: "What is the capital of France?", type: "mcq", options: ["Berlin", "Madrid", "Paris", "Rome"] },
    { id: 2, text: "Explain the concept of Object-Oriented Programming.", type: "text" },
    { id: 3, text: "Solve for x: 2x + 5 = 15", type: "mcq", options: ["3", "4", "5", "6"] },
  ];

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);
        setHasMicPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        if (error instanceof Error) {
            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                 toast({
                    variant: 'destructive',
                    title: 'Permissions Denied',
                    description: 'Camera and microphone access are required to take the test. Please enable them in your browser settings.',
                });
                setHasCameraPermission(false);
                setHasMicPermission(false);
            } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError"){
                 toast({
                    variant: 'destructive',
                    title: 'Devices Not Found',
                    description: 'No camera or microphone found. Please ensure they are connected and enabled.',
                });
                setHasCameraPermission(false); // Or set to false if camera is mandatory for mic check
                setHasMicPermission(false);
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error Accessing Devices',
                    description: 'Could not access camera or microphone. Please check your browser settings and ensure no other app is using them.',
                });
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Unknown Device Error',
                description: 'An unexpected error occurred while trying to access your camera and microphone.',
            });
        }
      }
    };
    if (!testStarted) {
        requestPermissions();
    }

    // Cleanup function to stop media tracks when component unmounts or test ends
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [testStarted, toast]);

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (testStarted && timeLeft === 0) {
      // Auto-submit logic or show time up message
      toast({ title: "Time's Up!", description: "Your test has been automatically submitted." });
      // Add actual submission logic here
      setTestStarted(false); // Or navigate to a results page
    }
  }, [testStarted, timeLeft, toast]);


  const handleStartTest = () => {
    if (hasCameraPermission === false || hasMicPermission === false) {
      toast({
        variant: 'destructive',
        title: 'Permissions Required',
        description: 'Camera and microphone access are mandatory to start the test. Please enable them.',
      });
      return;
    }
    setTestStarted(true);
    setTimeLeft(120 * 60); // Reset timer
    // Simulate AI warnings
    setTimeout(() => setShowWarning("AI Alert: Please keep your face clearly visible."), 30000);
    setTimeout(() => setShowWarning(null), 40000);
    setTimeout(() => setShowWarning("AI Alert: Multiple faces detected. Please ensure you are alone."), 90000);
    setTimeout(() => setShowWarning(null), 100000);
  };
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h.toString().padStart(2, '0') + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  if (hasCameraPermission === null || hasMicPermission === null) {
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
  
  const currentQ = questions[currentQuestionIndex];

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
              <li>Violations will result in immediate test termination and disqualification.</li>
              <li>You have 120 minutes to complete the test once started.</li>
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

            <div className="grid grid-cols-2 gap-4 pt-4">
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
              disabled={hasCameraPermission === false || hasMicPermission === false}
            >
              Start Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Test Interface
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-screen bg-muted/30">
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
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mt-2 h-2" />
          </CardHeader>
          <CardContent className="flex-grow p-6 space-y-4 overflow-y-auto">
            <p className="text-lg">{currentQ.text}</p>
            {currentQ.type === "mcq" && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start text-left h-auto py-3">
                    {option}
                  </Button>
                ))}
              </div>
            )}
            {currentQ.type === "text" && (
              <textarea
                rows={8}
                className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary text-sm"
                placeholder="Type your answer here..."
              />
            )}
          </CardContent>
          <CardFooter className="border-t p-3 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev -1))} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-1 h-4 w-4"/> Previous
            </Button>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}>
                Next <ChevronRight className="ml-1 h-4 w-4"/>
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Send className="mr-1 h-4 w-4"/> Submit Test
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
           {showWarning && (
            <Alert variant="destructive" className="flex-none">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>AI Proctoring Alert!</AlertTitle>
              <AlertDescription>{showWarning}</AlertDescription>
            </Alert>
          )}
          <Card className="shadow-md flex-grow flex flex-col">
             <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary"/> Security Status</CardTitle>
             </CardHeader>
             <CardContent className="p-4 text-sm space-y-2 text-muted-foreground">
                <p className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500"/> Fullscreen Active</p>
                <p className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500"/> Tab Focus Locked</p>
                <p className="flex items-center gap-1"><Video className="h-4 w-4 text-green-500"/> Camera Streaming</p>
                <p className="flex items-center gap-1"><Mic className="h-4 w-4 text-green-500"/> Microphone Active</p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
