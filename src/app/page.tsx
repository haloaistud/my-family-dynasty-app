import Header from '@/components/header';
import FamilyTree from '@/components/family-tree';
import Timeline from '@/components/timeline';
import AiFormatter from '@/components/ai-formatter';
import MediaGallery from '@/components/media-gallery';
import ActionsPanel from '@/components/actions-panel';
import PublicRecordsSearch from '@/components/public-records-search';
import FamilyStories from '@/components/family-stories';
import OnboardingWizard from '@/components/onboarding-wizard';
import {SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import { Home, Users, Clock, Image, Settings } from 'lucide-react';
import WeatherWidget from '@/components/weather-widget';


export default function App() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" isActive>
                      <Home />
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                      <Users />
                      Family Tree
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                      <Clock />
                      Timeline
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                      <Image />
                      Media
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                      <Settings />
                      Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                <div className="lg:col-span-2 flex flex-col gap-8">
                  <div className="animate-fadeInUp delay-100">
                    <PublicRecordsSearch />
                  </div>
                  <div className="animate-fadeInUp delay-200">
                    <FamilyTree />
                  </div>
                   <div className="animate-fadeInUp delay-300">
                    <Timeline />
                  </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="animate-fadeInUp delay-400">
                    <WeatherWidget />
                  </div>
                  <div className="animate-fadeInUp delay-500">
                    <AiFormatter />
                  </div>
                  <div className="animate-fadeInUp delay-600">
                    <MediaGallery />
                  </div>
                  <div className="animate-fadeInUp delay-700">
                    <FamilyStories />
                  </div>
                  <div className="animate-fadeInUp delay-700">
                    <ActionsPanel />
                  </div>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
      <OnboardingWizard />
    </SidebarProvider>
  );
}
