import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/layout/app-header';
import { ArrowRight, CheckCircle, FileText, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Streamlined Applications",
      description: "Easily fill and track your admission applications for multiple programs.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Process",
      description: "Robust security measures to protect your data throughout the admission cycle.",
    },
    {
      icon: CheckCircle,
      title: "AI-Powered Validation",
      description: "Fast and efficient challan validation using advanced AI technology.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader isAuthenticated={false} /> {/* Show login/register buttons */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">
              Welcome to AdmitPro
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Your gateway to a seamless and secure admission experience. Apply to your dream programs with ease and confidence.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/login">
                  Applicant Login
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12 text-primary">
              Why Choose AdmitPro?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-6">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-secondary-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of applicants and take the first step towards your future.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/register">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-primary text-primary-foreground text-center">
        <p>&copy; {new Date().getFullYear()} AdmitPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
