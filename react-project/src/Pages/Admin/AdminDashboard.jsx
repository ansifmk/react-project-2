import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, productsRes] = await Promise.all([
        fetch('http://localhost:3001/users'),
        fetch('http://localhost:3001/products')
      ]);

      if (!usersRes.ok || !productsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const usersData = await usersRes.json();
      const productsData = await productsRes.json();

      setUsers(usersData);
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
const totalUsers = users.length;
const totalProducts = products.length;

 let allOrders = [];
users.forEach(user => {
  if (user.orders) {
    allOrders = allOrders.concat(user.orders);
  }
});

const totalOrders = allOrders.length;
let totalRevenue = 0;
allOrders.forEach(order => {
  totalRevenue += order.total || 0;
});

const orderCount = {};
allOrders.forEach(order => {
  const status = order.status || 'pending';
  if (orderCount[status]) {
    orderCount[status] += 1;
  } else {
    orderCount[status] = 1;
  }
});

const orderDistributionData = Object.keys(orderCount).map(status => {
  return {
    name: status,
    value: orderCount[status]
  };
});

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const orderTrendData = [];
const dateCount = {};
for (let i = 0; i < allOrders.length; i++) {
  const order = allOrders[i];

  const date = new Date(order.created_at).toLocaleDateString();
  if (dateCount[date]) {
    dateCount[date] = dateCount[date] + 1;
  } else {
    dateCount[date] = 1;
  }
}

for (let date in dateCount) {
  orderTrendData.push({
    date: date,
    orders: dateCount[date]
  });
}

const revenueTrendData = [];
const revenueByDate = {};

for (let i = 0; i < allOrders.length; i++) {
  const order = allOrders[i];
  const date = new Date(order.created_at).toLocaleDateString();

  if (revenueByDate[date]) {
    revenueByDate[date] += order.total || 0;
  } else {
    revenueByDate[date] = order.total || 0;
  }
}

for (let date in revenueByDate) {
  revenueTrendData.push({
    date: date,
    revenue: revenueByDate[date] / 1000
  });
}

revenueTrendData.sort((a, b) => new Date(a.date) - new Date(b.date));

const today = new Date().toDateString();
let productSalesToday = {};

for (let i = 0; i < allOrders.length; i++) {
  const order = allOrders[i];
  if (new Date(order.created_at).toDateString() === today) {
    const items = order.items || [];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      if (productSalesToday[item.name]) {
        productSalesToday[item.name] += item.quantity || 1;
      } else {
        productSalesToday[item.name] = item.quantity || 1;
      }
    }
  }
}

let topSellingToday = [];
for (let name in productSalesToday) {
  topSellingToday.push({ name: name, quantity: productSalesToday[name] });
}
topSellingToday.sort((a, b) => b.quantity - a.quantity);
topSellingToday = topSellingToday.slice(0, 5);

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

let productSalesWeek = {};

for (let i = 0; i < allOrders.length; i++) {
  const order = allOrders[i];
  if (new Date(order.created_at) >= weekAgo) {
    const items = order.items || [];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      if (productSalesWeek[item.name]) {
        productSalesWeek[item.name] += item.quantity || 1;
      } else {
        productSalesWeek[item.name] = item.quantity || 1;
      }
    }
  }
}
let topSellingWeek = [];
for (let name in productSalesWeek) {
  topSellingWeek.push({ name: name, quantity: productSalesWeek[name] });
}

topSellingWeek.sort((a, b) => b.quantity - a.quantity);
topSellingWeek = topSellingWeek.slice(0, 5);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-r-transparent mb-4"></div>
        <div className="text-xl font-semibold text-slate-700">Loading dashboard...</div>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
        <div className="text-xl font-semibold text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={fetchData}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h1>
          <p className="text-slate-600 text-sm">Monitor your business performance at a glance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="bg-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-black font-medium text-slate-600 uppercase tracking-wide">Total Users</div>
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl text-black font-bold text-slate-800">{totalUsers}</div>
            <div className="text-xs text-black text-slate-500 mt-2">Active registered users</div>
          </div>

          <div className="bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Products</div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{totalProducts}</div>
            <div className="text-xs text-slate-500 mt-2">Products in inventory</div>
          </div>

          <div className="bg-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-black font-medium text-slate-600 uppercase tracking-wide">Total Orders</div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl text-black font-bold text-slate-800">{totalOrders}</div>
            <div className="text-xs text-black text-slate-500 mt-2">Orders processed</div>
          </div>

          <div className="bg-red-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Revenue</div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              ₹{(totalRevenue / 1000).toFixed(2)}k
            </div>
            <div className="text-xs text-slate-500 mt-2">Total earnings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Top Selling Today</h2>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">LIVE</div>
            </div>
            {topSellingToday.length > 0 ? (
              <div className="space-y-4">
                {topSellingToday.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 font-medium text-sm truncate">{item.name}</span>
                    </div>
                    <span className="text-indigo-600 font-bold text-sm">{item.quantity} sold</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">No sales today</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Top Selling This Week</h2>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">7 DAYS</div>
            </div>
            {topSellingWeek.length > 0 ? (
              <div className="space-y-4">
                {topSellingWeek.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 font-medium text-sm truncate">{item.name}</span>
                    </div>
                    <span className="text-emerald-600 font-bold text-sm">{item.quantity} sold</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">No sales this week</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Order Trend</h2>
            {orderTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(238, 238, 238, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} fill="#e9d5ff" fillOpacity={0.3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-400 text-sm">No order data available</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Revenue Trend</h2>
            {revenueTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: '500' }} label={{ value: '₹ (thousands)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: '600' } }} />
                  <Tooltip 
                    formatter={(value) => `₹${value.toFixed(2)}k`}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[12, 12, 0, 0]} />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-400 text-sm">No revenue data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Order Distribution</h2>
          {orderDistributionData.length > 0 ? (
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={orderDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  >
                    {orderDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">No order distribution data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;