"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface PreferenceQuizProps {
  onComplete?: (preferences: QuizResults) => void;
}

interface QuizResults {
  vacationType: string;
  budget: number;
  activities: string[];
  atmosphere: string;
  travelSeason: string;
  accessibility: string[];
}

const PreferenceQuiz = ({ onComplete = () => {} }: PreferenceQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<QuizResults>({
    vacationType: "relaxation",
    budget: 3,
    activities: [],
    atmosphere: "quiet",
    travelSeason: "summer",
    accessibility: [],
  });

  const steps = [
    "Vacation Type",
    "Budget",
    "Activities",
    "Atmosphere",
    "Travel Season",
    "Accessibility",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePreference = (key: keyof QuizResults, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleActivity = (activity: string) => {
    setPreferences((prev) => {
      const activities = [...prev.activities];
      if (activities.includes(activity)) {
        return {
          ...prev,
          activities: activities.filter((a) => a !== activity),
        };
      } else {
        return {
          ...prev,
          activities: [...activities, activity],
        };
      }
    });
  };

  const toggleAccessibility = (option: string) => {
    setPreferences((prev) => {
      const accessibility = [...prev.accessibility];
      if (accessibility.includes(option)) {
        return {
          ...prev,
          accessibility: accessibility.filter((a) => a !== option),
        };
      } else {
        return {
          ...prev,
          accessibility: [...accessibility, option],
        };
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Vacation Type
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              What type of vacation are you looking for?
            </h3>
            <RadioGroup
              value={preferences.vacationType}
              onValueChange={(value) => updatePreference("vacationType", value)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="relaxation" id="relaxation" />
                <Label
                  htmlFor="relaxation"
                  className="flex-grow cursor-pointer"
                >
                  Relaxation & Unwinding
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="adventure" id="adventure" />
                <Label htmlFor="adventure" className="flex-grow cursor-pointer">
                  Adventure & Exploration
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="party" id="party" />
                <Label htmlFor="party" className="flex-grow cursor-pointer">
                  Party & Nightlife
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family" className="flex-grow cursor-pointer">
                  Family-Friendly
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="romantic" id="romantic" />
                <Label htmlFor="romantic" className="flex-grow cursor-pointer">
                  Romantic Getaway
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="cultural" id="cultural" />
                <Label htmlFor="cultural" className="flex-grow cursor-pointer">
                  Cultural Experience
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 1: // Budget
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">What's your budget range?</h3>
            <div className="space-y-8">
              <Slider
                value={[preferences.budget]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => updatePreference("budget", value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm">
                <span>Budget</span>
                <span>Mid-range</span>
                <span>Luxury</span>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-center">
                  {preferences.budget === 1 &&
                    "Economy: Basic accommodations and local dining"}
                  {preferences.budget === 2 &&
                    "Budget-friendly: Comfortable stays with some extras"}
                  {preferences.budget === 3 &&
                    "Mid-range: Quality accommodations and experiences"}
                  {preferences.budget === 4 &&
                    "Premium: High-end accommodations and dining"}
                  {preferences.budget === 5 &&
                    "Luxury: Top-tier resorts and exclusive experiences"}
                </p>
              </div>
            </div>
          </div>
        );

      case 2: // Activities
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              What activities interest you? (Select all that apply)
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { id: "beaches", label: "Beaches & Swimming" },
                { id: "hiking", label: "Hiking & Nature" },
                { id: "history", label: "Historical Sites" },
                { id: "food", label: "Food & Culinary Experiences" },
                { id: "watersports", label: "Water Sports" },
                { id: "nightlife", label: "Nightlife & Entertainment" },
                { id: "shopping", label: "Shopping" },
                { id: "camping", label: "Camping" },
                { id: "sailing", label: "Sailing" },
                { id: "wellness", label: "Wellness & Spa" },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent"
                >
                  <Checkbox
                    id={activity.id}
                    checked={preferences.activities.includes(activity.id)}
                    onCheckedChange={() => toggleActivity(activity.id)}
                  />
                  <Label
                    htmlFor={activity.id}
                    className="flex-grow cursor-pointer"
                  >
                    {activity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Atmosphere
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              What atmosphere do you prefer?
            </h3>
            <RadioGroup
              value={preferences.atmosphere}
              onValueChange={(value) => updatePreference("atmosphere", value)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="quiet" id="quiet" />
                <Label htmlFor="quiet" className="flex-grow cursor-pointer">
                  Quiet & Peaceful
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="lively" id="lively" />
                <Label htmlFor="lively" className="flex-grow cursor-pointer">
                  Lively & Energetic
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="authentic" id="authentic" />
                <Label htmlFor="authentic" className="flex-grow cursor-pointer">
                  Authentic & Traditional
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="touristy" id="touristy" />
                <Label htmlFor="touristy" className="flex-grow cursor-pointer">
                  Tourist-Friendly
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="luxurious" id="luxurious" />
                <Label htmlFor="luxurious" className="flex-grow cursor-pointer">
                  Luxurious & Upscale
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote" className="flex-grow cursor-pointer">
                  Remote & Secluded
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 4: // Travel Season
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">When do you plan to travel?</h3>
            <Select
              value={preferences.travelSeason}
              onValueChange={(value) => updatePreference("travelSeason", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring (March-May)</SelectItem>
                <SelectItem value="early_summer">
                  Early Summer (June)
                </SelectItem>
                <SelectItem value="summer">
                  Peak Summer (July-August)
                </SelectItem>
                <SelectItem value="late_summer">
                  Late Summer (September)
                </SelectItem>
                <SelectItem value="fall">Fall (October-November)</SelectItem>
                <SelectItem value="winter">
                  Winter (December-February)
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 rounded-lg bg-muted p-4">
              <h4 className="font-medium">Season Notes:</h4>
              {preferences.travelSeason === "spring" && (
                <p className="mt-2 text-sm">
                  Mild weather, fewer tourists, blooming landscapes, some
                  businesses may still be closed.
                </p>
              )}
              {preferences.travelSeason === "early_summer" && (
                <p className="mt-2 text-sm">
                  Warm weather, moderate crowds, all businesses open, good
                  swimming conditions.
                </p>
              )}
              {preferences.travelSeason === "summer" && (
                <p className="mt-2 text-sm">
                  Hot weather, crowded, all attractions open, highest prices,
                  perfect for swimming.
                </p>
              )}
              {preferences.travelSeason === "late_summer" && (
                <p className="mt-2 text-sm">
                  Warm weather, fewer crowds than peak summer, all businesses
                  still open, excellent swimming.
                </p>
              )}
              {preferences.travelSeason === "fall" && (
                <p className="mt-2 text-sm">
                  Mild weather, few tourists, some businesses begin to close,
                  swimming still possible.
                </p>
              )}
              {preferences.travelSeason === "winter" && (
                <p className="mt-2 text-sm">
                  Cool weather, very few tourists, many businesses closed,
                  authentic local experience.
                </p>
              )}
            </div>
          </div>
        );

      case 5: // Accessibility
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Do you have any accessibility requirements?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "wheelchair", label: "Wheelchair accessible locations" },
                {
                  id: "limited_mobility",
                  label: "Limited mobility accommodations",
                },
                { id: "easy_transport", label: "Easy transportation options" },
                { id: "medical", label: "Proximity to medical facilities" },
                { id: "dietary", label: "Special dietary requirements" },
              ].map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent"
                >
                  <Checkbox
                    id={option.id}
                    checked={preferences.accessibility.includes(option.id)}
                    onCheckedChange={() => toggleAccessibility(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-grow cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-background">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Find Your Perfect Greek Island
        </CardTitle>
        <div className="mt-2">
          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="h-2"
          />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>Start</span>
            <span>Complete</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderStepContent()}</CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentStep === steps.length - 1 ? (
            <>
              Complete <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PreferenceQuiz;
