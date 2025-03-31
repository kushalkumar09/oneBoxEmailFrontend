import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Loader2 } from "lucide-react";
import OAuthLogin from "../authcomponent/OAuthLogin.jsx";
import Dashboard from "./dashboardComponents/Dashboard.jsx";

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      console.log("User Data:", user);
    }
  }, [user]);

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg font-medium">
          Loading your dashboard...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Please log in
          </h2>
          <p className="mb-6 text-slate-600">
            You need to be logged in to access your email dashboard.
          </p>
          <OAuthLogin />
        </div>
      </div>
    );
  }

  return <Dashboard user={user} />;
}
