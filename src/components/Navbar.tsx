"use client";

import React, { useState } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {

  const {data: session} = authClient.useSession();

  const user = session?.user;
  const role = session?.user?.role;
  console.log("User data:", role);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studio", href: "/studio" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    // { name: "Add Studio", href: "/add-studio" },
    ...(role === "host" ?[{ name: "Add Studio", href: "/add-studio" }]:[]),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src={Logo}
              width={45}
              height={45}
              alt="StudioSpace Logo"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Studio<span className="text-violet-600">Space</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-violet-600"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                      aria-label="Open profile menu"
                    />
                  }
                >
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-64">
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>{user?.email}</PopoverDescription>
                  </PopoverHeader>

                  <div className="flex flex-col gap-1 py-2">
                    <Link
                      href="/profile"
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/"
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                    
                    {role === "host" && (
                      <Link
                        href="/add-studio"
                        className="rounded-md px-3 py-2 text-sm font-medium hover:text-violet-600"
                      >
                        + Add Studio
                      </Link>
                    )}
                    {role === "host" && (
                      <Link
                        href="/my-listings"
                        className="rounded-md px-3 py-2 text-sm font-medium  hover:text-violet-600"
                      >
                        My Studio Listings
                      </Link>
                    )}
                    {role === "user" && (
                      <Link
                        href="/my-booking"
                        className="rounded-md px-3 py-2 text-sm font-medium  hover:text-violet-600"
                      >
                        My Bookings
                      </Link>
                    )}

                    <Link
                      href="/settings"
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      Settings
                    </Link>
                  </div>

                  <div className="border-t pt-3">
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-violet-600"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="px-6 py-3 rounded-full bg-violet-600 text-sm font-semibold text-white shadow-md shadow-violet-200/60 transition-all duration-300 hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 rounded-lg transition-colors duration-300 hover:text-violet-600 hover:bg-violet-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`grid transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <div className="overflow-hidden">
            <div className="py-5">
              {/* Mobile Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-3 text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-violet-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex items-center gap-6 mt-5 pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-gray-700 transition-colors hover:text-violet-600"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 rounded-full bg-violet-600 text-sm font-semibold text-white shadow-md shadow-violet-200/60 transition-colors hover:bg-violet-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
