import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle, ListChecks } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Test Centers - Admin - AdmitPro",
};

// Placeholder data for test centers
const testCenters = [
  { id: "TC001", name: "Main Campus Auditorium", city: "Capital City", capacity: 200, availableSeats: 50 },
  { id: "TC002", name: "City Center Hall A", city: "Metropolis", capacity: 150, availableSeats: 25 },
  { id: "TC003", name: "North Wing Labs", city: "Capital City", capacity: 100, availableSeats: 100 },
  { id: "TC004", name: "Online Proctored System", city: "Remote", capacity: 500, availableSeats: 350 },
];

export default function AdminTestCentersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline font-semibold text-primary">Manage Test Centers & Availability</h1>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Test Center
        </Button>
      </div>
      <p className="text-muted-foreground">
        Configure test centers, manage seat availability, and oversee system readiness for screening tests.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testCenters.map(center => (
          <Card key={center.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Building className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{center.name}</CardTitle>
              </div>
              <CardDescription>{center.city}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong className="text-muted-foreground">Capacity:</strong> {center.capacity} seats</p>
              <p className="text-sm"><strong className="text-muted-foreground">Available Seats:</strong> <span className={center.availableSeats < center.capacity * 0.2 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{center.availableSeats}</span></p>
              <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                <div 
                    className={`h-2.5 rounded-full ${center.availableSeats/center.capacity > 0.5 ? 'bg-green-500' : center.availableSeats/center.capacity > 0.2 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                    style={{ width: `${( (center.capacity - center.availableSeats) / center.capacity) * 100}%` }}>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                <ListChecks className="mr-2 h-4 w-4" /> Manage Availability
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
