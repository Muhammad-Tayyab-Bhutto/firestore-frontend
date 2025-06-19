import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent/10 via-background to-background">
      <header className="p-4">
        <Link href="/" aria-label="Back to homepage">
          <Logo size="md" />
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <RegisterForm />
      </main>
       <footer className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} AdmitPro. All rights reserved.
      </footer>
    </div>
  );
}
