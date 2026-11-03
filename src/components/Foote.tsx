"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import {
  Palette,
  Camera,
  Music2,
  Mic2,
  Film,
  Video,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// New X Logo
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.5l7.3-8.4L1.8 2h6.4l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
  </svg>
);
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const quickLinks = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

const categories = [
  {
    label: "Art Studios",
    href: "/studios?category=art-studio",
    icon: Palette,
  },
  {
    label: "Photography Studios",
    href: "/studios?category=photography",
    icon: Camera,
  },
  {
    label: "Music Studios",
    href: "/studios?category=music",
    icon: Music2,
  },
  {
    label: "Recording Studios",
    href: "/studios?category=recording",
    icon: Mic2,
  },
  {
    label: "Film Studios",
    href: "/studios?category=film",
    icon: Film,
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "YouTube", href: "https://youtube.com", icon: Video },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Connect your newsletter API here
    console.log("Newsletter Email:", email);

    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#101116] text-white mt-1">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-700/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 text-2xl font-black shadow-lg shadow-purple-500/30">
                S
              </div>

              <span className="text-3xl font-bold tracking-tight">
                Studio<span className="text-purple-500">Space</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Unlock your creativity in inspiring spaces. StudioSpace connects
              you with the perfect studio for your next project, event, or idea.
            </p>

            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-violet-700" />

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22242e] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-7 flex items-center gap-3 text-lg font-semibold">
              <span className="h-6 w-1 rounded-full bg-purple-500" />
              Quick Links
            </h3>

            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-sm text-gray-400 transition hover:text-purple-400"
                  >
                    {link.label}

                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="mb-7 flex items-center gap-3 text-lg font-semibold">
              <span className="h-6 w-1 rounded-full bg-purple-500" />
              Popular Categories
            </h3>

            <ul className="space-y-5">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <li key={category.label}>
                    <Link
                      href={category.href}
                      className="group flex items-center gap-4 text-sm text-gray-400 transition hover:text-purple-400"
                    >
                      <Icon className="h-5 w-5 text-gray-300 transition group-hover:text-purple-400" />

                      {category.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-7 flex items-center gap-3 text-lg font-semibold">
              <span className="h-6 w-1 rounded-full bg-purple-500" />
              Join Our Newsletter
            </h3>

            <p className="mb-6 text-sm leading-7 text-gray-400">
              Get the latest studio listings, exclusive offers, and creative
              inspiration delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  required
                  className="h-12 rounded-full border-gray-700 bg-[#1b1c24] pl-12 text-white placeholder:text-gray-500 focus-visible:border-purple-500 focus-visible:ring-purple-500"
                />
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-gradient-to-r from-purple-500 to-violet-700 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-[1.02] hover:from-purple-600 hover:to-violet-800"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {message && (
                <p className="text-sm text-purple-400" role="status">
                  {message}
                </p>
              )}
            </form>

            <p className="mt-4 text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-12 bg-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {year} StudioSpace. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
            <Link href="/terms" className="transition hover:text-purple-400">
              Terms of Service
            </Link>

            <span className="text-gray-700">|</span>

            <Link href="/privacy" className="transition hover:text-purple-400">
              Privacy Policy
            </Link>

            <span className="text-gray-700">|</span>

            <Link href="/cookies" className="transition hover:text-purple-400">
              Cookie Policy
            </Link>
          </div>

          {/* Made With Love */}
          <p className="flex items-center gap-2 text-sm text-gray-400">
            Built for Creatives. By
            <Link
              href="/"
              className="font-semibold text-purple-400 transition hover:text-purple-300"
            >
              StudioSpace.
            </Link>
            <Heart className="h-4 w-4 fill-purple-500 text-purple-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
