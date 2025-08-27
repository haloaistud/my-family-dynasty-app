"use client";

import { useState } from 'react';
import { analyzeStory, AnalyzeStoryOutput } from '@/ai/flows/analyze-story';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';

export default function StoryAnalysisTool() {
  const [story, setStory] = useState("My grandfather was a decorated war hero in WWII. He never spoke much of it, but my grandmother told me he saved three men from his platoon. After the war, he started a small woodworking business and was known for his incredible kindness and generosity in the community.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeStoryOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story) return;

    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeStory({ story });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing the story.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Enter a family story here for analysis..."
          rows={6}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Analyze Story
        </Button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">Analysis Results</h4>
          <div className="space-y-3 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Appropriateness</span>
              <Badge variant={result.isAppropriate ? 'default' : 'destructive'}>
                {result.isAppropriate ? (
                  <CheckCircle className="mr-1 h-3 w-3" />
                ) : (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                )}
                {result.isAppropriate ? 'Appropriate' : 'Review Needed'}
              </Badge>
            </div>

             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Sentiment</span>
                <Badge variant="secondary">{result.sentiment}</Badge>
            </div>

            <Separator/>

            <div>
                <span className="text-sm font-medium text-muted-foreground">Summary</span>
                <p className="text-sm">{result.summary}</p>
            </div>
            
            <Separator/>
            
            <div>
                <span className="text-sm font-medium text-muted-foreground">Tags</span>
                <div className="flex flex-wrap gap-2 mt-1">
                {result.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
                </div>
            </div>

            {result.issues.length > 0 && (
                <>
                <Separator/>
                <div>
                    <span className="text-sm font-medium text-destructive">Potential Issues</span>
                    <ul className="list-disc list-inside text-sm mt-1">
                    {result.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                    ))}
                    </ul>
                </div>
                </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
