"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Plane,
  Car,
  Hotel,
  Calendar,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import { Island } from "./IslandGrid";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface ItineraryProps {
  selectedIslands: Island[];
  startDate?: Date;
  endDate?: Date;
  travelers?: number;
}

interface TravelOption {
  id: string;
  provider: string;
  type: "flight" | "hotel" | "car";
  price: number;
  description: string;
  details: string;
  image: string;
  rating?: number;
  duration?: string;
  departureTime?: string;
  arrivalTime?: string;
  carType?: string;
  roomType?: string;
  selected?: boolean;
}

const Itinerary: React.FC<ItineraryProps> = ({
  selectedIslands = [],
  startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default: 30 days from now
  endDate = new Date(Date.now() + 37 * 24 * 60 * 60 * 1000), // Default: 37 days from now
  travelers = 2,
}) => {
  const [expandedIsland, setExpandedIsland] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [selectedOptions, setSelectedOptions] = useState<{
    [islandId: string]: {
      flight?: string;
      hotel?: string;
      car?: string;
    };
  }>({});

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;

    Object.entries(selectedOptions).forEach(([islandId, options]) => {
      if (options.flight) {
        const flight = getMockTravelOptions(islandId).flights.find(
          (f) => f.id === options.flight,
        );
        if (flight) total += flight.price * travelers;
      }

      if (options.hotel) {
        const hotel = getMockTravelOptions(islandId).hotels.find(
          (h) => h.id === options.hotel,
        );
        if (hotel) {
          // Calculate number of nights
          const nights = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          total += hotel.price * nights;
        }
      }

      if (options.car) {
        const car = getMockTravelOptions(islandId).cars.find(
          (c) => c.id === options.car,
        );
        if (car) {
          // Calculate number of days
          const days = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          total += car.price * days;
        }
      }
    });

    return total;
  };

  // Toggle expanded island
  const toggleIslandExpansion = (islandId: string) => {
    setExpandedIsland(expandedIsland === islandId ? null : islandId);
    // Initialize selected options for this island if not already done
    if (!selectedOptions[islandId]) {
      setSelectedOptions((prev) => ({
        ...prev,
        [islandId]: {},
      }));
    }
  };

  // Select a travel option
  const selectOption = (
    islandId: string,
    type: "flight" | "hotel" | "car",
    optionId: string,
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [islandId]: {
        ...prev[islandId],
        [type]: optionId,
      },
    }));
  };

  // Get mock travel options for an island
  const getMockTravelOptions = (islandId: string) => {
    // In a real app, this would come from an API
    return {
      flights: [
        {
          id: `flight-${islandId}-1`,
          provider: "Aegean Airlines",
          type: "flight" as const,
          price: 189,
          description: "Direct Flight",
          details: "Economy Class",
          image:
            "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
          departureTime: "08:30",
          arrivalTime: "10:45",
          duration: "2h 15m",
        },
        {
          id: `flight-${islandId}-2`,
          provider: "Olympic Air",
          type: "flight" as const,
          price: 149,
          description: "1 Stop",
          details: "Economy Class",
          image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          departureTime: "12:15",
          arrivalTime: "15:30",
          duration: "3h 15m",
        },
        {
          id: `flight-${islandId}-3`,
          provider: "Sky Express",
          type: "flight" as const,
          price: 219,
          description: "Direct Flight",
          details: "Premium Economy",
          image:
            "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=80",
          departureTime: "16:45",
          arrivalTime: "18:50",
          duration: "2h 05m",
        },
      ],
      hotels: [
        {
          id: `hotel-${islandId}-1`,
          provider: "Seaside Resort",
          type: "hotel" as const,
          price: 120,
          description: "Beachfront Hotel",
          details: "Breakfast included",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
          rating: 4.5,
          roomType: "Double Room",
        },
        {
          id: `hotel-${islandId}-2`,
          provider: "Island View Apartments",
          type: "hotel" as const,
          price: 85,
          description: "Self-catering Apartment",
          details: "Kitchen, Living Area",
          image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
          rating: 4.2,
          roomType: "One Bedroom Apartment",
        },
        {
          id: `hotel-${islandId}-3`,
          provider: "Luxury Villas",
          type: "hotel" as const,
          price: 250,
          description: "Private Villa with Pool",
          details: "Full Kitchen, Private Pool",
          image:
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
          rating: 4.8,
          roomType: "Two Bedroom Villa",
        },
      ],
      cars: [
        {
          id: `car-${islandId}-1`,
          provider: "Island Rentals",
          type: "car" as const,
          price: 35,
          description: "Economy Car",
          details: "Manual, A/C",
          image:
            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
          carType: "Fiat Panda or similar",
        },
        {
          id: `car-${islandId}-2`,
          provider: "Greek Auto",
          type: "car" as const,
          price: 55,
          description: "Compact SUV",
          details: "Automatic, A/C",
          image:
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
          carType: "Suzuki Jimny or similar",
        },
        {
          id: `car-${islandId}-3`,
          provider: "Premium Motors",
          type: "car" as const,
          price: 85,
          description: "Convertible",
          details: "Automatic, A/C, GPS",
          image:
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
          carType: "Mini Cooper Convertible or similar",
        },
      ],
    };
  };

  // Render travel option card
  const renderTravelOption = (option: TravelOption, islandId: string) => {
    const isSelected =
      selectedOptions[islandId] &&
      selectedOptions[islandId][option.type] === option.id;

    return (
      <Card
        key={option.id}
        className={`mb-4 overflow-hidden ${isSelected ? "border-2 border-blue-500" : ""}`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 h-48 md:h-auto">
            <img
              src={option.image}
              alt={option.provider}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{option.provider}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">€{option.price}</p>
                <p className="text-sm text-gray-500">
                  {option.type === "hotel"
                    ? "per night"
                    : option.type === "car"
                      ? "per day"
                      : "per person"}
                </p>
              </div>
            </div>

            <div className="mt-2">
              {option.type === "flight" && (
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{option.departureTime}</span>
                    <span className="mx-2">→</span>
                    <span>{option.arrivalTime}</span>
                  </div>
                  <Badge variant="outline">{option.duration}</Badge>
                </div>
              )}

              {option.type === "hotel" && option.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(option.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm">{option.rating}</span>
                  <span className="ml-4 text-sm">{option.roomType}</span>
                </div>
              )}

              {option.type === "car" && (
                <div className="mt-2 text-sm">{option.carType}</div>
              )}

              <p className="text-sm text-gray-600 mt-2">{option.details}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="flex items-center">
                <Checkbox
                  id={option.id}
                  checked={isSelected}
                  onCheckedChange={() =>
                    selectOption(islandId, option.type, option.id)
                  }
                />
                <Label htmlFor={option.id} className="ml-2">
                  {isSelected ? "Selected" : "Select"}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // If no islands are selected
  if (selectedIslands.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Plan Your Greek Island Itinerary</CardTitle>
          <CardDescription>
            Select islands from the grid to start planning your perfect Greek
            getaway
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No islands selected yet</p>
          <Button className="mt-4">Browse Islands</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">
            Your Greek Island Itinerary
          </CardTitle>
          <CardDescription>
            {formatDate(startDate)} - {formatDate(endDate)} • {travelers}{" "}
            {travelers === 1 ? "Traveler" : "Travelers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              <span className="font-medium">
                {Math.ceil(
                  (endDate.getTime() - startDate.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              <span className="font-medium">
                {selectedIslands.length}{" "}
                {selectedIslands.length === 1 ? "Island" : "Islands"}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              <span className="font-medium">
                {travelers} {travelers === 1 ? "Person" : "People"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {selectedIslands.map((island) => (
              <Card key={island.id} className="overflow-hidden">
                <div
                  className="flex items-center p-4 cursor-pointer"
                  onClick={() => toggleIslandExpansion(island.id)}
                >
                  <div className="w-16 h-16 mr-4 rounded-md overflow-hidden">
                    <img
                      src={island.imageUrl}
                      alt={island.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{island.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {island.description}
                    </p>
                  </div>
                  <div>
                    {expandedIsland === island.id ? (
                      <ChevronUp className="h-6 w-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedIsland === island.id && (
                  <div className="px-4 pb-4">
                    <Separator className="mb-4" />

                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger
                          value="flights"
                          className="flex items-center"
                        >
                          <Plane className="h-4 w-4 mr-2" /> Flights
                        </TabsTrigger>
                        <TabsTrigger
                          value="hotels"
                          className="flex items-center"
                        >
                          <Hotel className="h-4 w-4 mr-2" /> Accommodations
                        </TabsTrigger>
                        <TabsTrigger value="cars" className="flex items-center">
                          <Car className="h-4 w-4 mr-2" /> Car Rentals
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="flights" className="mt-4">
                        <div className="space-y-4">
                          {getMockTravelOptions(island.id).flights.map(
                            (flight) => renderTravelOption(flight, island.id),
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="hotels" className="mt-4">
                        <div className="space-y-4">
                          {getMockTravelOptions(island.id).hotels.map((hotel) =>
                            renderTravelOption(hotel, island.id),
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="cars" className="mt-4">
                        <div className="space-y-4">
                          {getMockTravelOptions(island.id).cars.map((car) =>
                            renderTravelOption(car, island.id),
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>
            Review your selections before proceeding to payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedIslands.map((island) => {
              const options = selectedOptions[island.id] || {};
              const travelOptions = getMockTravelOptions(island.id);

              const selectedFlight = options.flight
                ? travelOptions.flights.find((f) => f.id === options.flight)
                : null;

              const selectedHotel = options.hotel
                ? travelOptions.hotels.find((h) => h.id === options.hotel)
                : null;

              const selectedCar = options.car
                ? travelOptions.cars.find((c) => c.id === options.car)
                : null;

              if (!selectedFlight && !selectedHotel && !selectedCar)
                return null;

              return (
                <div key={island.id} className="pb-4">
                  <h3 className="font-bold text-lg mb-2">{island.name}</h3>

                  {selectedFlight && (
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Plane className="h-4 w-4 mr-2 text-blue-500" />
                        <span>
                          {selectedFlight.provider} -{" "}
                          {selectedFlight.description}
                        </span>
                      </div>
                      <span>€{selectedFlight.price * travelers}</span>
                    </div>
                  )}

                  {selectedHotel && (
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Hotel className="h-4 w-4 mr-2 text-green-500" />
                        <span>
                          {selectedHotel.provider} - {selectedHotel.roomType}
                        </span>
                      </div>
                      <span>
                        €
                        {selectedHotel.price *
                          Math.ceil(
                            (endDate.getTime() - startDate.getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}
                      </span>
                    </div>
                  )}

                  {selectedCar && (
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-orange-500" />
                        <span>
                          {selectedCar.provider} - {selectedCar.carType}
                        </span>
                      </div>
                      <span>
                        €
                        {selectedCar.price *
                          Math.ceil(
                            (endDate.getTime() - startDate.getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}
                      </span>
                    </div>
                  )}

                  <Separator className="mt-2" />
                </div>
              );
            })}

            <div className="flex justify-between items-center font-bold text-lg pt-2">
              <span>Total</span>
              <span>€{calculateTotalPrice()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Itinerary;
