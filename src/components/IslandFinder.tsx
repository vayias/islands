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
            <h3 className="text-lg font-medium">
              What type of vacation are you looking for?
            </h3>
            <RadioGroup
              value={preferences.activityType}
              onValueChange={(value) => updatePreference("activityType", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="party" id="party" />
                <Label htmlFor="party" className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-blue-500" />
                  Party & Nightlife
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="relaxation" id="relaxation" />
                <Label htmlFor="relaxation" className="flex items-center gap-2">
                  <Umbrella className="h-5 w-5 text-yellow-500" />
                  Relaxation & Beaches
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nature" id="nature" />
                <Label htmlFor="nature" className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-500" />
                  Nature & Adventure
                </Label>
              </div>
            </RadioGroup>

            <div className="pt-4">
              <Button onClick={() => setQuizStep(2)}>Next</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                What's your budget?
              </h3>
              <p className="text-sm text-muted-foreground">
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Budget</span>
                  <span>Mid-range</span>
                  <span>Luxury</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                When do you plan to travel?
              </h3>
              <Select
                value={preferences.season}
                onValueChange={(value) => updatePreference("season", value)}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring (April-May)</SelectItem>
                  <SelectItem value="early-summer">
                    Early Summer (June)
                  </SelectItem>
                  <SelectItem value="peak-summer">
                    Peak Summer (July-August)
                  </SelectItem>
                  <SelectItem value="late-summer">
                    Late Summer (September)
                  </SelectItem>
                  <SelectItem value="fall">Fall (October-November)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="accessibility"
                checked={preferences.accessibility}
                onCheckedChange={(checked) =>
                  updatePreference("accessibility", checked)
                }
              />
              <Label
                htmlFor="accessibility"
                className="flex items-center gap-2"
              >
                <Accessibility className="h-5 w-5 text-purple-600" />I need
                accessible accommodations
              </Label>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setQuizStep(1)}>
                Back
              </Button>
              <Button onClick={() => setQuizStep(3)}>Next</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">What's important to you?</h3>
              <p className="text-sm text-muted-foreground">
                Select all that apply
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyFriendly"
                    checked={preferences.familyFriendly}
                    onCheckedChange={(checked) =>
                      updatePreference("familyFriendly", checked)
                    }
                  />
                  <Label
                    htmlFor="familyFriendly"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-5 w-5 text-blue-500" />
                    Family-friendly
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="localCuisine"
                    checked={preferences.localCuisine}
                    onCheckedChange={(checked) =>
                      updatePreference("localCuisine", checked)
                    }
                  />
                  <Label htmlFor="localCuisine">Local cuisine</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="historicalSites"
                    checked={preferences.historicalSites}
                    onCheckedChange={(checked) =>
                      updatePreference("historicalSites", checked)
                    }
                  />
                  <Label htmlFor="historicalSites">Historical sites</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hiking"
                    checked={preferences.hiking}
                    onCheckedChange={(checked) =>
                      updatePreference("hiking", checked)
                    }
                  />
                  <Label htmlFor="hiking">Hiking opportunities</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Nightlife preference</h3>
              <Slider
                value={[preferences.nightlife]}
                min={0}
                max={5}
                step={1}
                onValueChange={(value) =>
                  updatePreference("nightlife", value[0])
                }
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Very quiet</span>
                <span>Moderate</span>
                <span>Very lively</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setQuizStep(2)}>
                Back
              </Button>
              <Button onClick={handleQuizSubmit}>Find My Island</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold">
            Greek Island Finder
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Discover your perfect Greek island getaway based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="quiz" className="text-base py-3">
                Take the Quiz
              </TabsTrigger>
              <TabsTrigger value="filter" className="text-base py-3">
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
