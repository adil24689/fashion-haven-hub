import { useState, useEffect } from 'react';
import { Package, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-secondary text-muted-foreground';
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground mb-4">
          You haven't placed any orders. Start shopping to see your orders here!
        </p>
        <Button asChild>
          <a href="/">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          {/* Order Header */}
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-colors"
            onClick={() => toggleExpand(order.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">#{order.order_number}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className="font-semibold">৳{order.total.toLocaleString()}</span>
              {expandedOrder === order.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Order Details (Expanded) */}
          {expandedOrder === order.id && (
            <div className="border-t border-border p-4 bg-secondary/20">
              {/* Items */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Items</h4>
                <div className="space-y-2">
                  {Array.isArray(order.items) && (order.items as any[]).map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                          {` • Qty: ${item.quantity}`}
                        </p>
                      </div>
                      <p className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {order.shipping_address && typeof order.shipping_address === 'object' && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-sm text-muted-foreground">
                    {(order.shipping_address as any).fullName}<br />
                    {(order.shipping_address as any).address}<br />
                    {(order.shipping_address as any).city}, {(order.shipping_address as any).district}<br />
                    {(order.shipping_address as any).phone}
                  </p>
                </div>
              )}

              {/* Payment Method */}
              {order.payment_method && (
                <div>
                  <h4 className="font-medium mb-2">Payment Method</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
