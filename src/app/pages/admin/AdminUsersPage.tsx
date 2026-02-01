import { useState, useEffect } from 'react';

interface UserData {
    id?: number;
    full_name: string;
    email: string;
    role: string;
    password?: string;
    created_at?: string;
}

export function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [formData, setFormData] = useState<UserData>({
        full_name: '',
        email: '',
        role: 'user',
        password: ''
    });
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users/manage.php');
            const data = await response.json();
            if (data.records) {
                setUsers(data.records);
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const url = editingUser ? '/api/users/manage.php' : '/api/users/manage.php';
            const method = editingUser ? 'PUT' : 'POST';
            
            await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingUser ? { ...formData, id: editingUser.id } : formData)
            });
            
            fetchUsers();
            resetForm();
        } catch (error) {
            console.error("Error saving user", error);
        }
        setLoading(false);
    };

    const handleEdit = (user: UserData) => {
        setEditingUser(user);
        setFormData({
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            password: ''
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await fetch('/api/users/manage.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const resetForm = () => {
        setFormData({ full_name: '', email: '', role: 'user', password: '' });
        setEditingUser(null);
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-20 lg:pt-24">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 font-impact">USER MANAGEMENT</h1>
                    <a 
                        href="/admin" 
                        className="inline-flex items-center text-gray-400 hover:text-white text-sm sm:text-base font-medium transition-colors touch-target"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </a>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Form */}
                    <div className="xl:col-span-1">
                        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-200">
                                {editingUser ? 'Edit User' : 'Create New User'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                                    <input 
                                        name="full_name" 
                                        placeholder="Enter full name" 
                                        value={formData.full_name} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                                    <input 
                                        name="email" 
                                        type="email"
                                        placeholder="Enter email address" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
                                    <select 
                                        name="role" 
                                        value={formData.role} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Password {editingUser && <span className="text-xs text-gray-500">(leave empty to keep current)</span>}
                                    </label>
                                    <input 
                                        name="password" 
                                        type="password"
                                        placeholder={editingUser ? "New password" : "Enter password"} 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required={!editingUser}
                                    />
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={loading} 
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        {loading ? 'Processing...' : (editingUser ? 'UPDATE USER' : 'CREATE USER')}
                                    </button>
                                    {editingUser && (
                                        <button 
                                            type="button" 
                                            onClick={resetForm}
                                            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors touch-target text-sm sm:text-base"
                                        >
                                            CANCEL
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="xl:col-span-2">
                        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-200">System Users</h2>
                                <div className="text-xs sm:text-sm text-gray-400">
                                    {users.length} {users.length === 1 ? 'User' : 'Users'}
                                </div>
                            </div>
                            
                            <div className="space-y-3 sm:space-y-4">
                                {users.map((user) => (
                                    <div key={user.id} className="bg-gray-800 p-4 sm:p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3a7 7 0 017-7z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-base sm:text-lg text-red-400 truncate">{user.full_name}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.role === 'admin' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                                                    }`}>
                                                        {user.role.toUpperCase()}
                                                    </span>
                                                    <span className="inline-flex items-center text-xs text-gray-500">
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {new Date(user.created_at!).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row sm:flex-col gap-2">
                                                <button 
                                                    onClick={() => handleEdit(user)} 
                                                    className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors touch-target"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2h2.828l-8.586-8.586z" />
                                                    </svg>
                                                    EDIT
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id!)} 
                                                    className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors touch-target"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {users.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-lg mb-2">No users found</div>
                                        <p className="text-gray-500 text-sm">Create your first user to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
