import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-heading font-bold text-xl tracking-tight">IT STOPS NOW</span>
            <p className="text-sm text-muted-foreground">
              A movement for police wellbeing, accountability and reform. We protect those who protect the public.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/the-issue" className="text-sm text-muted-foreground hover:text-foreground transition-colors">The Issue</Link>
            <Link href="/wall-of-remembrance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Wall of Remembrance</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-2">Resources</h4>
            <Link href="/research" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Data & Evidence</Link>
            <Link href="/recovery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recovery & Support</Link>
            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Events</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-2">Connect</h4>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            <div className="flex gap-4 mt-2">
              {/* Social Icons would go here */}
              <div className="w-8 h-8 rounded-full bg-muted"></div>
              <div className="w-8 h-8 rounded-full bg-muted"></div>
              <div className="w-8 h-8 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} It Stops Now. All rights reserved. Supported by Pocket Sergeant.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
