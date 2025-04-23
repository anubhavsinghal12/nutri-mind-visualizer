
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthPage } from "./AuthPages";
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // This ensures we're properly checking auth state
    if (isAuthenticated) {
      console.log("User is authenticated, should redirect to dashboard");
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AuthPage />;
};

export default Index;
