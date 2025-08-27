
"use client";

import { useState } from 'react';
import { familyGovernance, FamilyGovernanceOutput } from '@/ai/flows/family-governance';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ShieldCheck, Milestone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

export default function GovernanceTool() {
  const [situation, setSituation] = useState("A disagreement occurred between two cousins over a shared family heirloom.");
  const [members, setMembers] = useState("Cousin Sarah, Cousin Ben");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FamilyGovernanceOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation || !members) return;

    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await familyGovernance({ 
          situation,
          involvedMembers: members.split(',').map(m => m.trim())
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Guidance Failed',
        description: 'There was an error getting guidance from the AI.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="situation">Situation</Label>
            <Textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the family situation or conflict..."
            rows={4}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="members">Involved Members (comma-separated)</Label>
            <Input
                id="members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="e.g., John Doe, Jane Smith"
            />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Get Guidance
        </Button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">Matriarch's Guidance</h4>
          <div className="space-y-4 rounded-md border p-4">
            <div>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4"/>Relevant Principle</span>
                <Badge variant="secondary">{result.relevantPrinciple}</Badge>
            </div>
             <Separator/>
             <div>
                <span className="text-sm font-medium text-muted-foreground">Recommendation</span>
                <p className="text-sm">{result.recommendation}</p>
            </div>
            <Separator/>
            <div>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1"><Milestone className="h-4 w-4"/>Suggested Action</span>
                <p className="text-sm">{result.suggestedAction}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
