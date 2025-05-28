"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Heart,
  MapPin,
  Star,
  Filter,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

interface Island {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  tags: string[];
  priceRange: string;
  activities: string[];
  atmosphere: string[];
  bestSeason: string[];
  accessibility: string;
}

interface RecommendationResultsProps {
  results?: Island[];
  onRefinePreferences?: () => void;
  onRestartQuiz?: () => void;
}

const RecommendationResults = ({
  results = defaultIslands,
  onRefinePreferences = () => {},
  onRestartQuiz = () => {},
}: RecommendationResultsProps) => {
  const [filteredResults, setFilteredResults] = useState<Island[]>(results);
  const [sortOption, setSortOption] = useState<string>("relevance");
  const [priceFilter, setPriceFilter] = useState<number[]>([0, 3]); // 0-3 representing € to €€€€
  const [atmosphereFilter, setAtmosphereFilter] = useState<string[]>([]);
  const [activityFilter, setActivityFilter] = useState<string[]>([]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    let sorted = [...filteredResults];

    switch (value) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      default:
        // Default is relevance, which is the original order
        sorted = [...results];
    }

    setFilteredResults(sorted);
  };

  const toggleAtmosphereFilter = (atmosphere: string) => {
    setAtmosphereFilter((prev) =>
      prev.includes(atmosphere)
        ? prev.filter((a) => a !== atmosphere)
        : [...prev, atmosphere],
    );
  };

  const toggleActivityFilter = (activity: string) => {
    setActivityFilter((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity],
    );
  };

  const applyFilters = () => {
    let filtered = [...results];

    // Apply price filter
    filtered = filtered.filter((island) => {
      const priceLevel = island.priceRange.length;
      return priceLevel >= priceFilter[0] && priceLevel <= priceFilter[1];
    });

    // Apply atmosphere filter if any selected
    if (atmosphereFilter.length > 0) {
      filtered = filtered.filter((island) =>
        atmosphereFilter.some((atm) => island.atmosphere.includes(atm)),
      );
    }

    // Apply activity filter if any selected
    if (activityFilter.length > 0) {
      filtered = filtered.filter((island) =>
        activityFilter.some((act) => island.activities.includes(act)),
      );
    }

    setFilteredResults(filtered);
  };

  const resetFilters = () => {
    setPriceFilter([0, 3]);
    setAtmosphereFilter([]);
    setActivityFilter([]);
    setFilteredResults(results);
    setSortOption("relevance");
  };

  return (
    <div className="w-full bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Island Matches</h1>
              <p className="text-muted-foreground mt-1">
                {filteredResults.length} islands match your preferences
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={onRefinePreferences}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refine Preferences
              </Button>
              <Button
                variant="secondary"
                onClick={onRestartQuiz}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                New Search
              </Button>
            </div>
          </div>

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="filters">Filters & Sorting</TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Refine Your Results</CardTitle>
                  <CardDescription>
                    Adjust filters to find your perfect island match
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <div className="pt-4 pb-2">
                      <Slider
                        defaultValue={[0, 3]}
                        max={3}
                        step={1}
                        value={priceFilter}
                        onValueChange={setPriceFilter}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Budget (€)</span>
                      <span>Mid-range (€€)</span>
                      <span>Luxury (€€€)</span>
                      <span>Ultra Luxury (€€€€)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Atmosphere</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Relaxing",
                        "Lively",
                        "Romantic",
                        "Family-friendly",
                        "Party",
                        "Cultural",
                        "Secluded",
                      ].map((atmosphere) => (
                        <Badge
                          key={atmosphere}
                          variant={
                            atmosphereFilter.includes(atmosphere)
                              ? "default"
                              : "outline"
                          }
                          className={
                            atmosphereFilter.includes(atmosphere)
                              ? "bg-island-blue"
                              : "hover:bg-sky-50"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleAtmosphereFilter(atmosphere)}
                        >
                          {atmosphere}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Beaches",
                        "Hiking",
                        "Nightlife",
                        "Water Sports",
                        "Historical Sites",
                        "Camping",
                        "Cuisine",
                        "Shopping",
                      ].map((activity) => (
                        <Badge
                          key={activity}
                          variant={
                            activityFilter.includes(activity)
                              ? "default"
                              : "outline"
                          }
                          className={
                            activityFilter.includes(activity)
                              ? "bg-island-blue"
                              : "hover:bg-sky-50"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleActivityFilter(activity)}
                        >
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sort By</h3>
                    <Select value={sortOption} onValueChange={handleSortChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="rating-desc">
                          Highest Rated
                        </SelectItem>
                        <SelectItem value="price-asc">
                          Price (Low to High)
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Price (High to Low)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((island) => (
                    <IslandCard key={island.id} island={island} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      No islands match your filters
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or starting a new search
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                      <Button onClick={onRestartQuiz}>New Search</Button>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const IslandCard = ({ island }: { island: Island }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={island.image}
          alt={island.name}
          className="h-full w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={isFavorite ? "fill-red-500 text-red-500" : ""}
            size={18}
          />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{island.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={14} className="text-muted-foreground" />
              <CardDescription>Greek Islands</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-sm font-medium">
              {island.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-3">{island.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {island.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {island.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{island.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{island.priceRange}</p>
          <p className="text-xs text-muted-foreground">Price Indicator</p>
        </div>
        <Button asChild>
          <a href={`/island/${island.id}`}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Default islands data for when no results are provided
const defaultIslands: Island[] = [
  {
    id: "naxos",
    name: "Naxos",
    description:
      "The largest of the Cyclades islands with beautiful beaches, mountain villages, and ancient ruins. Perfect for families and those seeking a mix of relaxation and culture.",
    image:
      "https://images.unsplash.com/photo-1586861256632-52a3db1075c1?w=800&q=80",
    rating: 4.7,
    tags: ["Beaches", "Family-friendly", "Historical", "Hiking"],
    priceRange: "€€",
    activities: ["Beaches", "Hiking", "Historical Sites", "Water Sports"],
    atmosphere: ["Relaxing", "Family-friendly", "Cultural"],
    bestSeason: ["Spring", "Summer", "Fall"],
    accessibility: "Ferry from Athens (3-5 hours)",
  },
  {
    id: "milos",
    name: "Milos",
    description:
      "Known for its stunning lunar landscapes and colorful fishing villages. Home to over 70 beaches with crystal clear waters and unique volcanic formations.",
    image:
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800&q=80",
    rating: 4.8,
    tags: ["Beaches", "Romantic", "Photography", "Geology"],
    priceRange: "€€",
    activities: ["Beaches", "Water Sports", "Photography", "Cuisine"],
    atmosphere: ["Romantic", "Relaxing", "Secluded"],
    bestSeason: ["Late Spring", "Summer", "Early Fall"],
    accessibility: "Ferry from Athens (3-7 hours) or domestic flight",
  },
  {
    id: "ikaria",
    name: "Ikaria",
    description:
      "One of the world's 'Blue Zones' where people live longer than average. Known for its relaxed pace, natural beauty, and traditional lifestyle.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    rating: 4.5,
    tags: ["Authentic", "Nature", "Longevity", "Hiking"],
    priceRange: "€",
    activities: ["Hiking", "Beaches", "Cuisine", "Camping"],
    atmosphere: ["Relaxing", "Cultural", "Secluded"],
    bestSeason: ["Late Spring", "Summer", "Early Fall"],
    accessibility: "Ferry from Athens (8 hours) or domestic flight",
  },
  {
    id: "folegandros",
    name: "Folegandros",
    description:
      "A small island with dramatic cliff landscapes, whitewashed villages, and a peaceful atmosphere. Perfect for those seeking tranquility away from crowds.",
    image:
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80",
    rating: 4.6,
    tags: ["Tranquil", "Romantic", "Hiking", "Authentic"],
    priceRange: "€€",
    activities: ["Hiking", "Beaches", "Cuisine"],
    atmosphere: ["Romantic", "Relaxing", "Secluded"],
    bestSeason: ["Late Spring", "Summer", "Early Fall"],
    accessibility: "Ferry from Athens (3-9 hours)",
  },
  {
    id: "skiathos",
    name: "Skiathos",
    description:
      "Part of the Sporades islands with pine forests reaching the sea and over 60 sandy beaches. Known for its vibrant nightlife and natural beauty.",
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80",
    rating: 4.4,
    tags: ["Beaches", "Nightlife", "Nature", "Water Sports"],
    priceRange: "€€€",
    activities: ["Beaches", "Nightlife", "Water Sports", "Shopping"],
    atmosphere: ["Lively", "Party", "Family-friendly"],
    bestSeason: ["Summer"],
    accessibility: "Direct flights from Europe or ferry from mainland Greece",
  },
  {
    id: "hydra",
    name: "Hydra",
    description:
      "A car-free island close to Athens with beautiful stone architecture, donkeys for transport, and a sophisticated atmosphere that has attracted artists for decades.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
    rating: 4.6,
    tags: ["Car-free", "Architecture", "Art", "Hiking"],
    priceRange: "€€€",
    activities: ["Hiking", "Swimming", "Historical Sites", "Art"],
    atmosphere: ["Cultural", "Romantic", "Relaxing"],
    bestSeason: ["Spring", "Summer", "Fall"],
    accessibility: "Ferry from Athens (1.5 hours)",
  },
];

export default RecommendationResults;
