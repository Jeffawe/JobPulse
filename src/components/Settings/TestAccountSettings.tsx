import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TestAccountWarning from './TestAccountWarning';
import { AlertTriangle } from 'lucide-react';

const TestAccountSettings: React.FC = () => {
  const testAccountInfos = [
    "You can only use the Discord Bot integration — manual webhook input is disabled.",
    "Test account data is simulated and doesn't represent real people or companies.",
    "Some additional features may be unavailable.",
    "Data may be cleared after a week to a month depending on server cleanup cycles.",
    "You cannot change email credentials on a test account.",
    "To make a bug report. Got to Help and Support page and send a message there. Add Bug Report as the subject and describe the issue.", 
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      {/* Warning Banner */}
      <TestAccountWarning />

      {/* Test Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5 text-yellow-700" />
            Test Account Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            {testAccountInfos.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAccountSettings;
