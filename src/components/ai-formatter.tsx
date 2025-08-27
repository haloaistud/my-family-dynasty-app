"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { suggestFormatting } from "@/ai/flows/suggest-formatting";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Upload, FileText } from "lucide-react";

export default function AiFormatter() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recordType, setRecordType] = useState("Vintage Photo");
  const [userPreferences, setUserPreferences] = useState("A classic, respectful style suitable for a family archive.");
  const [recordDataUri, setRecordDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setRecordDataUri(loadEvent.target?.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!recordDataUri) {
      toast({
        title: "No file selected",
        description: "Please upload a photo or document to get suggestions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const result = await suggestFormatting({
        recordType,
        recordDataUri,
        userPreferences,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("Error getting formatting suggestions:", error);
      toast({
        title: "An error occurred",
        description: "Failed to get formatting suggestions. Please try again.",
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
            <Sparkles className="h-5 w-5 text-accent" />
            AI Formatting Assistant
          </CardTitle>
          <CardDescription>
            Get AI-powered suggestions to improve the visual presentation of your photos and records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="record-type">Record Type</Label>
            <Input id="record-type" value={recordType} onChange={(e) => setRecordType(e.target.value)} placeholder="e.g., Photo, Document" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-prefs">Style Preferences</Label>
            <Textarea id="user-prefs" value={userPreferences} onChange={(e) => setUserPreferences(e.target.value)} placeholder="e.g., modern, vintage, minimal" />
          </div>
          <div className="space-y-2">
            <Label>Upload Record</Label>
            <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              {fileName ? "Change file" : "Choose a file"}
            </Button>
            {fileName && <p className="text-sm text-muted-foreground flex items-center gap-2 pt-2"><FileText className="h-4 w-4"/> {fileName}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button type="submit" disabled={loading || !recordDataUri} className="w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Analyzing..." : "Get Suggestions"}
          </Button>
          {suggestions.length > 0 && (
            <div className="w-full space-y-2 text-sm">
                <h4 className="font-semibold">Suggestions:</h4>
                <ol className="list-decimal list-inside space-y-1 rounded-md border bg-secondary/50 p-4">
                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
