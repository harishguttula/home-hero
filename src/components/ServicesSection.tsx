import { Wrench, Zap, Hammer, Wind, HardHat, Paintbrush } from "lucide-react";

const services = [
  { icon: Wrench, name: "Plumbing", desc: "Pipe repairs, leaks, installations", color: "bg-primary/10 text-primary" },
  { icon: Zap, name: "Electrical", desc: "Wiring, switches, fixtures", color: "bg-accent/10 text-accent" },
  { icon: Hammer, name: "Carpentry", desc: "Furniture, doors, cabinets", color: "bg-primary/10 text-primary" },
  { icon: Wind, name: "AC & HVAC", desc: "Repair, maintenance, installation", color: "bg-accent/10 text-accent" },
  { icon: HardHat, name: "Civil Work", desc: "Masonry, tiling, construction", color: "bg-primary/10 text-primary" },
  { icon: Paintbrush, name: "Painting", desc: "Interior, exterior, touch-ups", color: "bg-accent/10 text-accent" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Services at your <span className="text-gradient">fingertips</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse categories and find the right professional for any home repair or maintenance need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.name}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
              style={{ boxShadow: "var(--card-shadow)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
            >
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
