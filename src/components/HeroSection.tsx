import { Button } from "@/components/ui/button";
import { Search, MapPin, Star } from "lucide-react";
import heroWorker from "@/assets/hero-worker.png";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-primary" />
            Trusted by 10,000+ homeowners
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Home repairs,{" "}
            <span className="text-gradient">made simple.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Connect with verified local professionals for plumbing, electrical, carpentry, AC repair, and more — all in just a few taps.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Your location"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="hero" className="h-12 px-8 rounded-xl">
              Search
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Verified Workers
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Instant Booking
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Secure Payments
            </div>
          </div>
        </div>

        <div className="flex-1 relative max-w-md">
          <div className="absolute inset-0 bg-hero-gradient rounded-3xl opacity-10 blur-3xl scale-110" />
          <img
            src={heroWorker}
            alt="Professional service worker ready to help"
            className="relative z-10 w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
