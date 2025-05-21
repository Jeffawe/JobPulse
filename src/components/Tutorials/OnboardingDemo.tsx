import React, { useState } from 'react';
import SteppedModal from './SteppedModal';
import { Button } from '@/components/ui/button';
import { Check, Mail, ShieldCheck, User } from 'lucide-react';

const OnboardingDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define your modal steps
  const onboardingSteps = [
    {
      title: "Welcome to JobPulse",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Let's get you set up</h3>
          <p className="text-center text-gray-600">
            Follow these quick steps to set up your account and start tracking your job applications effectively.
          </p>
        </div>
      ),
    },
    {
      title: "Connect Your Email",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Email Integration</h3>
          <p className="text-gray-600">
            JobPulse can scan your inbox for job-related emails and automatically track your applications.
            We respect your privacy and only access job-related emails.
          </p>
          <div className="border rounded-md p-3 bg-gray-50">
            <p className="text-sm text-gray-500">
              You'll be asked to grant permission in the next screen (you can skip this step if you prefer).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Discord Notifications",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
            <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center">Stay Updated via Discord</h3>
          <p className="text-gray-600">
            Get real-time notifications about your job applications through our Discord bot.
            Never miss an important update on your job search journey.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Bot Available and Ready</span>
          </div>
        </div>
      ),
    },
    {
      title: "All Set!",
      content: (
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium">You're Ready to Go!</h3>
          <p className="text-gray-600">
            Your JobPulse account is now set up. Start tracking your job applications
            and stay organized throughout your job search.
          </p>
          <div className="pt-4">
            <div className="flex justify-center items-center">
              <ShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">Your data is secure and private</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleComplete = () => {
    console.log("Onboarding completed!");
    // Implement any completion logic here
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsModalOpen(true)}>
        Start Onboarding
      </Button>

      <SteppedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        steps={onboardingSteps}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default OnboardingDemo;