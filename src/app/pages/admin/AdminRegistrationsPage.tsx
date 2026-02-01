import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RegistrationData {
    id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    event_title: string;
    event_price: string;
    status: string;
    payment_status: string;
    amount_paid: string;
    razorpay_payment_id: string;
    registered_at: string;
}

interface RegistrationStats {
    total_registrations: number;
    paid_registrations: number;
    pending_payments: number;
    failed_payments: number;
    total_revenue: number;
}

export function AdminRegistrationsPage() {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
    const [stats, setStats] = useState<RegistrationStats>({
        total_registrations: 0,
        paid_registrations: 0,
        pending_payments: 0,
        failed_payments: 0,
        total_revenue: 0
    });
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('all');
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        fetchRegistrations();
        fetchEvents();
    }, [selectedEvent]);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const url = selectedEvent === 'all' 
                ? '/api/registrations/read.php'
                : `/api/registrations/read.php?event_id=${selectedEvent}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.records) {
                setRegistrations(data.records);
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Error fetching registrations", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events/read.php');
            const data = await response.json();
            if (data.records) {
                setEvents(data.records);
            }
        } catch (error) {
            console.error("Error loading events:", error);
        }
    };

    const updatePaymentStatus = async (registrationId: number, newStatus: string) => {
        try {
            const response = await fetch('/api/registrations/update.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: registrationId,
                    payment_status: newStatus,
                    amount_paid: newStatus === 'paid' ? '0.00' : '0.00'
                })
            });

            if (response.ok) {
                fetchRegistrations();
                alert('Payment status updated successfully');
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            alert('Failed to update payment status');
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-600 text-white';
            case 'pending': return 'bg-yellow-600 text-white';
            case 'failed': return 'bg-red-600 text-white';
            default: return 'bg-gray-600 text-white';
        }
    };

    const getPaymentStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return '✓';
            case 'pending': return '⏳';
            case 'failed': return '✗';
            default: return '?';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-18 lg:pt-20">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 font-impact">REGISTRATION MANAGER</h1>
                    <a 
                        href="/admin" 
                        className="inline-flex items-center text-gray-400 hover:text-white text-sm sm:text-base font-medium transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </a>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 sm:mb-8">
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-700">
                        <h3 className="text-sm sm:text-base text-gray-400 mb-2">Total Registrations</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stats.total_registrations}</p>
                    </div>
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-green-700">
                        <h3 className="text-sm sm:text-base text-green-400 mb-2">Paid</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-green-400">{stats.paid_registrations}</p>
                    </div>
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-yellow-700">
                        <h3 className="text-sm sm:text-base text-yellow-400 mb-2">Pending</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{stats.pending_payments}</p>
                    </div>
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-700">
                        <h3 className="text-sm sm:text-base text-red-400 mb-2">Failed</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-red-400">{stats.failed_payments}</p>
                    </div>
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-blue-700">
                        <h3 className="text-sm sm:text-base text-blue-400 mb-2">Total Revenue</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-400">₹{stats.total_revenue.toFixed(2)}</p>
                    </div>
                </div>

                {/* Event Filter */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-700 mb-6 sm:mb-8">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Filter by Event</label>
                    <select 
                        value={selectedEvent} 
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    >
                        <option value="all">All Events</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title} (₹{event.price})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block bg-gray-900 rounded-xl border border-red-900/30 card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-gray-800 text-red-400">
                                <tr>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">User</th>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">Event</th>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">Price</th>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">Payment Status</th>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">Amount Paid</th>
                                    <th className="p-3 sm:p-4 text-sm sm:text-base font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-400">
                                            Loading registrations...
                                        </td>
                                    </tr>
                                ) : registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-400">
                                            No registrations found
                                        </td>
                                    </tr>
                                ) : (
                                    registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="p-3 sm:p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3a7 7 0 017-7z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm sm:text-base text-gray-200">{reg.user_name}</div>
                                                        <div className="text-xs sm:text-sm text-gray-400">{reg.user_email}</div>
                                                        {reg.user_phone && (
                                                            <div className="text-xs text-gray-400">{reg.user_phone}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4 text-sm sm:text-base text-gray-200">{reg.event_title}</td>
                                            <td className="p-3 sm:p-4 text-sm sm:text-base text-white">₹{parseFloat(reg.event_price).toFixed(2)}</td>
                                            <td className="p-3 sm:p-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(reg.payment_status)}`}>
                                                    <span className="mr-1">{getPaymentStatusIcon(reg.payment_status)}</span>
                                                    {reg.payment_status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="text-sm text-white">₹{parseFloat(reg.amount_paid).toFixed(2)}</div>
                                                {reg.razorpay_payment_id && (
                                                    <div className="text-xs text-gray-400 truncate max-w-[100px]" title={reg.razorpay_payment_id}>
                                                        {reg.razorpay_payment_id}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex space-x-2">
                                                    {reg.payment_status === 'pending' && (
                                                        <button
                                                            onClick={() => updatePaymentStatus(reg.id, 'paid')}
                                                            className="text-xs bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700 transition-colors"
                                                        >
                                                            Mark Paid
                                                        </button>
                                                    )}
                                                    {reg.payment_status === 'paid' && (
                                                        <button
                                                            onClick={() => updatePaymentStatus(reg.id, 'failed')}
                                                            className="text-xs bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700 transition-colors"
                                                        >
                                                            Mark Failed
                                                        </button>
                                                    )}
                                                    {reg.payment_status === 'failed' && (
                                                        <button
                                                            onClick={() => updatePaymentStatus(reg.id, 'pending')}
                                                            className="text-xs bg-yellow-600 px-2 py-1 rounded text-white hover:bg-yellow-700 transition-colors"
                                                        >
                                                            Reset
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-3">
                    {loading ? (
                        <div className="bg-gray-900 p-8 rounded-xl border border-red-900/30 card text-center">
                            <div className="text-gray-400">Loading registrations...</div>
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="bg-gray-900 p-8 rounded-xl border border-red-900/30 card text-center">
                            <div className="text-gray-400 text-lg mb-2">No registrations found</div>
                            <p className="text-gray-500 text-sm">Users haven't registered for any events yet</p>
                        </div>
                    ) : (
                        registrations.map((reg) => (
                            <div key={reg.id} className="bg-gray-900 p-4 rounded-xl border border-red-900/30 card">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3a7 7 0 017-7z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-red-400 text-sm">{reg.user_name}</div>
                                                <div className="text-xs text-gray-400">{reg.user_email}</div>
                                                {reg.user_phone && (
                                                    <div className="text-xs text-gray-400">{reg.user_phone}</div>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(reg.payment_status)}`}>
                                            <span className="mr-1">{getPaymentStatusIcon(reg.payment_status)}</span>
                                            {reg.payment_status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-300">
                                            <div className="font-medium mb-1">Event: {reg.event_title}</div>
                                            <div className="text-xs">Price: ₹{parseFloat(reg.event_price).toFixed(2)}</div>
                                            <div className="text-xs">Paid: ₹{parseFloat(reg.amount_paid).toFixed(2)}</div>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(reg.registered_at).toLocaleString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            {reg.payment_status === 'pending' && (
                                                <button
                                                    onClick={() => updatePaymentStatus(reg.id, 'paid')}
                                                    className="text-xs bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700 transition-colors"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}
                                            {reg.payment_status === 'paid' && (
                                                <button
                                                    onClick={() => updatePaymentStatus(reg.id, 'failed')}
                                                    className="text-xs bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700 transition-colors"
                                                >
                                                    Mark Failed
                                                </button>
                                            )}
                                            {reg.payment_status === 'failed' && (
                                                <button
                                                    onClick={() => updatePaymentStatus(reg.id, 'pending')}
                                                    className="text-xs bg-yellow-600 px-2 py-1 rounded text-white hover:bg-yellow-700 transition-colors"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
