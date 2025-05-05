export interface User {
    id: number;
    name: string;
    email: string;
    discord_webhook: string;
    notification_channel?: string;
    notification_value: string;
    notification_status?: string;
    email_addresses?: string;
    label_id?: string;
}

export interface JobApplication {
    id: number;
    company: string;
    position: string;
    link: string;
    status: string;
    location: string;
    date: Date;
}

export interface EmailData {
    id: number;
    company_name: string;
    job_title: string;
    job_link: string;
    jobStatus: string;
    location: string;
    salary: string;
    date: string;
    metadata: any;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (data: User | null) => void;
    googleLogin: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export enum NotificationChannel {
    WHATSAPP = 'WhatsApp',
    SMS = 'SMS',
    EMAIL = 'Email',
}

export enum NotificationStatus {
    APPLIED = 'Applied',
    ASSESSMENT = 'Assessment',
    INTERVIEW_COMPLETE = 'Interview Complete',
    INTERVIEW_SCHEDULED = 'Interview Scheduled',
    OFFER = 'Offer',
    REJECTED = 'Rejected',
    ALL = 'All',
}