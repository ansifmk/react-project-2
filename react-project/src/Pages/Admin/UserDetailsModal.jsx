import React from 'react';
import { Ban, CheckCircle, Trash2, X, Calendar, User } from 'lucide-react';

const UserDetailsModal = ({ user, onClose, onToggleBlock, onDeleteUser }) => {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getOrderStats = (user) => {
    const orders = user.orders || [];
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    const ordersByStatus = orders.reduce((acc, order) => {
      const status = order.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return { 
      totalOrders,
      totalSpent,
      ordersByStatus,
      orders
    };
  };

  const stats = getOrderStats(user);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">User Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Role:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Joined:</span>
                  <span className="text-gray-600">{formatDate(user.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.isBlock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.isBlock ? <Ban className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                    {user.isBlock ? 'Blocked' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onToggleBlock(user.id, user.isBlock)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  user.isBlock 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {user.isBlock ? <CheckCircle className="w-4 h-4 mr-2" /> : <Ban className="w-4 h-4 mr-2" />}
                {user.isBlock ? 'Unblock User' : 'Block User'}
              </button>
              <button
                onClick={() => onDeleteUser(user.id)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </button>
            </div>
          </div>
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-blue-800">{stats.totalOrders}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-green-800">
                  {formatCurrency(stats.totalSpent)}
                </p>
              </div>
            </div>
            {stats.totalOrders > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                    <div key={status} className="bg-white border rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 capitalize mb-1">{status}</p>
                      <p className="text-xl font-bold text-gray-800">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Order History</h3>
              {stats.orders.length > 0 ? (
                <div className="space-y-4">
                  {stats.orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">Order #{order.id.slice(-8)}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <p className="font-bold text-lg text-gray-800">{formatCurrency(order.total)}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                      </div>
                                            <div className="space-y-2">
                        {order.items && order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <img 
                              src={item.images?.[0]} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/50';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                              <p className="text-gray-600 text-sm">Quantity: {item.quantity || 1}</p>
                            </div>
                            <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;