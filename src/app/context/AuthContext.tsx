import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    full_name: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check both localStorage and session via API
        const checkAuth = async () => {
            try {
                // First check localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('AuthContext: Loaded user from localStorage:', parsedUser);
                    setUser(parsedUser);
                    setIsLoading(false);
                    return;
                }

                // If no localStorage, check session via API
                const response = await fetch('/api/auth/check-session.php');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.user) {
                        console.log('AuthContext: Loaded user from session:', data.user);
                        setUser(data.user);
                        setIsLoading(false);
                    } else {
                        console.log('AuthContext: No session user found');
                        setUser(null);
                        setIsLoading(false);
                    }
                } else {
                    console.log('AuthContext: Session check failed');
                    setUser(null);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('AuthContext: Error checking authentication:', error);
                setUser(null);
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success && data.user) {
                setUser(data.user);
                try {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    console.log('AuthContext: User saved to localStorage');
                } catch (error) {
                    console.error('AuthContext: Error saving user to localStorage:', error);
                }
                return true;
            } else {
                console.error('AuthContext: Login failed:', data.message);
                return false;
            }
        } catch (error) {
            console.error('AuthContext: Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/logout.php', {
                method: 'POST'
            });
        } catch (error) {
            console.error('AuthContext: Logout error:', error);
        }
        
        console.log('AuthContext: Logging out user');
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading
    };

    console.log('AuthContext: Current state:', {
        user,
        isAuthenticated: value.isAuthenticated,
        isAdmin: value.isAdmin,
        isLoading
    });

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
