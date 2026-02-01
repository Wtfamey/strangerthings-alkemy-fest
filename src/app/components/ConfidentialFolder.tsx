import { useState } from 'react';
import { toast } from 'sonner';

const ConfidentialFolder = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration Confirmed. Welcome to Hawkins.');
                setFormData({ full_name: '', email: '', password: '' });
            } else {
                toast.error(data.message || 'Registration failed.');
            }
        } catch (error) {
            toast.error('Transmission failed. Check network.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f0e6d2] p-1 rounded-lg shadow-2xl w-full max-w-md mx-auto relative transform rotate-1">
            {/* Folder Tab */}
            <div className="absolute -top-8 left-0 w-1/3 h-10 bg-[#f0e6d2] rounded-t-lg border-t border-l border-r border-[#d4c5a9]">
                <span className="block mt-2 ml-4 text-red-800 font-bold uppercase text-xs tracking-widest opacity-70">Top Secret</span>
            </div>

            {/* Folder Body */}
            <div className="bg-[#f0e6d2] p-8 rounded-b-lg border border-[#d4c5a9] relative overflow-hidden">

                {/* Stamps */}
                <div className="absolute top-4 right-4 border-4 border-red-700 text-red-700 font-black p-2 transform -rotate-12 opacity-40 text-sm tracking-widest uppercase pointer-events-none select-none">
                    Classified
                </div>

                <h2 className="text-3xl text-center mb-8 text-neutral-800 underline decoration-red-600 decoration-4 underline-offset-4">
                    SIGNUP
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm uppercase font-bold text-neutral-600 mb-1">Subject Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-red-600 focus:outline-none text-xl text-blue-900 pb-1"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm uppercase font-bold text-neutral-600 mb-1">Pass Code (Password)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-red-600 focus:outline-none text-xl text-blue-900 pb-1"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm uppercase font-bold text-neutral-600 mb-1">Contact Frequency</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-red-600 focus:outline-none text-xl text-blue-900 pb-1"
                            placeholder="email@hawkins.gov"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full mt-8 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded shadow-md uppercase tracking-widest transition-colors disabled:opacity-50">
                        {loading ? 'Transmitting...' : 'Authorize Access'}
                    </button>
                    <p className="text-center text-xs text-neutral-500 mt-2">
                        Already authorized? <a href="/login" className="text-red-700 font-bold hover:underline">Log In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ConfidentialFolder;