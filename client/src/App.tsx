"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  Globe,
  MapPin,
  Maximize2,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const EARTHQUAKE_TYPES = [
  { value: "earthquake", label: "Earthquake" },
  { value: "quarry blast", label: "Quarry Blast" },
  { value: "ice quake", label: "Ice Quake" },
  { value: "explosion", label: "Explosion" },
];

const MAGNITUDE_LEVELS = [
  { value: "2.5", label: "2.5+" },
  { value: "5.5", label: "5.5+" },
  { value: "6.1", label: "6.1+" },
  { value: "7", label: "7+" },
  { value: "8", label: "8+" },
];

const DATE_RANGES = [
  { value: "7", label: "Past 7 Days" },
  { value: "14", label: "Past 14 Days" },
  { value: "21", label: "Past 21 Days" },
  { value: "30", label: "Past 30 Days" },
];

const SORT_OPTIONS = [
  { value: "desc", label: "Largest Magnitude First" },
  { value: "asc", label: "Smallest Magnitude First" },
];

const getMagnitudeColor = (magnitude: number) => {
  if (magnitude >= 7) return "destructive";
  if (magnitude >= 5.5) return "orange";
  if (magnitude >= 4) return "yellow";
  return "green";
};

export default function App() {
  const [chosenType, setChosenType] = useState<string | null>(null);
  const [chosenMag, setChosenMag] = useState<string | null>(null);
  const [chosenLocation, setChosenLocation] = useState<string | null>(null);
  const [chosenDateRange, setChosenDateRange] = useState<string | null>(null);
  const [chosenSortOption, setChosenSortOption] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[] | null>(null);

  const sendSearchRequest = () => {
    const results = {
      method: "GET",
      url: "http://localhost:3001/results",
      params: {
        type: chosenType,
        mag: chosenMag,
        location: chosenLocation,
        dateRange: chosenDateRange,
        sortOption: chosenSortOption,
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Earthquake Watch</h1>
        <p className="text-muted-foreground">
          Search for earthquakes using the following criteria:
        </p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
          <CardDescription>Refine your earthquake search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Event Type
              </label>
              <Select value={chosenType || ""} onValueChange={setChosenType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  {EARTHQUAKE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="magnitude" className="text-sm font-medium">
                Magnitude
              </label>
              <Select value={chosenMag || ""} onValueChange={setChosenMag}>
                <SelectTrigger id="magnitude">
                  <SelectValue placeholder="Select magnitude level" />
                </SelectTrigger>
                <SelectContent>
                  {MAGNITUDE_LEVELS.map((mag) => (
                    <SelectItem key={mag.value} value={mag.value}>
                      {mag.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter city, state, country"
                  className="pl-8"
                  value={chosenLocation || ""}
                  onChange={(e) => setChosenLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dateRange" className="text-sm font-medium">
                Date Range
              </label>
              <Select
                value={chosenDateRange || ""}
                onValueChange={setChosenDateRange}
              >
                <SelectTrigger id="dateRange">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="sortOption" className="text-sm font-medium">
                Sort By
              </label>
              <Select
                value={chosenSortOption || ""}
                onValueChange={setChosenSortOption}
              >
                <SelectTrigger id="sortOption">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={sendSearchRequest} className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {documents && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Search Results</h2>
            {documents.length > 0 ? (
              <Badge variant="outline" className="text-sm">
                {documents.length} earthquakes found
              </Badge>
            ) : (
              <Badge variant="outline" className="text-sm bg-muted">
                No results found
              </Badge>
            )}
          </div>

          {documents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  No results found. Try broadening your search criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="grid">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((document) => (
                    <Card key={document._id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {document._source.place}
                          </CardTitle>
                          <Badge
                            variant={
                              getMagnitudeColor(document._source.mag) as any
                            }
                          >
                            M{document._source.mag.toFixed(1)}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(document._source["@timestamp"])}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>Type: {document._source.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Maximize2 className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>Depth: {document._source.depth} km</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>
                              Lat: {document._source.coordinates.lat.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>
                              Lon: {document._source.coordinates.lon.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="link" className="px-0 h-auto" asChild>
                          <a
                            href={document._source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {documents.map((document) => (
                    <Card key={document._id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">
                                {document._source.place}
                              </h3>
                              <Badge
                                variant={
                                  getMagnitudeColor(document._source.mag) as any
                                }
                              >
                                M{document._source.mag.toFixed(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {formatDate(document._source["@timestamp"])}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-sm">
                              <div>Type: {document._source.type}</div>
                              <div>Depth: {document._source.depth} km</div>
                              <div>
                                Lat:{" "}
                                {document._source.coordinates.lat.toFixed(3)}
                              </div>
                              <div>
                                Lon:{" "}
                                {document._source.coordinates.lon.toFixed(3)}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={document._source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Details
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}
