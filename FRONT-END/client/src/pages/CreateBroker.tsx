import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
// 1. นำเข้า useMutation จาก TanStack Query แทน trpc
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  description: z.string().min(10, "Required"),
  logo_url: z.string().url("Invalid URL"),
  website: z.string().url("Invalid URL"),
  broker_type: z.enum(["cfd", "bond", "stock", "crypto"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBroker() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient(); // ใช้สำหรับรีเฟรชข้อมูลหลังบันทึก
  
  const form = useForm<FormValues>({
    defaultValues: { 
      name: "", 
      slug: "", 
      description: "", 
      logo_url: "", 
      website: "", 
      broker_type: "cfd" 
    },
  });

  // 2. ฟังก์ชันส่งข้อมูลไปยัง Node.js API
  const createBrokerRequest = async (values: FormValues) => {
    const response = await fetch("http://localhost:5000/api/brokers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create broker");
    }

    return response.json();
  };

  // 3. ใช้ useMutation ของ TanStack Query
  const createMutation = useMutation({
    mutationFn: createBrokerRequest,
    onSuccess: () => {
      // สั่งให้ข้อมูลในหน้าลิสต์เป็น "stale" เพื่อให้โหลดใหม่เมื่อกลับไปหน้าหลัก
      queryClient.invalidateQueries({ queryKey: ["brokers"] });
      setLocation("/"); 
      toast.success("Created!"); 
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <main className="container max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit Broker</h1>
        <p className="text-muted-foreground">
          Register a new institutional entity. Please ensure all data points align with documentation.
        </p>
      </div>

      <div className="border rounded-xl p-8 bg-card shadow-sm">
        <Form {...form}>
          {/* 4. เปลี่ยนการเรียก mutate */}
          <form onSubmit={form.handleSubmit((v) => createMutation.mutate(v))} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Broker Name</FormLabel>
                  <FormControl><Input placeholder="e.g. Sterling Capital" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Slug</FormLabel>
                  <FormControl><Input placeholder="sterling-capital" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="broker_type" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Broker Type</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["cfd", "bond", "stock", "crypto"].map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={field.value === type ? "default" : "secondary"}
                      className="w-full uppercase text-xs font-bold"
                      onClick={() => field.onChange(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="logo_url" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Logo URL</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Website</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] uppercase font-bold tracking-wider">Broker Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Provide overview..." className="min-h-[150px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex items-center justify-end gap-6 pt-4">
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Discard Draft
              </Link>
              <Button 
                type="submit" 
                // 5. เปลี่ยนจาก .isPending ของ tRPC มาเป็นของ useMutation
                disabled={createMutation.isPending}
                className="px-8"
              >
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}