import React, { useEffect, useState } from 'react';
import SteppedModal from './SteppedModal';
import { Button } from '@/components/ui/button';
import { Check, Mail, ShieldCheck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('onboarding');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.onboarding !== undefined) {
          setCurrentStep(parsed.onboarding);
        }
        if (!parsed.completed) {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Failed to parse onboarding data:", error);
      }
    }
  }, []);

  const handleDiscordIntegration = () => {
    handleStoreValue();

    navigate('/settings/discord');
  };

  const handleStoreValue = () => {
    let storedValue = {
      "onboarding": currentStep,
      "completed": true,
    }

    localStorage.setItem('onboarding', JSON.stringify(storedValue));
  }

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
            Follow these quick steps to configure your account and start effortlessly tracking your job applications.
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
            JobPulse scans your inbox for job-related emails and automatically tracks your applications.
            We respect your privacy — only relevant job-related emails are accessed using filters we help you create.
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
            If you logged in using Google, this step is likely already complete. You can manually create the filter if needed using the Create Filter button (If it's not there. A filter has been created in your email. Check your mail to see it).
            Note: If you're using a test account, this feature is disabled — feel free to explore the features and connect your account later.
          </p>
        </div>
      ),
    },
    {
      title: "Discord Integration",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
            <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="..." />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center">Stay Updated via Discord</h3>
          <p className="text-gray-600">
            JobPulse doesn't store your data on our servers. Instead, we send updates directly to your personal Discord channel.
            Set this up by adding your Discord webhook, or connect your bot for advanced features.
            Start your setup <Button variant="link" onClick={handleDiscordIntegration}>here</Button>.
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
            Your JobPulse account is now fully set up. Start tracking your job applications, stay organized, and never miss an update.
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
    handleStoreValue();
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
        currentStepG={currentStep}
        setCurrentStepG={setCurrentStep}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default OnboardingDemo;