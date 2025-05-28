"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Music,
  TreePine,
  Users,
  Wallet,
  Calendar,
  Umbrella,
  Accessibility,
} from "lucide-react";

interface IslandFinderProps {
  onResults?: (results: any[]) => void;
}

export default function IslandFinder({
  onResults = () => {},
}: IslandFinderProps) {
  const [activeTab, setActiveTab] = useState("quiz");
  const [quizStep, setQuizStep] = useState(1);
  const [preferences, setPreferences] = useState({
    activityType: "",
    budget: 50,
    season: "",
    accessibility: false,
    beachType: [],
    nightlife: 0,
    familyFriendly: false,
    localCuisine: false,
    historicalSites: false,
    hiking: false,
  });

  // Progress calculation
  const totalSteps = 3;
  const progress = (quizStep / totalSteps) * 100;

  const handleQuizSubmit = () => {
    // In a real implementation, this would process the quiz answers and return matching islands
    const mockResults = [
      {
        id: 1,
        name: "Naxos",
        description: "Perfect for families and nature lovers",
        attributes: { beaches: 5, nightlife: 3, crowds: 2 },
      },
      {
        id: 2,
        name: "Milos",
        description: "Known for unique landscapes and quiet beaches",
        attributes: { beaches: 5, nightlife: 2, crowds: 2 },
      },
      {
        id: 3,
        name: "Paros",
        description: "Balance of nightlife and relaxation",
        attributes: { beaches: 4, nightlife: 4, crowds: 3 },
      },
    ];

    onResults(mockResults);
  };

  const handleFilterSubmit = () => {
    // Similar to quiz submit but using filter values
    const mockResults = [
      {
        id: 4,
        name: "Folegandros",
        description: "Peaceful island with dramatic cliffs",
        attributes: { beaches: 3, nightlife: 1, crowds: 1 },
      },
      {
        id: 5,
        name: "Sifnos",
        description: "Known for amazing food and pottery",
        attributes: { beaches: 4, nightlife: 2, crowds: 2 },
      },
      {
        id: 6,
        name: "Amorgos",
        description: "Dramatic landscapes and hiking trails",
        attributes: { beaches: 3, nightlife: 2, crowds: 1 },
      },
    ];

    onResults(mockResults);
  };

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const renderQuizStep = () => {
    switch (quizStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-island-blue flex items-center gap-2">
              <span className="bg-sky-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              What type of vacation are you looking for?
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose the experience that interests you most
            </p>

            <RadioGroup
              value={preferences.activityType}
              onValueChange={(value) => updatePreference("activityType", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
            >
              <div
                className={`border rounded-xl p-4 transition-all ${preferences.activityType === "party" ? "border-island-blue bg-sky-50 shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-sky-50/50"}`}
              >
                <RadioGroupItem value="party" id="party" className="sr-only" />
                <Label
                  htmlFor="party"
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-3 rounded-full">
                    <Music className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">
                    Party & Nightlife
                  </span>
                  <p className="text-xs text-center text-muted-foreground">
                    Vibrant bars, clubs and entertainment
                  </p>
                </Label>
              </div>

              <div
                className={`border rounded-xl p-4 transition-all ${preferences.activityType === "relaxation" ? "border-island-blue bg-sky-50 shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-sky-50/50"}`}
              >
                <RadioGroupItem
                  value="relaxation"
                  id="relaxation"
                  className="sr-only"
                />
                <Label
                  htmlFor="relaxation"
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-3 rounded-full">
                    <Umbrella className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">
                    Relaxation & Beaches
                  </span>
                  <p className="text-xs text-center text-muted-foreground">
                    Peaceful shores and tranquil settings
                  </p>
                </Label>
              </div>

              <div
                className={`border rounded-xl p-4 transition-all ${preferences.activityType === "nature" ? "border-island-blue bg-sky-50 shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-sky-50/50"}`}
              >
                <RadioGroupItem
                  value="nature"
                  id="nature"
                  className="sr-only"
                />
                <Label
                  htmlFor="nature"
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-3 rounded-full">
                    <TreePine className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">
                    Nature & Adventure
                  </span>
                  <p className="text-xs text-center text-muted-foreground">
                    Hiking, exploring and outdoor activities
                  </p>
                </Label>
              </div>
            </RadioGroup>

            <div className="pt-6 flex justify-end">
              <Button
                onClick={() => setQuizStep(2)}
                className="bg-island-gradient hover:bg-island-gradient-hover transition-all duration-300 gap-2"
                disabled={!preferences.activityType}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
              <h3 className="text-xl font-semibold text-island-blue flex items-center gap-2">
                <span className="bg-sky-100 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-island-teal" />
                </span>
                What's your budget?
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Drag the slider to set your budget level
              </p>
              <div className="py-4">
                <Slider
                  value={[preferences.budget]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    updatePreference("budget", value[0])
                  }
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex flex-col items-center">
                    <span className="bg-green-100 p-1 rounded-full mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </span>
                    <span>Budget</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="bg-blue-100 p-1 rounded-full mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </span>
                    <span>Mid-range</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="bg-purple-100 p-1 rounded-full mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </span>
                    <span>Luxury</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
              <h3 className="text-xl font-semibold text-island-blue flex items-center gap-2">
                <span className="bg-sky-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-island-blue" />
                </span>
                When do you plan to travel?
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Select your preferred travel season
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                {[
                  {
                    value: "spring",
                    label: "Spring",
                    sublabel: "Apr-May",
                    icon: "🌸",
                  },
                  {
                    value: "early-summer",
                    label: "Early Summer",
                    sublabel: "June",
                    icon: "☀️",
                  },
                  {
                    value: "peak-summer",
                    label: "Peak Summer",
                    sublabel: "Jul-Aug",
                    icon: "🏖️",
                  },
                  {
                    value: "late-summer",
                    label: "Late Summer",
                    sublabel: "Sept",
                    icon: "🌊",
                  },
                  {
                    value: "fall",
                    label: "Fall",
                    sublabel: "Oct-Nov",
                    icon: "🍂",
                  },
                ].map((season) => (
                  <div
                    key={season.value}
                    className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${preferences.season === season.value ? "border-island-blue bg-white shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-white"}`}
                    onClick={() => updatePreference("season", season.value)}
                  >
                    <div className="text-2xl mb-1">{season.icon}</div>
                    <div className="font-medium">{season.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {season.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-center space-x-3">
              <Checkbox
                id="accessibility"
                checked={preferences.accessibility}
                onCheckedChange={(checked) =>
                  updatePreference("accessibility", checked)
                }
                className="h-5 w-5"
              />
              <div>
                <Label
                  htmlFor="accessibility"
                  className="font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Accessibility className="h-5 w-5 text-island-violet" />I need
                  accessible accommodations
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll prioritize islands with accessible facilities
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setQuizStep(1)}
                className="gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back
              </Button>
              <Button
                onClick={() => setQuizStep(3)}
                className="bg-island-gradient hover:bg-island-gradient-hover transition-all duration-300 gap-2"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
              <h3 className="text-xl font-semibold text-island-blue flex items-center gap-2">
                <span className="bg-sky-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m12 8 4 4"></path>
                    <path d="m8 12 4 4"></path>
                    <path d="m16 8-8 8"></path>
                  </svg>
                </span>
                What's important to you?
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Select all that apply to personalize your recommendations
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${preferences.familyFriendly ? "border-island-blue bg-white shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-white"}`}
                  onClick={() =>
                    updatePreference(
                      "familyFriendly",
                      !preferences.familyFriendly,
                    )
                  }
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-medium">Family-friendly</span>
                  </div>
                  <Checkbox
                    id="familyFriendly"
                    checked={preferences.familyFriendly}
                    onCheckedChange={(checked) =>
                      updatePreference("familyFriendly", checked)
                    }
                    className="sr-only"
                  />
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${preferences.localCuisine ? "border-island-blue bg-white shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-white"}`}
                  onClick={() =>
                    updatePreference("localCuisine", !preferences.localCuisine)
                  }
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600"
                      >
                        <path d="M15 11h.01"></path>
                        <path d="M11 15h.01"></path>
                        <path d="M16 16h.01"></path>
                        <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"></path>
                        <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"></path>
                      </svg>
                    </div>
                    <span className="font-medium">Local cuisine</span>
                  </div>
                  <Checkbox
                    id="localCuisine"
                    checked={preferences.localCuisine}
                    onCheckedChange={(checked) =>
                      updatePreference("localCuisine", checked)
                    }
                    className="sr-only"
                  />
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${preferences.historicalSites ? "border-island-blue bg-white shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-white"}`}
                  onClick={() =>
                    updatePreference(
                      "historicalSites",
                      !preferences.historicalSites,
                    )
                  }
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-orange-600"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                        <path d="M9 22v-4h6v4"></path>
                        <path d="M8 6h.01"></path>
                        <path d="M16 6h.01"></path>
                        <path d="M12 6h.01"></path>
                        <path d="M12 10h.01"></path>
                        <path d="M12 14h.01"></path>
                        <path d="M16 10h.01"></path>
                        <path d="M16 14h.01"></path>
                        <path d="M8 10h.01"></path>
                        <path d="M8 14h.01"></path>
                      </svg>
                    </div>
                    <span className="font-medium">Historical sites</span>
                  </div>
                  <Checkbox
                    id="historicalSites"
                    checked={preferences.historicalSites}
                    onCheckedChange={(checked) =>
                      updatePreference("historicalSites", checked)
                    }
                    className="sr-only"
                  />
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${preferences.hiking ? "border-island-blue bg-white shadow-md" : "border-gray-200 hover:border-island-blue hover:bg-white"}`}
                  onClick={() =>
                    updatePreference("hiking", !preferences.hiking)
                  }
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                        <path d="M5 3v4"></path>
                        <path d="M19 17v4"></path>
                        <path d="M3 5h4"></path>
                        <path d="M17 19h4"></path>
                      </svg>
                    </div>
                    <span className="font-medium">Hiking trails</span>
                  </div>
                  <Checkbox
                    id="hiking"
                    checked={preferences.hiking}
                    onCheckedChange={(checked) =>
                      updatePreference("hiking", checked)
                    }
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
              <h3 className="text-xl font-semibold text-island-blue flex items-center gap-2">
                <span className="bg-sky-100 p-2 rounded-full">
                  <Music className="h-5 w-5 text-purple-500" />
                </span>
                Nightlife preference
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                How lively do you want your destination to be in the evenings?
              </p>
              <Slider
                value={[preferences.nightlife]}
                min={0}
                max={5}
                step={1}
                onValueChange={(value) =>
                  updatePreference("nightlife", value[0])
                }
                className="py-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8h1a4 4 0 1 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" x2="6" y1="1" y2="4"></line>
                    <line x1="10" x2="10" y1="1" y2="4"></line>
                    <line x1="14" x2="14" y1="1" y2="4"></line>
                  </svg>
                  <span className="mt-1">Very quiet</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  <span className="mt-1">Moderate</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                  <span className="mt-1">Very lively</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setQuizStep(2)}
                className="gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back
              </Button>
              <Button
                onClick={handleQuizSubmit}
                className="bg-island-gradient hover:bg-island-gradient-hover transition-all duration-300 gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                Find My Island
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center bg-island-gradient text-white rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601581875039-e899893d520c?w=800&q=60')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              <span className="bg-white text-island-blue rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
              </span>
              AI Island Matcher
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Discover your perfect Greek island getaway based on your
              preferences
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Progress bar */}
          {activeTab === "quiz" && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Step {quizStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-island-gradient transition-all duration-500 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-sky-50">
              <TabsTrigger
                value="quiz"
                className="text-base py-3 data-[state=active]:bg-island-gradient data-[state=active]:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M8.5 13.5l2 2 5-5"></path>
                </svg>
                Take the Quiz
              </TabsTrigger>
              <TabsTrigger
                value="filter"
                className="text-base py-3 data-[state=active]:bg-island-gradient data-[state=active]:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Use Filters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quiz" className="mt-0">
              {renderQuizStep()}
            </TabsContent>

            <TabsContent value="filter" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Island Attributes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label>Beach Quality</Label>
                      <Slider
                        defaultValue={[3]}
                        min={1}
                        max={5}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Not important</span>
                        <span>Very important</span>
                      </div>
                    </div>

                    <div>
                      <Label>Nightlife</Label>
                      <Slider
                        defaultValue={[3]}
                        min={1}
                        max={5}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Quiet</span>
                        <span>Lively</span>
                      </div>
                    </div>

                    <div>
                      <Label>Crowd Level</Label>
                      <Slider
                        defaultValue={[2]}
                        min={1}
                        max={5}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Secluded</span>
                        <span>Bustling</span>
                      </div>
                    </div>

                    <div>
                      <Label>Budget</Label>
                      <Slider
                        defaultValue={[50]}
                        min={0}
                        max={100}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Budget</span>
                        <span>Luxury</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">
                    Activities & Amenities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-hiking" />
                      <Label htmlFor="filter-hiking">Hiking Trails</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-historical" />
                      <Label htmlFor="filter-historical">
                        Historical Sites
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-watersports" />
                      <Label htmlFor="filter-watersports">Water Sports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-family" />
                      <Label htmlFor="filter-family">Family Friendly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-cuisine" />
                      <Label htmlFor="filter-cuisine">Local Cuisine</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-accessibility" />
                      <Label htmlFor="filter-accessibility">Accessible</Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleFilterSubmit} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
