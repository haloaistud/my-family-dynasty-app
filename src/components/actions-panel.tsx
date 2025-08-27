import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Users, Lock, ShieldCheck, FileScan, ShieldQuestion, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import StoryAnalysisTool from './story-analysis-tool';
import GovernanceTool from "./governance-tool";
import Chat from "./chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function ActionsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Tools & Settings</CardTitle>
        <CardDescription>Manage your data and privacy.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Download className="h-4 w-4" />Data Management</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Import GEDCOM
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export GEDCOM
            </Button>
          </div>
        </div>
        <Separator />
         <div className="space-y-4">
           <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Admin Tools</h3>
            <div className="space-y-2">
               <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Family Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
                  <Chat />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <FileScan className="mr-2 h-4 w-4" />
                    Story Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>AI Story Analysis</DialogTitle>
                  </DialogHeader>
                  <StoryAnalysisTool />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <ShieldQuestion className="mr-2 h-4 w-4" />
                    Family Governance
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Family Governance Assistant</DialogTitle>
                  </DialogHeader>
                  <GovernanceTool />
                </DialogContent>
              </Dialog>
            </div>
         </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Lock className="h-4 w-4" />Privacy Controls</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profile" className="font-normal">Make Profile Public</Label>
            <Switch id="public-profile" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="collaboration-level">Collaboration Level</Label>
            <Select defaultValue="viewer">
              <SelectTrigger id="collaboration-level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
