import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Sparkles } from 'lucide-react';

const BetaSettings: React.FC = () => {
  const betaNotices = [
    "JobPulse is currently in Beta — some features may not work as expected or may change frequently.",
    "We're actively improving the platform, and your feedback is extremely valuable.",
    "If you encounter bugs, unexpected behavior, or have suggestions, please go to the Settings > Help & Support page to report them.",
    "All data is stored securely (JobPulse NEVER stores any data from your email), but it may be cleared periodically during the beta phase.",
    "This version is intended for testing and feedback purposes. Production stability is not guaranteed yet.",
  ];

  const upcomingFeatures = [
    "Reminder Feature for Interviews and Follow-ups",
    "Sending reminders on channels like Whatsapp and SMS",
    "Adding Automatic Polling from Email"
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      {/* Beta Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5 text-yellow-700" />
            You're using a Beta version of JobPulse
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            {betaNotices.map((notice, index) => (
              <li key={index}>{notice}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Upcoming Features Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            Upcoming Features
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            {upcomingFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetaSettings;
