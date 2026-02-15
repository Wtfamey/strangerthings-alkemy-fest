import { useAuth } from '../context/AuthContext';

export function DebugAuthPage() {
    const { user, isAuthenticated, isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 text-white min-h-screen pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-red-500">Loading Authentication...</h1>
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-red-900/30">
                    <p className="text-sm sm:text-base">Checking authentication state...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white min-h-screen pt-20 sm:pt-24 lg:pt-32">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-red-500">Authentication Debug</h1>
            
            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-red-900/30 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <strong className="text-sm sm:text-base">Is Authenticated:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs sm:text-sm ${isAuthenticated ? 'bg-green-600' : 'bg-red-600'}`}>
                            {isAuthenticated ? 'YES' : 'NO'}
                        </span>
                    </div>
                    <div>
                        <strong className="text-sm sm:text-base">Is Admin:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs sm:text-sm ${isAdmin ? 'bg-green-600' : 'bg-red-600'}`}>
                            {isAdmin ? 'YES' : 'NO'}
                        </span>
                    </div>
                </div>
                
                <div>
                    <strong className="text-sm sm:text-base">User Data:</strong>
                    <pre className="bg-gray-800 p-3 sm:p-4 rounded mt-2 text-xs sm:text-sm overflow-auto max-h-48">
                        {user ? JSON.stringify(user, null, 2) : 'No user data'}
                    </pre>
                </div>
                
                <div>
                    <strong className="text-sm sm:text-base">LocalStorage:</strong>
                    <pre className="bg-gray-800 p-3 sm:p-4 rounded mt-2 text-xs sm:text-sm overflow-auto max-h-48">
                        {localStorage.getItem('user') || 'No data in localStorage'}
                    </pre>
                </div>

                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-base sm:text-lg font-bold mb-3">Quick Actions:</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <a href="/login" className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 text-sm sm:text-base touch-target text-center">
                            Go to Login
                        </a>
                        {isAuthenticated && isAdmin && (
                            <a href="/admin" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 text-sm sm:text-base touch-target text-center">
                                Go to Admin Dashboard
                            </a>
                        )}
                        {isAuthenticated && !isAdmin && (
                            <a href="/dashboard" className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 text-sm sm:text-base touch-target text-center">
                                Go to User Dashboard
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
