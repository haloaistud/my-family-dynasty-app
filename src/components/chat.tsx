
"use client";
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Search, Send, Paperclip, Mic, Smile } from "lucide-react";

// Sample Data
const conversations = [
  { id: 1, name: 'Peter Jones', avatar: 'https://picsum.photos/id/1005/200/200', lastMessage: 'See you at the reunion!', time: '10:42 AM', unread: 2 },
  { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/id/1011/200/200', lastMessage: 'Can you send the photos?', time: '9:30 AM', unread: 0 },
  { id: 3, name: 'John Doe', avatar: 'https://picsum.photos/id/1012/200/200', lastMessage: 'Happy Birthday!', time: 'Yesterday', unread: 0 },
  { id: 4, name: 'Richard Roe', avatar: 'https://picsum.photos/id/1025/200/200', lastMessage: 'Thanks for the help with the research.', time: '3/15/24', unread: 0 },
];

const messagesData = {
  1: [
    { id: 1, sender: 'Peter Jones', text: "Hey! Are you excited for the family reunion next month?", time: "10:40 AM", own: false },
    { id: 2, sender: 'You', text: "Absolutely! I can't wait to see everyone. I've already RSVP'd.", time: "10:41 AM", own: true },
    { id: 3, sender: 'Peter Jones', text: "Great! It's going to be a blast. See you at the reunion!", time: "10:42 AM", own: false },
  ],
  2: [
    { id: 1, sender: 'Jane Smith', text: "Hi! I was wondering if you had the photos from grandma's 80th birthday?", time: "9:29 AM", own: false },
    { id: 2, sender: 'Jane Smith', text: "Can you send the photos?", time: "9:30 AM", own: false },
  ],
  3: [
    { id: 1, sender: 'John Doe', text: 'Happy Birthday!', time: 'Yesterday', own: false },
  ],
  4: [
    { id: 1, sender: 'Richard Roe', text: 'Thanks for the help with the research.', time: '3/15/24', own: false },
  ],
};


export default function Chat() {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(messagesData[activeConversation.id]);
  const [newMessage, setNewMessage] = useState("");

  const handleConversationSelect = (conv) => {
    setActiveConversation(conv);
    setMessages(messagesData[conv.id] || []);
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
        own: true,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  }

  return (
    <div className="flex h-full w-full bg-card">
      {/* Conversation List */}
      <aside className="w-1/3 border-r flex flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-headline">Chats</h2>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleConversationSelect(conv)}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50",
                activeConversation.id === conv.id && "bg-muted"
              )}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={conv.avatar} alt={conv.name} />
                <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="font-semibold">{conv.name}</p>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <p>{conv.time}</p>
                {conv.unread > 0 && <span className="mt-1 inline-block bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">{conv.unread}</span>}
              </div>
            </div>
          ))}
        </ScrollArea>
      </aside>

      {/* Chat Window */}
      <main className="w-2/3 flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 p-4 border-b">
          <Avatar>
            <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{activeConversation.name}</h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-secondary/30">
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex items-end gap-2", msg.own ? "justify-end" : "justify-start")}>
                {!msg.own && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg rounded-xl p-3 text-sm",
                  msg.own ? "bg-primary text-primary-foreground rounded-br-none" : "bg-background rounded-bl-none"
                )}>
                  <p>{msg.text}</p>
                   <p className={cn("text-xs mt-1", msg.own ? "text-primary-foreground/70" : "text-muted-foreground/70")}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <footer className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5"/></Button>
            <Input 
                placeholder="Type a message..." 
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" type="button"><Mic className="h-5 w-5"/></Button>
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </footer>
      </main>
    </div>
  )
}
