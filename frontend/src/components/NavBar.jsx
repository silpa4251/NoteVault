import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-indigo-600">NoteVault</div>
          <div className="flex items-center space-x-6">

            <button
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-700 transition"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
