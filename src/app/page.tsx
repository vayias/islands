"use client";

import { useState } from "react";
import IslandFinder from "@/components/IslandFinder";
import IslandGrid, { Island } from "@/components/IslandGrid";
import IslandDetail from "@/components/IslandDetail";
import IslandComparison from "@/components/IslandComparison";
import Itinerary from "@/components/Itinerary";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Compass,
  Map,
  PlaneTakeoff,
  Sparkles,
  Anchor,
  Sun,
  Heart,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Page() {
  const [view, setView] = useState<
    "finder" | "grid" | "detail" | "comparison" | "itinerary"
  >("finder");
  const [selectedIsland, setSelectedIsland] = useState<Island | undefined>();
  const [comparisonList, setComparisonList] = useState<Island[]>([]);
  const [favoritesList, setFavoritesList] = useState<Island[]>([]);
  const [filteredIslands, setFilteredIslands] = useState<Island[]>([]);

  const handleViewDetails = (island: Island) => {
    setSelectedIsland(island);
    setView("detail");
  };

  const handleAddToComparison = (island: Island) => {
    if (!comparisonList.some((i) => i.id === island.id)) {
      setComparisonList([...comparisonList, island]);
    }
  };

  const handleAddToFavorites = (island: Island) => {
    if (!favoritesList.some((i) => i.id === island.id)) {
      setFavoritesList([...favoritesList, island]);
    } else {
      setFavoritesList(favoritesList.filter((i) => i.id !== island.id));
    }
  };

  const handleRemoveFromComparison = (islandId: string) => {
    setComparisonList(
      comparisonList.filter((island) => island.id !== islandId),
    );
  };

  const handleFinderResults = (results: any[]) => {
    // Convert finder results to Island type
    const islands: Island[] = results.map((result) => ({
      id: result.id.toString(),
      name: result.name,
      description: result.description,
      imageUrl: `https://images.unsplash.com/photo-${1580000000000 + parseInt(result.id.toString())}?w=800&q=80`,
      attributes: {
        beaches: result.attributes.beaches || 3,
        nightlife: result.attributes.nightlife || 3,
        crowdLevel: result.attributes.crowds || 2,
        familyFriendly: Math.random() > 0.5,
        nature: Math.random() > 0.5,
        budget: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
          | "low"
          | "medium"
          | "high",
      },
    }));

    setFilteredIslands(islands);
    setView("grid");
  };

  const renderBackButton = () => {
    if (view !== "finder") {
      return (
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => {
            if (view === "detail") {
              setView("grid");
            } else {
              setView("finder");
            }
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      );
    }
    return null;
  };

  const renderView = () => {
    switch (view) {
      case "finder":
        return (
          <div className="relative">
            {/* Header with navigation */}
            <header className="absolute top-0 left-0 right-0 z-20 py-4 px-6">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                  <Anchor className="h-8 w-8 text-blue-500 mr-2" />
                  <span className="font-bold text-xl text-white">
                    GreekIslandFinder
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeSwitcher />
                </div>
              </div>
            </header>

            {/* Hero section with improved contrast */}
            <div className="relative h-[80vh] overflow-hidden">
              {/* Background image with darker overlay for better text contrast */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1601581875039-e899893d520c?w=1600&q=80"
                  alt="Beautiful Greek island panorama with white buildings and blue sea"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-island-blue/60 backdrop-blur-[2px]" />
              </div>

              {/* Hero content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg max-w-4xl">
                  <span className="text-sky-200">AI-Powered</span> Greek Island
                  Finder
                </h1>
                <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light drop-shadow-md mb-8">
                  Discover your ideal destination based on your preferences and
                  plan your dream Mediterranean vacation
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-island-gradient hover:bg-island-gradient-hover text-white shadow-soft hover:shadow-glow transition-all duration-300"
                    onClick={() =>
                      document
                        .getElementById("finder-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Find My Island
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/40 shadow-soft hover:shadow-md transition-all duration-300"
                    onClick={() => setView("itinerary")}
                  >
                    <PlaneTakeoff className="h-5 w-5 mr-2" />
                    Plan Itinerary
                  </Button>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ArrowLeft className="h-5 w-5 text-white transform rotate-90" />
                </div>
              </div>
            </div>

            {/* Feature section */}
            <div
              id="finder-section"
              className="bg-gradient-to-b from-white to-sky-50 py-16 px-4"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-island-blue text-center mb-12">
                  Why Choose Greek Islands?
                </h2>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  <FeatureCard
                    icon={<Compass className="h-10 w-10 text-island-blue" />}
                    title="Personalized Recommendations"
                    description="Get island suggestions tailored to your preferences and travel style"
                  />
                  <FeatureCard
                    icon={<Map className="h-10 w-10 text-island-teal" />}
                    title="Compare Islands"
                    description="Side-by-side comparison of beaches, activities, and accommodations"
                  />
                  <FeatureCard
                    icon={
                      <PlaneTakeoff className="h-10 w-10 text-island-violet" />
                    }
                    title="Complete Itineraries"
                    description="Book flights, hotels, and activities all in one place"
                  />
                  <FeatureCard
                    icon={<Heart className="h-10 w-10 text-rose-500" />}
                    title="Local Insights"
                    description="Discover hidden gems and authentic experiences on each island"
                  />
                </div>

                {/* Island finder */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-soft p-8 border border-sky-100">
                  <h2 className="text-2xl font-semibold text-island-blue mb-6 text-center">
                    Find Your Perfect Island Match
                  </h2>
                  <IslandFinder onResults={handleFinderResults} />
                </div>
              </div>
            </div>
          </div>
        );
      case "grid":
        return (
          <IslandGrid
            islands={filteredIslands}
            onViewDetails={handleViewDetails}
            onAddToComparison={handleAddToComparison}
            onAddToFavorites={handleAddToFavorites}
          />
        );
      case "detail":
        return selectedIsland ? (
          <IslandDetail
            island={{
              id: selectedIsland.id,
              name: selectedIsland.name,
              description: selectedIsland.description,
              longDescription: selectedIsland.description,
              images: [selectedIsland.imageUrl],
              location: "Greek Islands",
              rating: 4.5,
              attributes: {
                beaches: selectedIsland.attributes.beaches,
                nightlife: selectedIsland.attributes.nightlife,
                nature: 4,
                food: 4,
                family: selectedIsland.attributes.familyFriendly ? 5 : 3,
                crowdLevel: selectedIsland.attributes.crowdLevel,
              },
              activities: ["Swimming", "Hiking", "Local Cuisine"],
              bestTimeToVisit: "May to October",
              priceLevel:
                selectedIsland.attributes.budget === "low"
                  ? 2
                  : selectedIsland.attributes.budget === "medium"
                    ? 3
                    : 4,
              accommodations: [],
            }}
          />
        ) : null;
      case "comparison":
        return (
          <IslandComparison
            islands={comparisonList}
            onRemoveIsland={handleRemoveFromComparison}
            onViewDetails={handleViewDetails}
          />
        );
      case "itinerary":
        return (
          <Itinerary
            selectedIslands={
              comparisonList.length > 0
                ? comparisonList
                : filteredIslands.slice(0, 3)
            }
          />
        );
      default:
        return <IslandFinder onResults={handleFinderResults} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            {renderBackButton()}

            <div className="flex gap-2 ml-auto">
              {comparisonList.length > 0 &&
                view !== "comparison" &&
                view !== "finder" && (
                  <Button
                    variant="outline"
                    onClick={() => setView("comparison")}
                    className="bg-white hover:bg-blue-50"
                  >
                    Compare ({comparisonList.length})
                  </Button>
                )}

              {view !== "finder" && view !== "itinerary" && (
                <Button
                  onClick={() => setView("itinerary")}
                  variant="outline"
                  className="bg-white hover:bg-blue-50"
                >
                  Plan Itinerary
                </Button>
              )}
            </div>
          </div>

          {renderView()}
        </div>
      </div>
    </div>
  );
}

const getIslandImageForFeature = (title: string): string => {
  switch (title) {
    case "Personalized Recommendations":
      return "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80"; // Santorini view
    case "Compare Islands":
      return "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80"; // Beach comparison
    case "Complete Itineraries":
      return "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?w=800&q=80"; // Harbor with boats
    case "Local Insights":
      return "https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?w=800&q=80"; // Local village
    default:
      return "https://images.unsplash.com/photo-1535074153497-b08c5aa9c236?w=800&q=80"; // Generic Greek island
  }
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-0 shadow-soft hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <CardContent className="p-0">
        <div className="h-40 overflow-hidden">
          <img
            src={getIslandImageForFeature(title)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-sky-50 rounded-full mb-4 -mt-10 border-4 border-white group-hover:bg-sky-100 transition-colors duration-300 relative z-10">
              {icon}
            </div>
            <h3 className="font-semibold text-xl mb-3 text-island-blue">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
