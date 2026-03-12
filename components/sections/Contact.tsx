"use client";

import { useState, FormEvent } from "react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData();

    // Google Form Entry IDs
    formData.append(
      "entry.625667604",
      (form.elements.namedItem("name") as HTMLInputElement).value,
    );
    formData.append(
      "entry.1665157167",
      (form.elements.namedItem("email") as HTMLInputElement).value,
    );
    formData.append(
      "entry.1077078572",
      (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    );

    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc7EJfCdZJWCJ2m0vGV6eorfgk194i4sfEns4qHw0J0cL9moQ/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        },
      );

      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container id="contact" className="mb-20">
      <SectionTitle title="Get In Touch" subtitle="Contact Me" />

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <h3 className="text-3xl font-bold mb-6">Let's work together</h3>
          <p className="text-black/70 text-lg mb-8 leading-relaxed">
            Have a project in mind? Looking for a partner who cares about design
            and performance as much as you do? Drop me a line.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:althafdev01@gmail.com"
              className="flex items-center gap-4 text-xl font-bold hover:text-accent transition-colors"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                <Mail className="w-5 h-5" />
              </div>
              althafdev01@gmail.com
            </a>
            {/* Social links could go here */}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-lg">
          {success ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <CheckCircle2 className="w-16 h-16 text-accent mb-4" />
              <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
              <p className="text-black/60">
                I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold uppercase tracking-wide"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/5 border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold uppercase tracking-wide"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/5 border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold uppercase tracking-wide"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
}
