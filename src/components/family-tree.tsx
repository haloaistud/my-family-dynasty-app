"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Expanded dataset
const familyData = {
  id: "you",
  name: "You",
  group: "Immediate",
  avatarUrl: "https://picsum.photos/id/237/200/200",
  dataAiHint: "person face",
  children: [
    {
      id: "peter-jones",
      name: "Peter Jones",
      group: "Immediate",
      children: [
        {
          id: "richard-roe",
          name: "Richard Roe",
          group: "Extended",
          children: [
            { id: "john-doe", name: "John Doe", group: "Extended", children: [] }
          ],
        },
        { id: "jane-smith", name: "Jane Smith", group: "In-laws", children: [] },
      ],
    },
  ],
};

const groupColors = {
    'Immediate': 'border-primary',
    'Extended': 'border-green-500',
    'In-laws': 'border-yellow-500',
    'Bonus Family': 'border-blue-500',
    'Distant': 'border-gray-500',
}

const PersonNode = ({ person, onAddMember }) => (
  <div className="relative group flex flex-col items-center text-center">
    <Avatar className={`h-16 w-16 md:h-20 md:w-20 border-4 ${groupColors[person.group] || 'border-border'} shadow-lg hover:border-accent transition-all duration-300`}>
      {person.avatarUrl && <AvatarImage src={person.avatarUrl} alt={person.name} data-ai-hint={person.dataAiHint} />}
      <AvatarFallback>
        <User className="h-8 w-8 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
    <span className="mt-2 text-sm font-semibold">{person.name}</span>
     <span className="text-xs text-muted-foreground">{person.group}</span>
    <Button
      variant="outline"
      size="icon"
      className="absolute -bottom-4 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => onAddMember(person.id)}
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export default function FamilyTree() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGroup, setNewMemberGroup] = useState('Immediate');
  const [treeData, setTreeData] = useState(familyData);

  const handleAddMemberClick = (parentId: string) => {
    setSelectedParent(parentId);
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    if (!selectedParent || !newMemberName) return;

    const addMemberToTree = (node, parentId, newMember) => {
        if (node.id === parentId) {
            return {
                ...node,
                children: [...(node.children || []), newMember],
            };
        }
        if (node.children) {
            return {
                ...node,
                children: node.children.map(child => addMemberToTree(child, parentId, newMember)),
            };
        }
        return node;
    };
    
    const newMember = {
        id: newMemberName.toLowerCase().replace(/\s/g, '-'),
        name: newMemberName,
        group: newMemberGroup,
        children: [],
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
        dataAiHint: "person face"
    };

    setTreeData(addMemberToTree(treeData, selectedParent, newMember));
    setIsModalOpen(false);
    setSelectedParent(null);
    setNewMemberName('');
    setNewMemberGroup('Immediate');
  };

  const renderTreeRecursively = (person, onAddMember) => {
    const children = person.children || [];
    const childCount = children.length;
    return (
      <div className="flex flex-col items-center shrink-0">
        <PersonNode person={person} onAddMember={onAddMember} />
        {childCount > 0 && (
          <>
            <div className="h-12 w-px bg-border"></div>
            {childCount > 1 && <div className={`h-px bg-border w-[calc(100%-100px)] -mt-12`}></div>}
            <div className="flex justify-around w-full items-start">
              {children.map(child => (
                <div key={child.id} className="flex flex-col items-center relative">
                  <div className="absolute -top-12 h-12 w-px bg-border"></div>
                  {renderTreeRecursively(child, onAddMember)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };


  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline">Family Oak</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[400px] overflow-auto p-8 flex justify-center bg-gradient-to-br from-yellow-200 to-blue-300 dark:from-yellow-900 dark:to-blue-900">
        {renderTreeRecursively(treeData, handleAddMemberClick)}
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Family Member</DialogTitle>
            <DialogDescription>
              Enter the details of the new family member to add to the tree.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleAddMember();
            }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memberName" className="text-right">Name</Label>
                <Input id="memberName" name="memberName" className="col-span-3" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memberGroup" className="text-right">Group</Label>
                 <Select value={newMemberGroup} onValueChange={setNewMemberGroup}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Immediate">Immediate Family</SelectItem>
                        <SelectItem value="Extended">Extended Family</SelectItem>
                        <SelectItem value="In-laws">In-laws</SelectItem>
                        <SelectItem value="Bonus Family">Bonus Family</SelectItem>
                        <SelectItem value="Distant">Distant Relatives</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
