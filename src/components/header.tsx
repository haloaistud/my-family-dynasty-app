import { Feather, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Feather className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              HeritageHub
            </span>
          </a>
        </div>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
