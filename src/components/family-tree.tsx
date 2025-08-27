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

// Expanded dataset
const familyData = {
  id: "you",
  name: "You",
  avatarUrl: "https://picsum.photos/id/237/200/200",
  dataAiHint: "person face",
  children: [
    {
      id: "peter-jones",
      name: "Peter Jones",
      children: [
        {
          id: "richard-roe",
          name: "Richard Roe",
          children: [
            { id: "john-doe", name: "John Doe", children: [] }
          ],
        },
        { id: "jane-smith", name: "Jane Smith", children: [] },
      ],
    },
  ],
};

const PersonNode = ({ person, onAddMember }) => (
  <div className="relative group flex flex-col items-center text-center">
    <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/50 shadow-lg hover:border-accent transition-all duration-300">
      {person.avatarUrl && <AvatarImage src={person.avatarUrl} alt={person.name} data-ai-hint={person.dataAiHint} />}
      <AvatarFallback>
        <User className="h-8 w-8 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
    <span className="mt-2 text-sm font-semibold">{person.name}</span>
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

const OakBranch = ({ from, to }) => {
  const isYou = to.id === 'you';
  const strokeColor = isYou ? 'hsl(var(--accent))' : 'hsl(var(--border))';
  const strokeWidth = isYou ? 3 : 2;

  // Simplified curve for demonstration
  const d = `M ${from.x},${from.y} C ${from.x},${from.y + 50} ${to.x},${to.y - 50} ${to.x},${to.y}`;

  return (
    <path d={d} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
  );
};


const renderTree = (person, onAddMember, level = 0, parentPosition = null) => {
  const position = { x: 0, y: level * 120 };

  const childrenElements = person.children.map((child, index) => {
    const childLevel = level + 1;
    const childPosition = { x: (index - (person.children.length - 1) / 2) * (200 / (childLevel * 0.5 + 1)), y: childLevel * 150 };
    return renderTree(child, onAddMember, childLevel, position);
  });

  return (
    <div key={person.id} className="flex flex-col items-center relative">
        <PersonNode person={person} onAddMember={onAddMember} />
        <div className="flex gap-8 mt-12">
            {childrenElements}
        </div>
    </div>
  );
};

export default function FamilyTree() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [treeData, setTreeData] = useState(familyData);

  const handleAddMemberClick = (parentId: string) => {
    setSelectedParent(parentId);
    setIsModalOpen(true);
  };

  const handleAddMember = (newMemberName: string) => {
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
        children: [],
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
        dataAiHint: "person face"
    };

    setTreeData(addMemberToTree(treeData, selectedParent, newMember));
    setIsModalOpen(false);
    setSelectedParent(null);
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
      <CardContent className="min-h-[400px] overflow-auto p-8 flex justify-center">
        {renderTreeRecursively(treeData, handleAddMemberClick)}
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Family Member</DialogTitle>
            <DialogDescription>
              Enter the name of the new family member to add to the tree.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('memberName') as HTMLInputElement;
              handleAddMember(input.value);
            }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memberName" className="text-right">Name</Label>
                <Input id="memberName" name="memberName" className="col-span-3" required />
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
