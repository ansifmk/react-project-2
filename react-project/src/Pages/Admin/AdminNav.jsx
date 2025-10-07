import React, { useContext } from "react";
import { Home, Users, Package, Lock, LogOut, User, ChevronRight,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext"; 

const Sidebar = ({ expanded, setExpanded }) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); 
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`h-full bg-black text-white flex flex-col justify-between transition-all duration-300 ${
        expanded ? "w-56" : "w-16"
      }`}
    >
      <div>
        <div className="flex justify-center items-center py-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full bg-[#0f172a] hover:bg-[#334155] transition"
          >
            <ChevronRight
              className={`h-5 w-5 text-white transform transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <div className="flex flex-col items-center my-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500">
            <User className="h-6 w-6" />
          </div>
          {expanded && (
            <div className="mt-2 text-center">
              <p className="text-sm font-medium">
                {user?.name || user?.username || "User"}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}
        </div>

        <nav className="mt-6 space-y-2">
          <NavItem
            expanded={expanded}
            icon={<Home />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <NavItem
            expanded={expanded}
            icon={<Users />}
            label="Users"
            onClick={() => navigate("/dashboard/users")}
          />
          <NavItem
            expanded={expanded}
            icon={<Package />}
            label="Products"
            onClick={() => navigate("/dashboard/products")}
          />
          <NavItem
            expanded={expanded}
            icon={<Lock />}
            label="Orders"
            onClick={() => navigate("/dashboard/orders")}
          />
        </nav>
      </div>

      <div className="mb-4">
        <NavItem
          expanded={expanded}
          icon={<LogOut />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

const NavItem = ({ expanded, icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer px-4 py-2 hover:bg-[#334155] rounded-lg transition-colors ${
        expanded ? "justify-start space-x-3" : "justify-center"
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      {expanded && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Sidebar;