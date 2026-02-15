import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalRegistrations: 0,
        totalUsers: 0,
        adminCount: 0,
        userCount: 0
    });

    useEffect(() => {
        console.log('AdminDashboardPage: Component mounted');
        
        const fetchStats = async () => {
            try {
                const [eventsRes, regsRes] = await Promise.all([
                    fetch('/api/events/read_with_registration.php'),
                    fetch('/api/registrations/read.php')
                ]);

                const eventsData = await eventsRes.json();
                const regsData = await regsRes.json();

                setStats({
                    totalEvents: eventsData.records?.length || 0,
                    totalRegistrations: regsData.records?.length || 0,
                    totalUsers: 0, // TODO: Add users API
                    adminCount: 0, // TODO: Add admin count API
                    userCount: 0  // TODO: Add user count API
                });
            } catch (error) {
                console.error("Error loading stats", error);
            }
        };

        fetchStats();
    }, [user]);

    return (
        <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-18 lg:pt-20">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-red-500 font-impact">
                    ADMIN DASHBOARD
                </h1>
                <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-gray-300">
                    Welcome, {user?.full_name}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                    {/* Events Card */}
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 text-gray-200">Events</h2>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-red-400">{stats.totalEvents}</p>
                        <p className="text-xs sm:text-sm text-gray-400 mb-4">Total Events</p>
                        <a 
                            href="/admin/events" 
                            className="inline-flex items-center text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors"
                        >
                            Manage Events 
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" d="M9 5l7 7 7" />
                        </a>
                    </div>
                    
                    {/* Registrations Card */}
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 text-gray-200">Registrations</h2>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-red-400">{stats.totalRegistrations}</p>
                        <p className="text-xs sm:text-sm text-gray-400 mb-4">Total Registrations</p>
                        <a 
                            href="/admin/registrations" 
                            className="inline-flex items-center text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors"
                        >
                            View Registrations 
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    
                    {/* Users Card */}
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 text-gray-200">Users</h2>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-red-400">{stats.totalUsers}</p>
                        <p className="text-xs sm:text-sm text-gray-400 mb-4">{stats.adminCount} Admins, {stats.userCount} Users</p>
                        <a 
                            href="/admin/users" 
                            className="inline-flex items-center text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors"
                        >
                            Manage Users 
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card mb-6 sm:mb-8">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-200">Quick Navigation</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        <a href="/admin/events" className="bg-gray-800 p-3 sm:p-4 rounded-xl text-center hover:bg-gray-700 transition-all duration-200 group">
                            <div className="text-red-400 text-xl sm:text-lg mb-2 group-hover:scale-110 transition-transform">📅</div>
                            <div className="text-white text-xs sm:text-sm font-medium">Event Management</div>
                        </a>
                        <a href="/admin/users" className="bg-gray-800 p-3 sm:p-4 rounded-xl text-center hover:bg-gray-700 transition-all duration-200 group">
                            <div className="text-red-400 text-xl sm:text-lg mb-2 group-hover:scale-110 transition-transform">👥</div>
                            <div className="text-white text-xs sm:text-sm font-medium">User Management</div>
                        </a>
                        <a href="/admin/registrations" className="bg-gray-800 p-3 sm:p-4 rounded-xl text-center hover:bg-gray-700 transition-all duration-200 group">
                            <div className="text-red-400 text-xl sm:text-lg mb-2 group-hover:scale-110 transition-transform">📋</div>
                            <div className="text-white text-xs sm:text-sm font-medium">Registrations</div>
                        </a>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-200">System Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-300">Database Connected</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-300">API Active</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-300">Authentication Working</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}