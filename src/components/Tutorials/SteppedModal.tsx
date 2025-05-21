import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface SteppedModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
  onComplete?: () => void;
}

const SteppedModal: React.FC<SteppedModalProps> = ({
  isOpen,
  onClose,
  steps,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // On last step, complete the process
      onComplete?.();
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Reset step when closing
    setCurrentStep(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {steps[currentStep]?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="mt-2 mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-blue-600 font-medium">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step content */}
        <div className="py-4 min-h-[12rem]">
          {steps[currentStep]?.content}
        </div>

        {/* Navigation buttons */}
        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="sm:order-1"
            >
              Cancel
            </Button>
            {currentStep > 0 && (
              <Button
                variant="secondary"
                onClick={handleBack}
                className="sm:order-2"
              >
                Back
              </Button>
            )}
          </div>
          <Button 
            onClick={handleNext} 
            className="sm:order-3"
          >
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SteppedModal;