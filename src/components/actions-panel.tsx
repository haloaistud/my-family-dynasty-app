import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Users, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
