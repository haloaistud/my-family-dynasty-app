import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Plus } from "lucide-react";
import { Button } from "./ui/button";

const PersonCard = ({ name, avatarUrl }: { name: string; avatarUrl?: string }) => (
  <div className="flex flex-col items-center">
    <Avatar className="h-16 w-16 border-2 border-primary/50 shadow-md">
      {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
      <AvatarFallback>
        <User className="h-8 w-8 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
    <span className="mt-2 text-sm font-medium">{name}</span>
  </div>
);

export default function FamilyTree() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">Family Tree</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center justify-center min-h-[400px] overflow-auto p-4 md:p-6">
        {/* Connectors */}
        <div className="absolute top-[88px] left-1/2 -translate-x-1/2 h-[40px] w-px bg-border"></div>
        <div className="absolute top-[128px] left-1/4 w-1/2 h-px bg-border"></div>
        <div className="absolute top-[128px] left-1/4 h-[40px] w-px bg-border"></div>
        <div className="absolute top-[128px] right-1/4 h-[40px] w-px bg-border"></div>
        <div className="absolute top-[210px] left-1/2 -translate-x-1/2 h-[40px] w-px bg-border"></div>

        {/* Great Grandparents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <PersonCard name="John Doe" />
        </div>

        {/* Grandparents */}
        <div className="absolute top-[158px] left-1/4 -translate-x-1/2">
          <PersonCard name="Richard Roe" />
        </div>
        <div className="absolute top-[158px] right-1/4 translate-x-1/2">
          <PersonCard name="Jane Smith" />
        </div>

        {/* Parents */}
        <div className="absolute top-[240px] left-1/2 -translate-x-1/2">
          <PersonCard name="Peter Jones" />
        </div>

        {/* User */}
        <div className="absolute top-[340px] left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center p-2 border-2 border-accent rounded-lg shadow-lg bg-accent/10">
            <Avatar className="h-20 w-20 border-2 border-accent shadow-xl">
              <AvatarImage src="https://picsum.photos/id/237/200/200" data-ai-hint="person face" />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <span className="mt-2 text-base font-bold text-accent-foreground">You</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
