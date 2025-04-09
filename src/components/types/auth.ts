export interface User {
    _id: string;
    name: string;
    email: string;
    discord_webhook: string;
    notification_channel?: string;
    notification_value: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (data: User | null) => void;
    googleLogin: (token: string) => Promise<void>;
    logout: () => Promise<void>;
  }