import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Wrench, ArrowLeft, Star, MapPin, Clock, Search } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Worker {
  id: string;
  skill: string;
  experience_years: number;
  location: string | null;
  rating: number;
  total_jobs: number;
  profile?: { full_name: string };
}

const BookingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    supabase.from("service_categories").select("*").then(({ data }) => {
      setCategories((data as Category[]) || []);
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    supabase
      .from("worker_profiles")
      .select("*, profile:profiles(full_name)")
      .eq("category_id", selectedCategory)
      .eq("is_available", true)
      .then(({ data }) => {
        setWorkers((data as unknown as Worker[]) || []);
      });
  }, [selectedCategory]);

  const handleBook = async () => {
    if (!user || !selectedWorker || !address) return;
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      customer_id: user.id,
      worker_id: selectedWorker,
      category_id: selectedCategory,
      address,
      description,
    });
    if (error) {
      toast.error("Failed to book service: " + error.message);
    } else {
      toast.success("Service booked successfully!");
      navigate("/dashboard");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate("/dashboard")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold text-foreground">Book a Service</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? "bg-hero-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{s}</div>
              <span className={`text-sm hidden sm:block ${s <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s === 1 ? "Category" : s === 2 ? "Worker" : "Details"}
              </span>
              {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Choose a service</h2>
            <p className="text-muted-foreground mb-6">Select the type of service you need</p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setStep(2); }}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    selectedCategory === cat.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Worker */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Choose a worker</h2>
            <p className="text-muted-foreground mb-6">Select a verified professional</p>
            {workers.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No workers available in this category yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {workers.map(w => (
                  <button
                    key={w.id}
                    onClick={() => { setSelectedWorker(w.id); setStep(3); }}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      selectedWorker === w.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    style={{ boxShadow: "var(--card-shadow)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold shrink-0">
                        {((w as any).profile?.full_name || w.skill).substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{(w as any).profile?.full_name || "Worker"}</h3>
                        <p className="text-sm text-primary font-medium">{w.skill}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-primary text-primary" />{w.rating}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{w.experience_years} yrs</span>
                          {w.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{w.location}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Confirm details</h2>
            <p className="text-muted-foreground mb-6">Provide your address and describe the issue</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address *</label>
                <input
                  type="text"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description (optional)</label>
                <textarea
                  placeholder="Describe the issue or work needed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <Button
                variant="hero"
                className="w-full h-12 rounded-xl"
                onClick={handleBook}
                disabled={!address || submitting}
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
