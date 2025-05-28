"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, MapPin, Star, Users, Waves, Moon, Plus } from "lucide-react";
import { Island } from "./IslandGrid";

interface IslandCardProps {
  island: Island;
  onViewDetails: (island: Island) => void;
  onAddToComparison: (island: Island) => void;
  onAddToFavorites: (island: Island) => void;
}

const IslandCard: React.FC<IslandCardProps> = ({
  island,
  onViewDetails,
  onAddToComparison,
  onAddToFavorites,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={island.imageUrl}
          alt={`${island.name} island`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onAddToFavorites(island)}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5 text-rose-500" />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          {renderBudgetBadge(island.attributes.budget)}
          {island.attributes.familyFriendly && (
            <Badge variant="secondary" className="bg-sky-100 text-island-blue">
              <Users className="h-3 w-3 mr-1" /> Family
            </Badge>
          )}
          {island.attributes.nature && (
            <Badge variant="secondary" className="bg-teal-100 text-island-teal">
              <Waves className="h-3 w-3 mr-1" /> Nature
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{island.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">
              {4 + Math.random().toFixed(1)}
            </span>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1" /> Greek Islands
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3">
          {island.description}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <AttributeDisplay
            label="Beaches"
            value={island.attributes.beaches}
            icon={<Waves className="h-4 w-4 text-blue-500" />}
          />
          <AttributeDisplay
            label="Nightlife"
            value={island.attributes.nightlife}
            icon={<Moon className="h-4 w-4 text-indigo-500" />}
          />
          <AttributeDisplay
            label="Crowds"
            value={island.attributes.crowdLevel}
            icon={<Users className="h-4 w-4 text-orange-500" />}
          />
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onAddToComparison(island)}
        >
          <Plus className="h-4 w-4 mr-1" /> Compare
        </Button>
        <Button
          className="flex-1 bg-island-blue hover:bg-island-teal transition-colors duration-300"
          onClick={() => onViewDetails(island)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

interface AttributeDisplayProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const AttributeDisplay: React.FC<AttributeDisplayProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="flex mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-4 mx-0.5 rounded-sm ${i < value ? "bg-island-blue" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
};

const renderBudgetBadge = (budget: "low" | "medium" | "high") => {
  switch (budget) {
    case "low":
      return (
        <Badge
          variant="outline"
          className="bg-teal-100 text-island-teal border-teal-200"
        >
          $ Budget
        </Badge>
      );
    case "medium":
      return (
        <Badge
          variant="outline"
          className="bg-sky-100 text-island-blue border-sky-200"
        >
          $ Moderate
        </Badge>
      );
    case "high":
      return (
        <Badge
          variant="outline"
          className="bg-violet-100 text-island-violet border-violet-200"
        >
          $$$ Luxury
        </Badge>
      );
  }
};

export default IslandCard;
