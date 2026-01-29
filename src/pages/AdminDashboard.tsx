import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  LogOut,
  Menu,
  X,
  DollarSign,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/admin/login');
      } else if (!isAdmin) {
        navigate('/admin/login');
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      // Total orders
      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total');
      
      const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

      // Total customers (profiles)
      const { count: customerCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Pending orders
      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalOrders: orderCount || 0,
        totalRevenue,
        totalCustomers: customerCount || 0,
        pendingOrders: pendingCount || 0,
      });

      // Recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) setRecentOrders(orders);
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Total Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'bg-purple-500' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: ShoppingCart, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-border">
            <h1 className="font-display text-xl font-bold">
              Alam<span className="text-accent">Fashion</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
          </div>

          <nav className="p-4 space-y-1">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Package size={20} />
              Products
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <ShoppingBag size={20} />
              Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Users size={20} />
              Customers
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <TrendingUp size={20} />
              Analytics
            </button>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-muted-foreground">Welcome back, Admin!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No orders yet
                        </td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0">
                          <td className="p-4 font-mono text-sm">#{order.order_number}</td>
                          <td className="p-4 text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 font-medium">৳{order.total?.toLocaleString()}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
