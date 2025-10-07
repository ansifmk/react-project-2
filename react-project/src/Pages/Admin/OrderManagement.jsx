import React, { useState, useEffect } from "react";
import { Search, Package, DollarSign, Truck, CheckCircle, AlertCircle, Clock } from "lucide-react";

const OrderManagement = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) throw new Error('Failed to fetch data');
      const usersData = await response.json();
      setUsers(usersData);

      const allOrders = usersData.flatMap(user => 
        (user.orders || []).map(order => ({
          ...order,
          customerName: user.name,
          customerEmail: user.email
        }))
      );
      
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  const orderDistribution = orders.reduce((acc, order) => {
    const status = order.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statuses = ["all", ...new Set(orders.map(order => order.status))];

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const userWithOrder = users.find(user => 
        user.orders && user.orders.some(order => order.id === orderId)
      );
      
      if (!userWithOrder) {
        throw new Error('Order not found');
      }

      const updatedUsers = users.map(user => {
        if (user.id === userWithOrder.id) {
          return {
            ...user,
            orders: user.orders.map(order =>
              order.id === orderId ? { ...order, status: newStatus } : order
            )
          };
        }
        return user;
      });
     const response = await fetch(`http://localhost:3001/users/${userWithOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUsers.find(user => user.id === userWithOrder.id)),
      });

      if (!response.ok) throw new Error('Failed to update order status');
      await fetchData();
    } catch (error) {
      alert('Error updating order status');
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-700 bg-green-100', label: 'Delivered' };
      case 'shipped':
        return { icon: Truck, color: 'text-blue-700 bg-blue-100', label: 'Shipped' };
      case 'processing':
        return { icon: Clock, color: 'text-yellow-700 bg-yellow-100', label: 'Processing' };
      case 'cancelled':
        return { icon: AlertCircle, color: 'text-red-700 bg-red-100', label: 'Cancelled' };
      default:
        return { icon: Clock, color: 'text-slate-700 bg-slate-100', label: 'Pending' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
          <div className="text-xl font-semibold text-slate-700">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Order Management</h1>
          <p className="text-slate-600 text-sm">View and manage all customer orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Package className="w-6 h-6" />} 
            label="Total Orders" 
            value={totalOrders} 
            subtitle="12% from last month"
            color="indigo"
          />
          <StatCard 
            icon={<DollarSign className="w-6 h-6" />} 
            label="Total Revenue" 
            value={`₹${(totalRevenue / 1000).toFixed(2)}k`} 
            subtitle="8% from last month"
            color="green"
          />
          <StatCard 
            icon={<Truck className="w-6 h-6" />} 
            label="Shipped Orders" 
            value={shippedOrders} 
            color="blue"
          />
          <StatCard 
            icon={<CheckCircle className="w-6 h-6" />} 
            label="Delivered Orders" 
            value={deliveredOrders} 
            color="purple"
            
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Order Distribution</h2>
              <div className="space-y-3">
                {Object.entries(orderDistribution).map(([status, count]) => {
                  const { icon: Icon, color, label } = getStatusInfo(status);
                  return (
                    <div key={status} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-700 capitalize">{label}</span>
                      </div>
                      <span className="font-semibold text-slate-800 bg-white px-3 py-1 rounded-full text-sm">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder-slate-400"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 font-medium transition-all outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    {statuses.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>
                        {getStatusInfo(status).label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">ORDER ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">CUSTOMER</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">DATE</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">ITEMS</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">AMOUNT</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">PAYMENT</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">STATUS</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredOrders.map((order) => {
                      const { icon: StatusIcon, color, label } = getStatusInfo(order.status);
                      return (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-800">#{order.id.slice(-6)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                                {order.customerName?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="font-medium text-slate-700">{order.customerName}</div>
                                <div className="text-slate-400 text-sm">{order.customerEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {formatDate(order.created_at)}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {order.items?.length || 0} items
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-800">
                            ₹{order.total?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                              order.paymentMethod === 'cash' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {order.paymentMethod === 'cash' ? 'COD' : 'UPI'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 text-sm font-medium transition-all outline-none cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-16 text-slate-400">
                    {orders.length === 0 ? "No orders available" : "No orders found matching your search"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subtitle, color }) => {
  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-green-600 mt-2 font-medium">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;