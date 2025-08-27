"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, TreeDeciduous, Images, BookOpen, Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const onboardingSteps = [
  {
    icon: <TreeDeciduous className="h-10 w-10 text-primary" />,
    title: "Welcome to HeritageHub!",
    description: "Let's take a quick tour to get you started on your journey to discover, document, and share your family's story.",
  },
  {
    icon: <TreeDeciduous className="h-10 w-10 text-primary" />,
    title: "The Family Oak",
    description: "This is the heart of your history. Visualize your lineage as a growing oak tree. Click the plus icon on any member to add relatives.",
  },
  {
    icon: <Images className="h-10 w-10 text-primary" />,
    title: "Media & Memories",
    description: "Use the AI Formatting Assistant and Media Gallery to upload, organize, and enhance your family photos and documents.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Family Stories",
    description: "Document the tales and memories that bring your family's history to life. You can read and contribute to your family's collection of stories.",
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: "Tools & Settings",
    description: "Manage your data, control privacy settings, and use powerful admin tools to maintain your family archive. You're all set to begin!",
  },
];

const ONBOARDING_COMPLETED_KEY = 'heritagehub_onboarding_completed';

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    if (hasCompletedOnboarding !== 'true') {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setIsOpen(false);
  };

  const currentStep = onboardingSteps[step];
  const progress = ((step + 1) / onboardingSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            {currentStep.icon}
          </div>
          <DialogTitle className="text-2xl font-headline">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        
        <Progress value={progress} className="w-full my-4" />

        <DialogFooter className="flex justify-between w-full">
          {step > 0 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : <div></div>}

          <Button onClick={handleNext}>
            {step === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
            {step < onboardingSteps.length - 1 ? <ArrowRight className="ml-2 h-4 w-4" /> : <Check className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
