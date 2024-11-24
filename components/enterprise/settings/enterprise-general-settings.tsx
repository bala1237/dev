"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const generalSettingsSchema = z.object({
  portalName: z.string().min(2).max(50),
  description: z.string().max(200),
  supportEmail: z.string().email(),
  maintenanceMode: z.boolean(),
  analyticsId: z.string(),
  defaultTimeZone: z.string(),
  customDomain: z.string().url(),
});

export function EnterpriseGeneralSettings() {
  const form = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      portalName: "Enterprise Developer Portal",
      description: "Central hub for API management and developer resources",
      supportEmail: "enterprise-support@company.com",
      maintenanceMode: false,
      analyticsId: "UA-XXXXXXXXX-X",
      defaultTimeZone: "UTC",
      customDomain: "https://developers.enterprise.com",
    },
  });

  function onSubmit(values: z.infer<typeof generalSettingsSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="portalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portal Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your enterprise developer portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of your developer portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Domain</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormDescription>
                    The domain where your portal will be hosted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormDescription>
                    Primary contact for enterprise support inquiries
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="analyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Analytics ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Your analytics tracking ID (e.g., Google Analytics)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultTimeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Timezone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Default timezone for the portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maintenanceMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Maintenance Mode</FormLabel>
                    <FormDescription>
                      Temporarily disable access to the portal
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}