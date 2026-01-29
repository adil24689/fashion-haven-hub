import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Loader2, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  items: OrderItem[];
  created_at: string;
  shipping_address: {
    fullName?: string;
    address?: string;
    city?: string;
    district?: string;
  } | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const OrderHistoryPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const typedOrders: Order[] = (data || []).map(order => ({
          ...order,
          subtotal: Number(order.subtotal),
          shipping_cost: Number(order.shipping_cost),
          discount: Number(order.discount),
          total: Number(order.total),
          items: Array.isArray(order.items) ? (order.items as unknown as OrderItem[]) : [],
          shipping_address: order.shipping_address as Order['shipping_address'],
        }));

        setOrders(typedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-muted-foreground" />
            <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
              Account
            </Link>
            <ChevronRight size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Order History</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-display font-bold">Order History</h1>
          <Badge variant="secondary" className="text-sm">
            {orders.length} Orders
          </Badge>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-3">No Orders Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order, index) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const isExpanded = selectedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  {/* Order Header */}
                  <div 
                    className="p-4 md:p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">Order #{order.order_number}</h3>
                            <Badge className={status.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Placed on {format(new Date(order.created_at), 'PPP')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">৳{order.total.toLocaleString()}</p>
                          {order.discount > 0 && (
                            <p className="text-xs text-green-600">Saved ৳{order.discount.toLocaleString()}</p>
                          )}
                        </div>
                        <ChevronRight 
                          className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border"
                    >
                      {/* Order Items */}
                      <div className="p-4 md:p-6 space-y-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item, itemIndex) => (
                            <div 
                              key={`${item.id}-${itemIndex}`}
                              className="flex gap-4 p-3 bg-muted/30 rounded-lg"
                            >
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium line-clamp-1">{item.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Size: {item.size} • Color: {item.color}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-sm text-muted-foreground">
                                    Qty: {item.quantity}
                                  </span>
                                  <span className="font-medium">
                                    ৳{(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="p-4 md:p-6 bg-muted/20 border-t border-border">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Shipping Address */}
                          {order.shipping_address && (
                            <div>
                              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                Shipping Address
                              </h4>
                              <p className="text-sm">
                                {order.shipping_address.fullName}<br />
                                {order.shipping_address.address}<br />
                                {order.shipping_address.city}, {order.shipping_address.district}
                              </p>
                            </div>
                          )}

                          {/* Price Breakdown */}
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                              Order Summary
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>৳{order.subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{order.shipping_cost === 0 ? 'Free' : `৳${order.shipping_cost.toLocaleString()}`}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount</span>
                                  <span>-৳{order.discount.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between font-semibold pt-2 border-t border-border">
                                <span>Total</span>
                                <span>৳{order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
