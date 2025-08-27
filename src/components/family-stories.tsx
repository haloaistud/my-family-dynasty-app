import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const stories = [
  {
    title: "Grandma's Secret Garden",
    author: "Jane Doe",
    snippet: "I'll never forget the summers spent in Grandma Mary's garden. It wasn't large, but it was magical. She had a way with plants, and could make anything grow...",
    tags: ["childhood", "gardening"],
  },
  {
    title: "The Day We Moved",
    author: "Peter Jones",
    snippet: "Moving to a new country in 1980 was the hardest and best thing our family ever did. I remember the long boat journey and seeing the new shore for the first time...",
    tags: ["immigration", "1980s"],
  },
    {
    title: "Uncle John's War Stories",
    author: "You",
    snippet: "My great-grandfather, John Doe, served in the Pacific. He rarely spoke of it, but once he told me about the friends he made and the incredible sights he saw...",
    tags: ["military", "WWII"],
  },
];

export default function FamilyStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <BookOpen/>
            Family Stories
        </CardTitle>
        <CardDescription>Read and contribute to your family's history.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full">
            <div className="space-y-6 pr-4">
                {stories.map((story, index) => (
                    <div key={index} className="space-y-1">
                        <h4 className="font-semibold">{story.title}</h4>
                        <p className="text-sm text-muted-foreground italic">by {story.author}</p>
                        <p className="text-sm">{story.snippet}</p>
                        <div className="flex gap-2 pt-1">
                            {story.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
