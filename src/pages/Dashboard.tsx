import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Wrench, LogOut, Calendar, Clock, CheckCircle, XCircle, User, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  description: string | null;
  address: string;
  status: string;
  scheduled_at: string | null;
  created_at: string;
  worker_profile?: { skill: string; location: string | null };
  customer_profile?: { full_name: string };
  category?: { name: string } | null;
}

const Dashboard = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !profile) return;

    const fetchBookings = async () => {
      if (profile.user_type === "customer") {
        const { data } = await supabase
          .from("bookings")
          .select("*, category:service_categories(name)")
          .eq("customer_id", user.id)
          .order("created_at", { ascending: false });
        setBookings((data as Booking[]) || []);
      } else {
        // Worker: get their worker_profile id first
        const { data: wp } = await supabase
          .from("worker_profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();
        if (wp) {
          const { data } = await supabase
            .from("bookings")
            .select("*, category:service_categories(name)")
            .eq("worker_id", wp.id)
            .order("created_at", { ascending: false });
          setBookings((data as Booking[]) || []);
        }
      }
      setLoadingBookings(false);
    };

    fetchBookings();
  }, [user, profile]);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status, ...(status === "completed" ? { completed_at: new Date().toISOString() } : {}) })
      .eq("id", bookingId);
    if (error) {
      toast.error("Failed to update booking");
    } else {
      toast.success(`Booking ${status}`);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4 text-primary" />;
      case "accepted": return <CheckCircle className="w-4 h-4 text-accent" />;
      case "in_progress": return <Calendar className="w-4 h-4 text-primary" />;
      case "completed": return <CheckCircle className="w-4 h-4 text-accent" />;
      case "cancelled": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">FixNow</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{profile?.full_name || user?.email}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                {profile?.user_type}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          {profile?.user_type === "worker" ? "Worker Dashboard" : "My Bookings"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {profile?.user_type === "worker"
            ? "Manage your service requests and bookings"
            : "Track and manage your service bookings"}
        </p>

        {profile?.user_type === "customer" && (
          <Button variant="hero" className="mb-8 rounded-xl" onClick={() => navigate("/book")}>
            + Book a New Service
          </Button>
        )}

        {loadingBookings ? (
          <p className="text-muted-foreground">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">
              {profile?.user_type === "customer"
                ? "Book your first service to get started"
                : "You'll see bookings here once customers book your services"}
            </p>
            {profile?.user_type === "customer" && (
              <Button variant="hero" className="rounded-xl" onClick={() => navigate("/book")}>
                Browse Services
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-5 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {statusIcon(booking.status)}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                        {booking.status.replace("_", " ")}
                      </span>
                      {booking.category && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                          {(booking.category as { name: string }).name}
                        </span>
                      )}
                    </div>
                    {booking.description && <p className="text-foreground font-medium mb-1">{booking.description}</p>}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {booking.address}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {profile?.user_type === "worker" && booking.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="hero" className="rounded-lg" onClick={() => updateBookingStatus(booking.id, "accepted")}>
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                        Decline
                      </Button>
                    </div>
                  )}
                  {profile?.user_type === "worker" && booking.status === "accepted" && (
                    <Button size="sm" variant="hero" className="rounded-lg" onClick={() => updateBookingStatus(booking.id, "completed")}>
                      Mark Complete
                    </Button>
                  )}
                  {profile?.user_type === "customer" && booking.status === "pending" && (
                    <Button size="sm" variant="outline" className="rounded-lg text-destructive" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
