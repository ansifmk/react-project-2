import React, { useState, useEffect } from "react";
import { Search, Ban, CheckCircle, Trash2, Eye } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((user) =>
        filterStatus === "active" ? !user.isBlock : user.isBlock
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const usersData = await response.json();
      setUsers(usersData);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (userId, currentStatus) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlock: !currentStatus }),
      });

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isBlock: !currentStatus } : user
        )
      );

      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, isBlock: !currentStatus });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== userId));
      setDeleteConfirm(null);
      closeDetails();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const viewDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
          <div className="text-xl font-semibold text-slate-700">
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-slate-600 text-sm">
            Manage all user accounts and permissions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder-slate-400"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 font-medium transition-all outline-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 font-medium transition-all outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-700">
                            {user.name}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          user.isBlock
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.isBlock ? (
                          <Ban className="w-3 h-3 mr-1" />
                        ) : (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.isBlock ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewDetails(user)}
                          className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleBlock(user.id, user.isBlock)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                            user.isBlock
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {user.isBlock ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                No users found. Try adjusting your search or filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
            <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Delete User</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-2 border rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(deleteConfirm)}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={closeDetails}
          onToggleBlock={toggleBlock}
          onDeleteUser={setDeleteConfirm}
        />
      )}
    </div>
  );
};

export default AdminUsers;
