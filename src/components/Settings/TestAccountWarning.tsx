import { AlertTriangle } from 'lucide-react';

const TestAccountWarning = () => {

    return (
        <div className="flex items-start gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 mb-4 rounded-md border border-yellow-300">
            <AlertTriangle className="w-5 h-5 mt-1" />
            <div className="text-sm">
                <p className="font-medium">
                    You are currently using a test account. Some features are limited in this mode.
                </p>
                <p className="mt-1">
                    All data is simulated and should not be considered representative of any real person, company, or system. This mode is intended for demonstration and testing purposes only.
                </p>
                <p className="mt-1">
                    Test accounts are retained for up to one month. In certain cases, especially during storage maintenance or cleanup, they may be removed sooner — sometimes within a week.
                </p>
                <a href="/settings/test" className="text-yellow-900 underline mt-1 inline-block">
                    Go to Test Account Settings
                </a>
            </div>
        </div>
    );
};

export default TestAccountWarning;
