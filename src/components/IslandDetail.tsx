import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  Waves,
  Utensils,
  Music,
  Tent,
  Sailboat,
  Calendar,
  Euro,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface IslandDetailProps {
  island?: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    images: string[];
    location: string;
    rating: number;
    attributes: {
      beaches: number;
      nightlife: number;
      nature: number;
      food: number;
      family: number;
      crowdLevel: number;
    };
    activities: string[];
    bestTimeToVisit: string;
    priceLevel: number;
    accommodations: Array<{
      id: string;
      name: string;
      type: string;
      price: number;
      link: string;
      image: string;
    }>;
  };
}

const IslandDetail = ({ island }: IslandDetailProps) => {
  // Default data if no island is provided
  const defaultIsland = {
    id: "naxos",
    name: "Naxos",
    description:
      "The largest of the Cyclades islands with beautiful beaches and mountain villages",
    longDescription:
      "Naxos is the largest of the Cyclades island group, known for its impressive landscape that combines stunning beaches with mountainous villages. The island offers a perfect blend of history, culture, and natural beauty. With its fertile valleys, Naxos is also known for its local products including cheese, potatoes, and citrus fruits. The island's main town, Chora, is dominated by a Venetian castle and features a vibrant waterfront with restaurants and shops.",
    images: [
      "https://images.unsplash.com/photo-1586861256632-52a3db3369be?w=800&q=80",
      "https://images.unsplash.com/photo-1589293064858-f57c2c3b659d?w=800&q=80",
      "https://images.unsplash.com/photo-1589293064778-fd9e572fd836?w=800&q=80",
      "https://images.unsplash.com/photo-1589293064639-a7e7c7e9f1a9?w=800&q=80",
    ],
    location: "Cyclades, Aegean Sea",
    rating: 4.7,
    attributes: {
      beaches: 5,
      nightlife: 3,
      nature: 5,
      food: 4,
      family: 5,
      crowdLevel: 3,
    },
    activities: [
      "Swimming",
      "Hiking",
      "Windsurfing",
      "Historical Sites",
      "Local Cuisine",
      "Mountain Villages",
    ],
    bestTimeToVisit: "May to October",
    priceLevel: 3,
    accommodations: [
      {
        id: "acc1",
        name: "Naxos Resort",
        type: "Hotel",
        price: 120,
        link: "https://example.com/booking",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      },
      {
        id: "acc2",
        name: "Beachfront Villa",
        type: "Villa",
        price: 250,
        link: "https://example.com/booking",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
      {
        id: "acc3",
        name: "Mountain View Apartments",
        type: "Apartment",
        price: 85,
        link: "https://example.com/booking",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      },
    ],
  };

  const displayIsland = island || defaultIsland;

  // Helper function to render rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  // Helper function to render price level
  const renderPriceLevel = (level: number) => {
    const euros = [];
    for (let i = 0; i < 5; i++) {
      euros.push(
        <Euro
          key={i}
          className={`h-4 w-4 ${i < level ? "text-green-600" : "text-gray-300"}`}
        />,
      );
    }
    return euros;
  };

  // Helper function to render attribute bars
  const renderAttributeBar = (value: number) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column with images */}
        <div className="w-full md:w-2/3">
          <Carousel className="w-full">
            <CarouselContent>
              {displayIsland.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={image}
                      alt={`${displayIsland.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">{displayIsland.name}</h1>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-500 text-sm">
                    {displayIsland.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {renderRatingStars(displayIsland.rating)}
                <span className="ml-2 text-sm font-medium">
                  {displayIsland.rating}/5
                </span>
              </div>
              <div className="flex items-center">
                {renderPriceLevel(displayIsland.priceLevel)}
              </div>
              <Badge variant="outline" className="ml-auto">
                <Calendar className="h-3 w-3 mr-1" />
                {displayIsland.bestTimeToVisit}
              </Badge>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
                <TabsTrigger value="practical">Practical Info</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    About {displayIsland.name}
                  </h2>
                  <p className="text-gray-700">
                    {displayIsland.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Island Features
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Waves className="h-4 w-4 mr-2" /> Beaches
                        </span>
                        <span className="text-sm">
                          {displayIsland.attributes.beaches}/5
                        </span>
                      </div>
                      {renderAttributeBar(displayIsland.attributes.beaches)}
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Music className="h-4 w-4 mr-2" /> Nightlife
                        </span>
                        <span className="text-sm">
                          {displayIsland.attributes.nightlife}/5
                        </span>
                      </div>
                      {renderAttributeBar(displayIsland.attributes.nightlife)}
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Tent className="h-4 w-4 mr-2" /> Nature
                        </span>
                        <span className="text-sm">
                          {displayIsland.attributes.nature}/5
                        </span>
                      </div>
                      {renderAttributeBar(displayIsland.attributes.nature)}
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Utensils className="h-4 w-4 mr-2" /> Food
                        </span>
                        <span className="text-sm">
                          {displayIsland.attributes.food}/5
                        </span>
                      </div>
                      {renderAttributeBar(displayIsland.attributes.food)}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Activities on {displayIsland.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayIsland.activities.map((activity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          {activity.includes("Swimming") ||
                          activity.includes("Beach") ? (
                            <Waves className="h-5 w-5 text-blue-600" />
                          ) : activity.includes("Hiking") ||
                            activity.includes("Nature") ? (
                            <Tent className="h-5 w-5 text-green-600" />
                          ) : activity.includes("Sailing") ||
                            activity.includes("Boat") ? (
                            <Sailboat className="h-5 w-5 text-blue-600" />
                          ) : activity.includes("Food") ||
                            activity.includes("Cuisine") ? (
                            <Utensils className="h-5 w-5 text-orange-600" />
                          ) : (
                            <Star className="h-5 w-5 text-yellow-600" />
                          )}
                        </div>
                        <span>{activity}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accommodations" className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">Where to Stay</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayIsland.accommodations.map((accommodation) => (
                    <Card key={accommodation.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={accommodation.image}
                          alt={accommodation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg">
                          {accommodation.name}
                        </CardTitle>
                        <CardDescription>{accommodation.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="font-bold text-lg">
                          €{accommodation.price}{" "}
                          <span className="text-sm font-normal text-gray-500">
                            per night
                          </span>
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full" asChild>
                          <a
                            href={accommodation.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book Now
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="practical" className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Practical Information
                </h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Getting There</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      You can reach {displayIsland.name} by ferry from Athens
                      (Piraeus port) or by domestic flight from Athens
                      International Airport. Ferry duration is approximately 3-5
                      hours depending on the type of vessel.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Best Time to Visit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The ideal time to visit {displayIsland.name} is during{" "}
                      {displayIsland.bestTimeToVisit} when the weather is warm
                      and perfect for beach activities. July and August are the
                      busiest months with higher prices.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Local Transportation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The island has a public bus network connecting major
                      villages and beaches. Renting a car, scooter, or ATV is
                      recommended for exploring more remote areas and having
                      flexibility in your schedule.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column with booking options */}
        <div className="w-full md:w-1/3">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Plan Your Visit</CardTitle>
              <CardDescription>
                Book your perfect stay on {displayIsland.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">
                  Why Visit {displayIsland.name}?
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Beautiful beaches with crystal clear waters</li>
                  <li>Authentic Greek culture and cuisine</li>
                  <li>Less crowded than popular islands</li>
                  <li>Perfect balance of relaxation and activities</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Quick Facts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Best for:</span>
                    <span className="font-medium">
                      {displayIsland.attributes.beaches >= 4
                        ? "Beach lovers, "
                        : ""}
                      {displayIsland.attributes.nature >= 4
                        ? "Nature enthusiasts, "
                        : ""}
                      {displayIsland.attributes.family >= 4 ? "Families" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crowd level:</span>
                    <span className="font-medium">
                      {displayIsland.attributes.crowdLevel <= 2
                        ? "Low"
                        : displayIsland.attributes.crowdLevel <= 3
                          ? "Moderate"
                          : "High"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price level:</span>
                    <span className="font-medium">
                      {displayIsland.priceLevel <= 2
                        ? "Budget-friendly"
                        : displayIsland.priceLevel <= 3
                          ? "Moderate"
                          : "Expensive"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className="w-full">Find Accommodations</Button>
              <Button variant="outline" className="w-full">
                Add to Comparison
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IslandDetail;
