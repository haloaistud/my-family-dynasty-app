"use client";

import { useState } from "react";
import { searchPublicRecords, PublicRecordsSearchOutput } from "@/ai/flows/public-records-search";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Archive } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "./ui/badge";

export default function PublicRecordsSearch() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("John Doe, born around 1920 in Ohio");
  const [result, setResult] = useState<PublicRecordsSearchOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) {
      toast({
        title: "Query is empty",
        description: "Please enter a name, date, or location to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const searchResult = await searchPublicRecords({ query });
      setResult(searchResult);
    } catch (error) {
      console.error("Error searching public records:", error);
      toast({
        title: "An error occurred",
        description: "Failed to search public records. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Archive className="h-5 w-5 text-primary" />
            Public Records Archive
          </CardTitle>
          <CardDescription>
            Search for simulated historical records like census data, birth certificates, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input 
                id="search-query" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="e.g., John Doe, Ohio, 1920" 
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Search
            </Button>
          </div>
        </CardContent>
        {result && (
          <CardFooter className="flex-col items-start gap-4">
            <div className="w-full space-y-4">
              <div>
                <h4 className="font-semibold">Search Summary</h4>
                <p className="text-sm text-muted-foreground">{result.searchSummary}</p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {result.records.map((record, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-4">
                             <Badge variant="secondary">{record.type}</Badge>
                             <span className="font-semibold text-left">{record.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pl-2">
                      <p className="text-sm"><strong className="text-muted-foreground">Date:</strong> {record.date}</p>
                      <p className="text-sm"><strong className="text-muted-foreground">Location:</strong> {record.location}</p>
                      <p className="text-sm pt-2">{record.summary}</p>
                      <p className="text-xs italic text-muted-foreground pt-2">Note: This is a simulated record for demonstration purposes.</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
