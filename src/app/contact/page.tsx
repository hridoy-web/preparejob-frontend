"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Sparkles, HelpCircle, MessageSquareCode, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const secureKey = process.env.NEXT_PUBLIC_APP_SECURE_TOKEN;
    
    if (secureKey) {
      formData.append("access_key", secureKey);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully! We will get back to you within 24 hours.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error! Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Section */}
        <header className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
            <Sparkles className="size-4" aria-hidden="true" />
            <span>Get in Touch</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Got Questions, Feedback, <br />
            <span className="text-indigo-600">or Bug Reports?</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
            Have issues with interview questions, roadmap suggestions, or found a bug? Drop us a message anytime and we will look into it.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Direct Support Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Direct Support</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">t.okay383@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Time</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">Within 24 Hours</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                  <HelpCircle className="size-4 text-indigo-500 shrink-0" />
                  <span>Ask doubts regarding interview practice questions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                  <MessageSquareCode className="size-4 text-purple-500 shrink-0" />
                  <span>Report technical bugs or platform errors</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                  <Sparkles className="size-4 text-amber-500 shrink-0" />
                  <span>Suggest new tech stacks or career roadmaps</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Your Name <span className="text-rose-500">*</span></label>
                  <Input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Your Email Address <span className="text-rose-500">*</span></label>
                  <Input 
                    type="email" 
                    name="email"
                    required
                    placeholder="example@gmail.com"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Your Message <span className="text-rose-500">*</span></label>
                  <Textarea 
                    name="message"
                    required
                    rows={5}
                    placeholder="Write your message, feedback, or bug report here..."
                    className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-sm p-3 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all text-sm shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
}