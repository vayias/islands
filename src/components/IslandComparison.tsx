"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Island {
  id: string;
  name: string;
  image: string;
  description: string;
  attributes: {
    beaches: number;
    nightlife: number;
    familyFriendly: number;
    nature: number;
    food: number;
    culture: number;
    accessibility: number;
    cost: number;
  };
  activities: string[];
  bestTimeToVisit: string[];
  accommodationTypes: string[];
}

interface IslandComparisonProps {
  islands?: Island[];
  onRemoveIsland?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onBookAccommodation?: (id: string) => void;
  onStartNewSearch?: () => void;
}

const IslandComparison = ({
  islands = [
    {
      id: "1",
      name: "Naxos",
      image:
        "https://images.unsplash.com/photo-1586861256632-52a3db1073ee?w=800&q=80",
      description:
        "The largest of the Cyclades islands, known for its stunning beaches and mountain villages.",
      attributes: {
        beaches: 5,
        nightlife: 3,
        familyFriendly: 5,
        nature: 4,
        food: 4,
        culture: 4,
        accessibility: 3,
        cost: 3,
      },
      activities: [
        "Hiking",
        "Windsurfing",
        "Historical Sites",
        "Beach Relaxation",
      ],
      bestTimeToVisit: ["May", "June", "September"],
      accommodationTypes: ["Hotels", "Villas", "Apartments"],
    },
    {
      id: "2",
      name: "Milos",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      description:
        "Known for its stunning lunar landscapes and colorful fishing villages.",
      attributes: {
        beaches: 5,
        nightlife: 2,
        familyFriendly: 4,
        nature: 5,
        food: 4,
        culture: 3,
        accessibility: 2,
        cost: 3,
      },
      activities: ["Swimming", "Boat Tours", "Photography", "Exploring Caves"],
      bestTimeToVisit: ["June", "July", "September"],
      accommodationTypes: ["Boutique Hotels", "Guesthouses", "Apartments"],
    },
    {
      id: "3",
      name: "Folegandros",
      image:
        "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80",
      description:
        "A quiet island with dramatic cliffs and an authentic Greek atmosphere.",
      attributes: {
        beaches: 3,
        nightlife: 2,
        familyFriendly: 3,
        nature: 5,
        food: 4,
        culture: 4,
        accessibility: 2,
        cost: 4,
      },
      activities: [
        "Hiking",
        "Cliff Diving",
        "Traditional Cuisine",
        "Stargazing",
      ],
      bestTimeToVisit: ["May", "June", "September", "October"],
      accommodationTypes: ["Small Hotels", "Traditional Houses"],
    },
  ],
  onRemoveIsland = () => {},
  onViewDetails = () => {},
  onBookAccommodation = () => {},
  onStartNewSearch = () => {},
}: IslandComparisonProps) => {
  const [hoveredAttribute, setHoveredAttribute] = useState<string | null>(null);

  const attributeDescriptions: Record<string, string> = {
    beaches: "Quality and quantity of beaches",
    nightlife: "Bars, clubs and evening entertainment",
    familyFriendly: "Suitability for families with children",
    nature: "Natural beauty and outdoor activities",
    food: "Quality and variety of dining options",
    culture: "Historical sites and cultural experiences",
    accessibility: "Ease of reaching the island",
    cost: "Overall affordability",
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full mx-0.5 ${i < rating ? "bg-primary" : "bg-gray-200"}`}
          />
        ))}
      </div>
    );
  };

  if (!islands.length) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">No Islands to Compare</h2>
        <p className="mb-6">
          Add islands to your comparison list to see them side by side.
        </p>
        <Button onClick={onStartNewSearch}>Start Island Search</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-900">
        Island Comparison
      </h2>

      {/* Island Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {islands.map((island) => (
          <Card key={island.id} className="overflow-hidden h-full">
            <div className="relative h-48 overflow-hidden">
              <img
                src={island.image}
                alt={island.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemoveIsland(island.id)}
                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
              >
                <X size={16} />
              </button>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{island.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">{island.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(island.id)}
              >
                View Details
              </Button>
              <Button size="sm" onClick={() => onBookAccommodation(island.id)}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <TooltipProvider>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {islands.map((island) => (
                  <TableHead key={island.id}>{island.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Attributes Section */}
              {Object.entries(islands[0].attributes).map(([key, _]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium flex items-center gap-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{attributeDescriptions[key] || key}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {islands.map((island) => (
                    <TableCell key={`${island.id}-${key}`}>
                      {renderRating(
                        island.attributes[
                          key as keyof typeof island.attributes
                        ],
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Activities */}
              <TableRow>
                <TableCell className="font-medium">Activities</TableCell>
                {islands.map((island) => (
                  <TableCell key={`${island.id}-activities`}>
                    <div className="flex flex-wrap gap-1">
                      {island.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              {/* Best Time to Visit */}
              <TableRow>
                <TableCell className="font-medium">
                  Best Time to Visit
                </TableCell>
                {islands.map((island) => (
                  <TableCell key={`${island.id}-time`}>
                    {island.bestTimeToVisit.join(", ")}
                  </TableCell>
                ))}
              </TableRow>

              {/* Accommodation Types */}
              <TableRow>
                <TableCell className="font-medium">Accommodation</TableCell>
                {islands.map((island) => (
                  <TableCell key={`${island.id}-accommodation`}>
                    {island.accommodationTypes.join(", ")}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>

      <div className="mt-8 text-center">
        <Button onClick={onStartNewSearch} variant="outline">
          Start New Search
        </Button>
      </div>
    </div>
  );
};

export default IslandComparison;
