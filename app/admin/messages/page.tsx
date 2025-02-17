"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      setMessages(data || []);
    };

    fetchMessages();
  }, [supabase]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await supabase
      .from("contact_messages")
      .update({ status: newStatus })
      .eq("id", id);

    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, status: newStatus } : msg
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "read":
        return "bg-yellow-500";
      case "replied":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contact Messages</h1>
      </div>

      <div className="bg-card rounded-lg shadow">
        {messages.length > 0 ? (
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <div key={message.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{message.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{message.status}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(message.id, "read")}
                      disabled={message.status !== "new"}
                    >
                      Mark as Read
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(message.id, "replied")}
                      disabled={message.status === "replied"}
                    >
                      Mark as Replied
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">{message.message}</p>
                <p className="text-sm text-muted-foreground">
                  Received: {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
