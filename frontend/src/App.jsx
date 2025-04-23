
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Requests from "./pages/Requests";
import Stock from "./pages/Stock";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, default to 'bloodbank' role
  // In a real app, this would be determined by authentication
  const mockUserRole = 'bloodbank'; // Try: 'patient', 'donor', or 'bloodbank'

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <NavBar userRole={mockUserRole} />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <footer className="bg-white shadow-inner py-4 border-t">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} BloodLink - Blood Donation Management System
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
