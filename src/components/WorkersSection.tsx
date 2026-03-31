import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const workers = [
  { name: "Rajesh Kumar", skill: "Plumber", rating: 4.9, jobs: 230, location: "Sector 15", exp: "8 yrs", avatar: "RK" },
  { name: "Amit Sharma", skill: "Electrician", rating: 4.8, jobs: 185, location: "Downtown", exp: "6 yrs", avatar: "AS" },
  { name: "Vikram Singh", skill: "AC Technician", rating: 4.9, jobs: 310, location: "MG Road", exp: "10 yrs", avatar: "VS" },
  { name: "Suresh Patel", skill: "Carpenter", rating: 4.7, jobs: 145, location: "Civil Lines", exp: "5 yrs", avatar: "SP" },
];

const WorkersSection = () => {
  return (
    <section id="workers" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Top-rated <span className="text-gradient">professionals</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Verified, experienced, and ready to help with your home needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {workers.map((w) => (
            <div
              key={w.name}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              style={{ boxShadow: "var(--card-shadow)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
            >
              <div className="w-14 h-14 rounded-xl bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                {w.avatar}
              </div>
              <h3 className="font-semibold text-foreground">{w.name}</h3>
              <p className="text-sm text-primary font-medium mb-3">{w.skill}</p>

              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  {w.rating} · {w.jobs} jobs
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {w.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {w.exp} experience
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full rounded-xl">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkersSection;
