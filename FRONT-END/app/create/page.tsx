"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Globe, Image as ImageIcon } from "lucide-react";

// 1. Schema Validation
const formSchema = z.object({
  name: z.string().min(1, "Broker name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logo_url: z.string().url("Invalid logo URL"),
  website: z.string().url("Invalid website URL"),
  broker_type: z.enum(["cfd", "bond", "stock", "crypto"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBroker() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      logo_url: "",
      website: "",
      broker_type: "cfd",
    },
  });

  const { watch, setValue, register, handleSubmit, formState: { errors, isValid } } = form;



  // 3. API Mutation
  const createMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await fetch("http://localhost:5000/api/brokers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to create broker");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brokers"] });
      toast.success("Broker created successfully!");
      router.push("/");
      router.refresh();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const brokerTypes = ["cfd", "bond", "stock", "crypto"];

  return (
    <main className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500">

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center mt-20 md:text-left">
          <h1 className="text-4xl font-bold text-white mb-3">Submit Broker</h1>
          <p className="text-slate-400">
            Register a new institutional entity within the ecosystem.
            Ensure data aligns with regulatory documentation.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#0c1425] border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit((v) => createMutation.mutate(v))} className="space-y-8">

            {/* Row 1: Name & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Broker Name</label>
                <input
                  {...register("name")}
                  placeholder="e.g. Sterling Capital Markets"
                  className="w-full bg-[#161f32] border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">slug</label>
                <input
                  {...register("slug")}

                  placeholder="sterling-capital"
                  className="w-full bg-[#161f32] border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Broker Type Selection */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
                Broker Type
              </label>

              <div className="relative">
                <select
                  {...register("broker_type")}
                  className="w-full appearance-none py-3 px-3 pr-10 rounded-lg bg-[#161f32] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  {brokerTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>

                {/* arrow */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Row 3: URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Logo URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    {...register("logo_url")}
                    placeholder="https://assets.site.com/logo.png"
                    className="w-full bg-[#161f32] border border-slate-700 rounded-lg p-3 pl-10 outline-none focus:border-blue-500"
                  />
                </div>
                {errors.logo_url && <p className="text-red-400 text-xs">{errors.logo_url.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    {...register("website")}
                    placeholder="https://broker-site.com"
                    className="w-full bg-[#161f32] border border-slate-700 rounded-lg p-3 pl-10 outline-none focus:border-blue-500"
                  />
                </div>
                {errors.website && <p className="text-red-400 text-xs">{errors.website.message}</p>}
              </div>
            </div>

            {/* Row 4: Description */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Broker Description</label>
              <textarea
                {...register("description")}
                placeholder="Provide a comprehensive institutional overview..."
                className="w-full bg-[#161f32] border border-slate-700 rounded-lg p-4 min-h-[160px] outline-none focus:border-blue-500 resize-none"
              />
              {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Discard Draft
              </button>
              <button
                type="submit"
                disabled={!isValid || createMutation.isPending}
                className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center shadow-xl shadow-blue-900/20"
              >
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}