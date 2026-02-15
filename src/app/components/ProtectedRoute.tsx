import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

export function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin, user, isLoading } = useAuth();

    console.log('ProtectedRoute - Auth Status:', {
        isAuthenticated,
        isAdmin,
        requireAdmin,
        user,
        userRole: user?.role,
        isLoading
    });

    // Show loading spinner while checking authentication
    if (isLoading) {
        console.log('ProtectedRoute: Still loading authentication state');
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        console.log('ProtectedRoute: Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // If admin access required but user is not admin
    if (requireAdmin && !isAdmin) {
        console.log('ProtectedRoute: Admin access required but user is not admin, redirecting to dashboard');
        return <Navigate to="/dashboard" replace />;
    }

    console.log('ProtectedRoute: Access granted');
    return <Outlet />;
}
