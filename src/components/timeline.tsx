import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GitBranch, Briefcase } from "lucide-react";

const timelineEvents = [
  {
    year: "1945",
    title: "John & Mary Get Married",
    icon: <GitBranch className="h-4 w-4" />,
    color: "bg-pink-500/20 text-pink-700 dark:text-pink-400",
  },
  {
    year: "1950",
    title: "Peter Jones is Born",
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  },
  {
    year: "1972",
    title: "First Family Business Opened",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-green-500/20 text-green-700 dark:text-green-400",
  },
  {
    year: "1980",
    title: "Moved to a New Country",
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  },
];

export default function Timeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Family Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          <ul className="space-y-8">
            {timelineEvents.map((event, index) => (
              <li key={index} className="relative">
                <div className="absolute -left-[34px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${event.color}`}>
                        {event.icon}
                    </div>
                </div>
                <div className="pl-4">
                  <p className="text-sm font-medium text-muted-foreground">{event.year}</p>
                  <p className="font-semibold">{event.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
