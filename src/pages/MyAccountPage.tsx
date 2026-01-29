import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import OrderHistory from '@/components/account/OrderHistory';
import ProfileEditor from '@/components/account/ProfileEditor';

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: roleLoading } = useUserRole();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    orderCount: 0,
    wishlistCount: 0,
    reviewCount: 0,
    totalSpent: 0,
  });

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
        .maybeSingle();
      
      if (profileData) setProfile(profileData);

      // Fetch order stats
      const { data: orders } = await supabase
        .from('orders')
        .select('total')
        .eq('user_id', user.id);
      
      const orderCount = orders?.length || 0;
      const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

      // Fetch wishlist count
      const { count: wishlistCount } = await supabase
        .from('wishlist_items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch review count
      const { count: reviewCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        orderCount,
        wishlistCount: wishlistCount || 0,
        reviewCount: reviewCount || 0,
        totalSpent,
      });
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
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-primary-foreground" />
                  )}
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
                <p className="text-2xl font-bold text-primary">{stats.orderCount}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-accent">{stats.wishlistCount}</p>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-green-600">{stats.reviewCount}</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-2xl font-bold text-purple-600">৳{stats.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="orders" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Wishlist</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="bg-card rounded-xl border border-border p-6">
                <OrderHistory />
              </TabsContent>
              
              <TabsContent value="profile" className="bg-card rounded-xl border border-border p-6">
                <ProfileEditor />
              </TabsContent>
              
              <TabsContent value="wishlist" className="bg-card rounded-xl border border-border p-6">
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Your Wishlist</h3>
                  <p className="text-muted-foreground mb-4">View and manage your saved items</p>
                  <Button asChild variant="outline">
                    <a href="/wishlist">Go to Wishlist</a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Sign Out */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
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
