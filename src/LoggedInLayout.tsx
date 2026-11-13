
import { Outlet, Navigate } from "react-router-dom";
import { useMe } from "./network/me/queries";

const LoggedInLayout = () => {
  const { data: me, isPending, isError } = useMe();

  // Wait until the authentication request finishes.
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking your authentication...</p>
      </div>
    );
  }

  // Redirect if the authentication request failed.
  if (isError || !me) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated.
  return <Outlet />;
};

export default LoggedInLayout;
