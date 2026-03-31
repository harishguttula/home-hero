import { Search, UserCheck, CalendarCheck, ThumbsUp } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Search a Service", desc: "Browse categories or search for the service you need." },
  { icon: UserCheck, step: "02", title: "Choose a Worker", desc: "Compare ratings, experience, and availability of verified pros." },
  { icon: CalendarCheck, step: "03", title: "Book & Confirm", desc: "Pick a time, confirm your address, and book instantly." },
  { icon: ThumbsUp, step: "04", title: "Get It Done", desc: "Your pro arrives on time. Rate and review after completion." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            How <span className="text-gradient">FixNow</span> works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Book a trusted professional in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="w-20 h-20 rounded-2xl bg-hero-gradient mx-auto mb-5 flex items-center justify-center shadow-lg">
                <s.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">{s.step}</span>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
