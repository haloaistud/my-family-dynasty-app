import React, { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Home, 
  Users, 
  Clock, 
  Image, 
  Settings, 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Share2, 
  BookOpen, 
  TreePine,
  Calendar,
  MapPin,
  Heart,
  Camera,
  FileText,
  Sparkles,
  Bell,
  CloudSun,
  GitBranch,
  Database,
  Activity,
  Zap
} from 'lucide-react';

// Enhanced Header Component
const Header = () => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <TreePine className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            MyFamilyDynasty
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

// Enhanced Family Tree Component
const FamilyTree = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", relation: "Self", birth: "1980-05-15", location: "New York" },
    { id: 2, name: "Jane Doe", relation: "Spouse", birth: "1982-09-20", location: "Boston" },
    { id: 3, name: "Robert Doe", relation: "Father", birth: "1950-03-10", location: "Chicago" },
    { id: 4, name: "Mary Doe", relation: "Mother", birth: "1952-11-25", location: "Detroit" }
  ]);

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Interactive Family Tree
            </CardTitle>
            <CardDescription>
              Visualize your family connections and relationships
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Family Member</DialogTitle>
                <DialogDescription>
                  Enter details for the new family member
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relation">Relationship</Label>
                  <Input id="relation" placeholder="e.g., Father, Mother, Child" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="birth">Birth Date</Label>
                  <Input id="birth" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Birth place or current location" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {members.map((member) => (
            <Card key={member.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setSelectedMember(member)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(member.birth).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{member.relation}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Timeline Component
const Timeline = () => {
  const events = [
    { id: 1, date: "2023-12-01", title: "Family Reunion", description: "Annual family gathering", type: "celebration" },
    { id: 2, date: "2023-11-15", title: "Birth of Emma", description: "New family member born", type: "birth" },
    { id: 3, date: "2023-10-20", title: "Wedding Anniversary", description: "John & Jane's 15th anniversary", type: "anniversary" },
    { id: 4, date: "2023-09-05", title: "New Photos Added", description: "Vacation photos uploaded", type: "media" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Family Timeline
        </CardTitle>
        <CardDescription>
          Important family events and milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                {index < events.length - 1 && <div className="w-0.5 h-12 bg-border mt-2"></div>}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Badge variant={event.type === 'celebration' ? 'default' : 'secondary'}>
                    {event.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Media Gallery Component
const MediaGallery = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const media = [
    { id: 1, type: "photo", title: "Family Vacation 2023", date: "2023-08-15" },
    { id: 2, type: "photo", title: "Wedding Day", date: "2008-06-20" },
    { id: 3, type: "document", title: "Birth Certificate - John", date: "1980-05-15" },
    { id: 4, type: "audio", title: "Grandpa's Stories", date: "2023-07-10" }
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Media Gallery
        </CardTitle>
        <CardDescription>
          Photos, documents, and memories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handleUpload} disabled={isUploading} size="sm" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </Button>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          )}

          <div className="grid gap-2">
            {media.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  {item.type === 'photo' && <Image className="h-4 w-4" />}
                  {item.type === 'document' && <FileText className="h-4 w-4" />}
                  {item.type === 'audio' && <Activity className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced AI Formatter Component
const AiFormatter = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateStory = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent("Your family's journey began in the early 1950s when Robert and Mary first met in Chicago. Their love story spans decades, creating a legacy that continues through their children and grandchildren. This rich history is filled with moments of joy, celebration, and the bonds that tie your family together across generations.");
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Story Generator
        </CardTitle>
        <CardDescription>
          Generate beautiful family narratives
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateStory} 
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Family Story'}
        </Button>
        
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              <span className="text-sm text-muted-foreground ml-2">AI is crafting your story...</span>
            </div>
          </div>
        )}
        
        {generatedContent && (
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertTitle>Generated Family Story</AlertTitle>
            <AlertDescription className="mt-2">
              {generatedContent}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

// Weather Widget Component
const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    location: "New York, NY",
    temperature: "72°F",
    condition: "Partly Cloudy",
    humidity: "65%"
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5" />
          Weather
        </CardTitle>
        <CardDescription>Current conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold">{weather.temperature}</div>
          <div className="text-sm text-muted-foreground">{weather.condition}</div>
          <div className="text-sm text-muted-foreground">{weather.location}</div>
          <div className="text-xs text-muted-foreground">Humidity: {weather.humidity}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// Actions Panel Component
const ActionsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" />
          Export Family Tree
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Share2 className="h-4 w-4 mr-2" />
          Share with Family
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Search className="h-4 w-4 mr-2" />
          Search Records
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <BookOpen className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
};

// Main App Component
export default function EnhancedFamilyDynasty() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        <Header />
        <div className="flex flex-1">
          <Sidebar className="border-r">
            <SidebarContent>
              <SidebarHeader>
                <h2 className="text-lg font-semibold px-4 py-2">Navigation</h2>
              </SidebarHeader>
              <SidebarMenu className="px-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("dashboard")}
                    isActive={activeTab === "dashboard"}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("tree")}
                    isActive={activeTab === "tree"}
                  >
                    <Users className="h-4 w-4" />
                    Family Tree
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("timeline")}
                    isActive={activeTab === "timeline"}
                  >
                    <Clock className="h-4 w-4" />
                    Timeline
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("media")}
                    isActive={activeTab === "media"}
                  >
                    <Image className="h-4 w-4" />
                    Media Gallery
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("settings")}
                    isActive={activeTab === "settings"}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset>
            <main className="flex-1 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="dashboard">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="animate-fadeIn">
                        <FamilyTree />
                      </div>
                      <div className="animate-fadeIn delay-150">
                        <Timeline />
                      </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                      <div className="animate-fadeIn delay-300">
                        <WeatherWidget />
                      </div>
                      <div className="animate-fadeIn delay-450">
                        <AiFormatter />
                      </div>
                      <div className="animate-fadeIn delay-600">
                        <MediaGallery />
                      </div>
                      <div className="animate-fadeIn delay-750">
                        <ActionsPanel />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tree">
                  <div className="max-w-4xl mx-auto">
                    <FamilyTree />
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline">
                  <div className="max-w-4xl mx-auto">
                    <Timeline />
                  </div>
                </TabsContent>
                
                <TabsContent value="media">
                  <div className="max-w-4xl mx-auto">
        
