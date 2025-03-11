import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import BlogList from "./assets/components/BlogList";
import BlogCreateForm from "./assets/components/BlogCreate";
import BlogOne from "./assets/components/BlogOne";
import React, { useState, useEffect } from "react";
import { Login } from "./assets/components/LogIn";
import { Logout } from "./assets/components/LogOut";

export function Navigation() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access_token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">My Blog</Link>
      </div>
      <div className="space-x-4">
        {isAuth && (
          <Link to="/" className="hover:underline">
            Home
          </Link>
        )}
        {isAuth ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <div className="space-y-6">
                  <BlogCreateForm />
                  <BlogList />
                </div>
              </RequireAuth>
            }
          />
          <Route
            path="/:postId"
            element={
              <RequireAuth>
                <BlogOne />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuth>
                <Login />
              </RedirectIfAuth>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Protects routes from unauthorized access
function RequireAuth({ children }) {
  if (!localStorage.getItem("access_token")) {
    return <Login />;
  }
  return children;
}

// Redirects authenticated users away from the login page
function RedirectIfAuth({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);
  return children;
}

export default App;
