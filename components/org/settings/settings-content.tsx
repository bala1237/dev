"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { SecuritySettings } from "./security-settings";
import { WebhookSettings } from "./webhook-settings";
import { PersonalSettings } from "./personal-settings";
import { useToast } from "@/components/ui/use-toast";
interface SettingsContentProps {
  initialSettings: any;
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const [settings, setSettings] = useState(initialSettings);
  const { toast } = useToast();
  const handleSettingsUpdate = async (section: string, updates: any) => {
    try {
      const response = await fetch('/api/org/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, updates })
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);

      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    }
  };
  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList>
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
      </TabsList>


      <TabsContent value="personal">
        <PersonalSettings
          settings={initialSettings.personal}
          onUpdate={(updates) => handleSettingsUpdate('personal', updates)}
        />
      </TabsContent>
      <TabsContent value="general">
        <GeneralSettings settings={initialSettings.general} />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings settings={initialSettings.security} />
      </TabsContent>

      <TabsContent value="webhooks">
        <WebhookSettings settings={initialSettings.webhooks} />
      </TabsContent>
    </Tabs>
  );
}