import { Button } from "@/components/ui/button";
import { Smartphone, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="download" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative rounded-3xl bg-hero-gradient p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Get FixNow on your phone
            </h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-8 text-lg">
              Download the app and book your first service in under 2 minutes. Available for Android and iOS.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold shadow-lg"
              >
                Download for Android
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl font-semibold"
              >
                Download for iOS
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
