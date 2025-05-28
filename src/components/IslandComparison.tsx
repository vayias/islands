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
import { Island } from "./IslandGrid";
import Itinerary from "./Itinerary";

interface IslandComparisonProps {
  islands?: Island[];
  onRemoveIsland?: (id: string) => void;
  onViewDetails?: (island: Island) => void;
}

const IslandComparison: React.FC<IslandComparisonProps> = ({
  islands = [],
  onRemoveIsland = () => {},
  onViewDetails = () => {},
}) => {
  const [showItinerary, setShowItinerary] = useState(false);
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
        <Button onClick={() => {}}>Start Island Search</Button>
      </div>
    );
  }

  if (showItinerary) {
    return (
      <div className="w-full">
        <Button
          variant="outline"
          onClick={() => setShowItinerary(false)}
          className="mb-4"
        >
          ← Back to Comparison
        </Button>
        <Itinerary
          selectedIslands={islands}
          startDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          endDate={new Date(Date.now() + 37 * 24 * 60 * 60 * 1000)}
          travelers={2}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
          Island Comparison
        </h2>
        <Button onClick={() => setShowItinerary(true)}>Plan Itinerary</Button>
      </div>

      {/* Island Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {islands.map((island) => (
          <Card key={island.id} className="overflow-hidden h-full">
            <div className="relative h-48 overflow-hidden">
              <img
                src={island.imageUrl}
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
                onClick={() => onViewDetails(island)}
              >
                View Details
              </Button>
              <Button size="sm">Book Now</Button>
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
                      {typeof island.attributes[
                        key as keyof typeof island.attributes
                      ] === "number"
                        ? renderRating(
                            island.attributes[
                              key as keyof typeof island.attributes
                            ] as number,
                          )
                        : island.attributes[
                              key as keyof typeof island.attributes
                            ]
                          ? "Yes"
                          : "No"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default IslandComparison;
