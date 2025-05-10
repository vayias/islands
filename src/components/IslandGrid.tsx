"use client";

import React from "react";
import IslandCard from "./IslandCard";

export interface IslandAttributes {
  beaches: number;
  nightlife: number;
  crowdLevel: number;
  familyFriendly: boolean;
  nature: boolean;
  budget: "low" | "medium" | "high";
}

export interface Island {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  attributes: IslandAttributes;
}

interface IslandGridProps {
  islands?: Island[];
  onViewDetails?: (island: Island) => void;
  onAddToComparison?: (island: Island) => void;
  onAddToFavorites?: (island: Island) => void;
}

const IslandGrid: React.FC<IslandGridProps> = ({
  islands = defaultIslands,
  onViewDetails = () => {},
  onAddToComparison = () => {},
  onAddToFavorites = () => {},
}) => {
  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Discover Your Perfect Greek Island
        </h2>

        {islands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No islands match your criteria. Try adjusting your preferences.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((island) => (
              <IslandCard
                key={island.id}
                island={island}
                onViewDetails={onViewDetails}
                onAddToComparison={onAddToComparison}
                onAddToFavorites={onAddToFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Default islands data for demonstration
const defaultIslands: Island[] = [
  {
    id: "1",
    name: "Naxos",
    description:
      "The largest of the Cyclades islands with beautiful beaches, mountain villages, and ancient ruins. Perfect for families and nature lovers.",
    imageUrl:
      "https://images.unsplash.com/photo-1586861256632-52a3db1a3838?w=800&q=80",
    attributes: {
      beaches: 5,
      nightlife: 3,
      crowdLevel: 2,
      familyFriendly: true,
      nature: true,
      budget: "medium",
    },
  },
  {
    id: "2",
    name: "Milos",
    description:
      "Known for its stunning lunar landscapes, colorful fishing villages, and over 70 unique beaches with crystal clear waters.",
    imageUrl:
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80",
    attributes: {
      beaches: 5,
      nightlife: 2,
      crowdLevel: 2,
      familyFriendly: true,
      nature: true,
      budget: "medium",
    },
  },
  {
    id: "3",
    name: "Folegandros",
    description:
      "A small island with dramatic cliffs, whitewashed houses, and a peaceful atmosphere. Perfect for those seeking tranquility.",
    imageUrl:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    attributes: {
      beaches: 3,
      nightlife: 1,
      crowdLevel: 1,
      familyFriendly: false,
      nature: true,
      budget: "low",
    },
  },
  {
    id: "4",
    name: "Ios",
    description:
      "Famous for its vibrant nightlife and beautiful beaches. Popular among young travelers looking for fun and parties.",
    imageUrl:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
    attributes: {
      beaches: 4,
      nightlife: 5,
      crowdLevel: 4,
      familyFriendly: false,
      nature: false,
      budget: "medium",
    },
  },
  {
    id: "5",
    name: "Sifnos",
    description:
      "Known for its pottery, gastronomy, and traditional villages. A foodie paradise with beautiful hiking trails.",
    imageUrl:
      "https://images.unsplash.com/photo-1602585608192-58f25c9c3a2f?w=800&q=80",
    attributes: {
      beaches: 3,
      nightlife: 2,
      crowdLevel: 2,
      familyFriendly: true,
      nature: true,
      budget: "medium",
    },
  },
  {
    id: "6",
    name: "Skopelos",
    description:
      'Lush green island with pine forests reaching the sea. Famous as the filming location for "Mamma Mia!"',
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    attributes: {
      beaches: 4,
      nightlife: 2,
      crowdLevel: 3,
      familyFriendly: true,
      nature: true,
      budget: "low",
    },
  },
];

export default IslandGrid;
