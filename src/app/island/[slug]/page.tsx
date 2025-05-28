import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share2,
  MapPin,
  Calendar,
  Anchor,
  Plane,
  Bus,
  Car,
  Utensils,
  Hotel,
  Tent,
  Waves,
  Mountain,
  Sun,
  Umbrella,
} from "lucide-react";

export default function IslandPage({ params }: { params: { slug: string } }) {
  // This would normally be fetched from an API based on the slug
  const island = {
    name: "Naxos",
    slug: params.slug,
    description:
      "Naxos is the largest of the Cyclades island group, known for its impressive mountain villages, ancient ruins, and long stretches of sandy beaches. The island offers a perfect blend of history, culture, and natural beauty.",
    mainImage:
      "https://images.unsplash.com/photo-1586861256632-52a3db1073a7?w=1200&q=80",
    rating: 4.8,
    reviewCount: 124,
    tags: ["Beaches", "History", "Hiking", "Family-friendly", "Local cuisine"],
    bestFor: ["Relaxation", "Culture", "Nature"],
    peakSeason: "June to September",
    accommodations: [
      {
        name: "Beachfront Resort",
        type: "Hotel",
        price: "€€€",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      },
      {
        name: "Charming Villa",
        type: "Villa",
        price: "€€€€",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
      },
      {
        name: "Budget Hostel",
        type: "Hostel",
        price: "€",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
      },
    ],
    activities: [
      {
        name: "Visit the Temple of Apollo",
        type: "Historical",
        duration: "2 hours",
        image:
          "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=600&q=80",
      },
      {
        name: "Windsurfing at Mikri Vigla",
        type: "Water Sport",
        duration: "3 hours",
        image:
          "https://images.unsplash.com/photo-1575448897586-3f4e43bdaa2f?w=600&q=80",
      },
      {
        name: "Hike to Mount Zeus",
        type: "Adventure",
        duration: "Full day",
        image:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
      },
    ],
    transportation: [
      { type: "Ferry", frequency: "Daily", duration: "3-5 hours from Athens" },
      {
        type: "Domestic Flight",
        frequency: "Several times daily",
        duration: "45 minutes from Athens",
      },
      {
        type: "Local Bus",
        frequency: "Hourly",
        duration: "Varies by destination",
      },
    ],
    localTips: [
      "Visit the Portara (Temple of Apollo) at sunset for breathtaking views",
      'Try the local cheese called "Graviera Naxou"',
      "Rent a car to explore the mountain villages like Apiranthos and Halki",
      "The beaches on the southwest coast are less crowded and perfect for families",
    ],
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={island.mainImage}
          alt={`${island.name} Island`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {island.name}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-white" />
              <span className="text-white">Cyclades, Greece</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Island Details */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{island.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < Math.floor(island.rating) ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({island.reviewCount} reviews)
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                About {island.name}
              </h2>
              <p className="text-muted-foreground">{island.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Best For</h3>
              <div className="flex flex-wrap gap-2">
                {island.bestFor.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {island.tags.map((tag, index) => (
                  <Badge key={index} className="text-sm py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Best Time to Visit</h3>
              </div>
              <p className="text-muted-foreground">{island.peakSeason}</p>
            </div>

            <Separator className="my-8" />

            {/* Tabs for different information sections */}
            <Tabs defaultValue="accommodations" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="accommodations">Stay</TabsTrigger>
                <TabsTrigger value="activities">Do</TabsTrigger>
                <TabsTrigger value="transportation">Travel</TabsTrigger>
                <TabsTrigger value="tips">Local Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="accommodations" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Where to Stay</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {island.accommodations.map((accommodation, index) => (
                    <Card key={index}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={accommodation.image}
                          alt={accommodation.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{accommodation.name}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>{accommodation.type}</span>
                          <span>{accommodation.price}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full">View Options</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Things to Do</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {island.activities.map((activity, index) => (
                    <Card key={index}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={activity.image}
                          alt={activity.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{activity.name}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>{activity.type}</span>
                          <span>{activity.duration}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full">Book Activity</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transportation" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">
                  Getting There & Around
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {island.transportation.map((transport, index) => {
                    let Icon;
                    switch (transport.type) {
                      case "Ferry":
                        Icon = Anchor;
                        break;
                      case "Domestic Flight":
                        Icon = Plane;
                        break;
                      case "Local Bus":
                        Icon = Bus;
                        break;
                      default:
                        Icon = Car;
                    }

                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <CardTitle>{transport.type}</CardTitle>
                          </div>
                          <CardDescription>
                            <div className="mt-2">
                              <div className="flex justify-between">
                                <span>Frequency:</span>
                                <span>{transport.frequency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span>{transport.duration}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Local Tips</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Insider Advice</CardTitle>
                    <CardDescription>
                      Tips from locals and experienced travelers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {island.localTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Map */}
          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
                <CardDescription>
                  Check availability and book your stay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Check-in</label>
                      <input
                        type="date"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <input
                        type="date"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guests</label>
                    <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5+ guests</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button className="w-full">Search Accommodations</Button>
                <Button variant="outline" className="w-full">
                  View on Map
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weather</CardTitle>
                  <CardDescription>
                    Average conditions in {island.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2">
                      <Sun className="h-8 w-8 mx-auto text-yellow-500" />
                      <p className="mt-1 text-sm font-medium">Summer</p>
                      <p className="text-xs text-muted-foreground">28-32°C</p>
                    </div>
                    <div className="p-2">
                      <Mountain className="h-8 w-8 mx-auto text-green-500" />
                      <p className="mt-1 text-sm font-medium">Spring/Fall</p>
                      <p className="text-xs text-muted-foreground">18-25°C</p>
                    </div>
                    <div className="p-2">
                      <Umbrella className="h-8 w-8 mx-auto text-blue-500" />
                      <p className="mt-1 text-sm font-medium">Winter</p>
                      <p className="text-xs text-muted-foreground">10-15°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
