import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mediaItems = [
  { src: "https://picsum.photos/seed/h1/400/300", alt: "Family portrait from the 1920s", tag: "Photo", dataAiHint: "vintage photo" },
  { src: "https://picsum.photos/seed/h2/400/300", alt: "Handwritten letter", tag: "Document", dataAiHint: "old letter" },
  { src: "https://picsum.photos/seed/h3/400/300", alt: "Wedding photo", tag: "Photo", dataAiHint: "wedding couple" },
  { src: "https://picsum.photos/seed/h4/400/300", alt: "Birth certificate", tag: "Document", dataAiHint: "certificate document" },
  { src: "https://picsum.photos/seed/h5/400/300", alt: "Family at a picnic", tag: "Photo", dataAiHint: "family picnic" },
  { src: "https://picsum.photos/seed/h6/400/300", alt: "Old homestead", tag: "Photo", dataAiHint: "old house" },
];

export default function MediaGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Media Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {mediaItems.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={300}
                data-ai-hint={item.dataAiHint}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Badge variant={item.tag === 'Photo' ? 'default' : 'secondary'} className="absolute top-2 right-2">{item.tag}</Badge>
              <p className="absolute bottom-2 left-2 text-xs text-white font-medium">{item.alt}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
