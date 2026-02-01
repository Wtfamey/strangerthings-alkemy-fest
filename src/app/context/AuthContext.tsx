import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    full_name: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                console.log('AuthContext: Loaded user from localStorage:', parsedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('AuthContext: Error loading user from localStorage:', error);
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (userData: User) => {
        console.log('AuthContext: Logging in user:', userData);
        setUser(userData);
        try {
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('AuthContext: User saved to localStorage');
        } catch (error) {
            console.error('AuthContext: Error saving user to localStorage:', error);
        }
    };

    const logout = () => {
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
