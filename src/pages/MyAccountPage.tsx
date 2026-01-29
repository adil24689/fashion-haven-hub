import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isCustomer, loading: roleLoading } = useUserRole();
  const [profile, setProfile] = useState<any>(null);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      // Fetch order count
      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (count !== null) setOrderCount(count);
    };

    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/orders', count: orderCount },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/profile' },
    { icon: Settings, label: 'Account Settings', href: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">
                    Welcome, {profile?.full_name || user?.email?.split('@')[0]}!
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-primary">{orderCount}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-accent">0</p>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-purple-600">৳0</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {menuItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                    index !== menuItems.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Sign Out */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyAccountPage;
