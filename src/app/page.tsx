import Header from "@/components/header";
import FamilyTree from "@/components/family-tree";
import Timeline from "@/components/timeline";
import AiFormatter from "@/components/ai-formatter";
import MediaGallery from "@/components/media-gallery";
import ActionsPanel from "@/components/actions-panel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <FamilyTree />
            <Timeline />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8">
            <AiFormatter />
            <MediaGallery />
            <ActionsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
