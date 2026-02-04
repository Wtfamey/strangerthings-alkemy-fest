import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log("Attempting login for:", email);
            const response = await fetch('/strangerthings2026/public/api/auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login response:", data);

            if (response.ok) {
                login(data.user);
                toast.success('Access Granted');
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Login failed');
                toast.error(data.message || 'Access Denied');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Connection failed. Server unreachable?');
            toast.error('Connection failed. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-18 lg:pt-20 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-gray-900 border border-red-900/50 p-6 sm:p-8 rounded-xl card">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-6 sm:mb-8 text-center" style={{ fontFamily: "'Impact', sans-serif" }}>ACCESS PORTAL</h1>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none text-base transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none text-base transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 touch-target text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'ENTER'}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-400 text-xs sm:text-sm mb-2">Default Admin Credentials</p>
                            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                                <p className="text-xs text-gray-300">Email: admin@hawkins.com</p>
                                <p className="text-xs text-gray-300">Password: admin123</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
