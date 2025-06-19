"use client";
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, CheckCircle } from "lucide-react";

// Placeholder data - in a real app, this would come from an API
const availableSlots: Record<string, string[]> = {
  "2024-10-25": ["09:00 AM - 11:00 AM", "02:00 PM - 04:00 PM"],
  "2024-10-26": ["10:00 AM - 12:00 PM"],
  "2024-11-01": ["09:00 AM - 11:00 AM", "01:00 PM - 03:00 PM", "04:00 PM - 06:00 PM"],
};

const testCenters = [
  { id: "tc1", name: "Main Campus Test Center" },
  { id: "tc2", name: "City Center Hall A" },
  { id: "tc3", name: "Online Proctored (Remote)" },
];

export function TestBookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedCenter, setSelectedCenter] = useState<string | undefined>(undefined);
  const [currentSlots, setCurrentSlots] = useState<string[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTime(undefined); // Reset time when date changes
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      setCurrentSlots(availableSlots[dateString] || []);
    } else {
      setCurrentSlots([]);
    }
  };

  const handleBooking = () => {
    if (!date || !selectedTime || !selectedCenter) {
      toast({
        title: "Incomplete Selection",
        description: "Please select a date, time slot, and test center.",
        variant: "destructive",
      });
      return;
    }
    // Placeholder for booking logic
    console.log("Booking details:", { date, selectedTime, selectedCenter });
    setIsBooked(true);
    toast({
      title: "Test Slot Booked!",
      description: `Your test is booked for ${format(date, "PPP")} at ${selectedTime}, ${testCenters.find(tc => tc.id === selectedCenter)?.name}.`,
    });
  };
  
  if (isBooked && date && selectedTime && selectedCenter) {
    return (
       <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center gap-2">
            <CheckCircle className="h-7 w-7 text-green-500" /> Test Slot Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-lg">
          <p><strong>Date:</strong> {format(date, "PPP (EEEE)")}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Center:</strong> {testCenters.find(tc => tc.id === selectedCenter)?.name}</p>
          <p className="text-sm text-muted-foreground pt-2">Your admit card will be available for download soon. Please check the "Admit Card" section.</p>
        </CardContent>
        <CardFooter>
           <Button onClick={() => setIsBooked(false)} variant="outline">Book Another Slot (Change)</Button>
        </CardFooter>
      </Card>
    );
  }


  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Select Test Slot</CardTitle>
        <CardDescription>Choose your preferred date, time, and center for the screening test.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="testDate" className="text-base flex items-center gap-2 mb-2"><CalendarIcon className="h-5 w-5 text-primary"/>Test Date</Label>
           <Popover>
            <PopoverTrigger asChild>
              <Button
                id="testDate"
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() -1)) || !Object.keys(availableSlots).includes(format(d, "yyyy-MM-dd"))} // Disable past dates & dates without slots
              />
            </PopoverContent>
          </Popover>
        </div>

        {date && currentSlots.length > 0 && (
          <div>
            <Label htmlFor="timeSlot" className="text-base flex items-center gap-2 mb-2"><Clock className="h-5 w-5 text-primary"/>Available Time Slots</Label>
            <Select onValueChange={setSelectedTime} value={selectedTime}>
              <SelectTrigger id="timeSlot">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {currentSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {date && currentSlots.length === 0 && (
           <p className="text-sm text-muted-foreground text-center py-2 border rounded-md bg-muted/50">No slots available for the selected date. Please choose another date.</p>
        )}

        <div>
          <Label htmlFor="testCenter" className="text-base flex items-center gap-2 mb-2"><MapPin className="h-5 w-5 text-primary"/>Test Center</Label>
          <Select onValueChange={setSelectedCenter} value={selectedCenter}>
            <SelectTrigger id="testCenter">
              <SelectValue placeholder="Select a test center" />
            </SelectTrigger>
            <SelectContent>
              {testCenters.map((center) => (
                <SelectItem key={center.id} value={center.id}>{center.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBooking} disabled={!date || !selectedTime || !selectedCenter} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
}
