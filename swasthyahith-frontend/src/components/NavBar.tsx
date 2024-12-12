import { useDispatch } from "react-redux";
import { clearUser } from "@/store/store";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearUser());
        navigate("/login");
    };

    return (
        <nav className="px-14 py-8 flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 sticky top-0 z-50 shadow-lg">
            <div className="text-white text-3xl font-bold">SwasthyaHith</div>
            <div className="hidden md:flex items-center space-x-8">
                <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                    About
                </a>
                <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                    Resources
                </a>
                <button
                    onClick={logout}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
