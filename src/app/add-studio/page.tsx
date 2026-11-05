"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CameraIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const CATEGORIES = [
  { value: "photo-studio", label: "Photo Studio" },
  { value: "recording-space", label: "Recording Space" },
  { value: "dance-studio", label: "Dance Studio" },
  { value: "art-studio", label: "Art Studio" },
  { value: "meeting-space", label: "Meeting Space" },
];

const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Lighting Equipment",
  "Parking",
  "Soundproofing",
  "Kitchen",
];

const initialAmenities = new Set(AMENITIES);

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userName = user?.name ?? "John Doe";
  const userEmail = user?.email ?? "john.doe@example.com";
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<string>(CATEGORIES[0].value);
  const [hourlyRate, setHourlyRate] = React.useState("");
  const [securityDeposit, setSecurityDeposit] = React.useState("");
  const [maxCapacity, setMaxCapacity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [amenities, setAmenities] =
    React.useState<Set<string>>(initialAmenities);
  const [overview, setOverview] = React.useState("");

  const toggleAmenity = (amenity: string, checked: boolean) => {
    setAmenities((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(amenity);
      } else {
        next.delete(amenity);
      }
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    const res = await fetch("http://localhost:8000/add-studio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit),
        maxCapacity: Number(maxCapacity),
        address,
        imageUrl,
        amenities: [...amenities],
        overview,
        name: userName,
        email: userEmail,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("add new studio data");
      router.push("/");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/30">
          <CameraIcon className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Add a New Studio
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Fill in the details below to list your studio on StudioSpace.
          </p>
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          {/* Studio Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="studio-title" className="font-semibold">
              Studio Title <RequiredMark />
            </Label>
            <Input
              id="studio-title"
              type="text"
              placeholder="e.g. Downtown Photo Studio"
              className="h-11"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="studio-category" className="font-semibold">
              Category <RequiredMark />
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as string)}
              items={CATEGORIES}
            >
              <SelectTrigger
                id="studio-category"
                className="h-11 w-full rounded-lg"
              >
                <CameraIcon className="size-4 text-violet-600" />
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hourly Rate */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="hourly-rate" className="font-semibold">
              Hourly Rate ($) <RequiredMark />
            </Label>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <InputGroupText className="pl-0.5">$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="hourly-rate"
                type="number"
                min={0}
                placeholder="e.g. 50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          {/* Security Deposit */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="security-deposit" className="font-semibold">
              Security Deposit ($) <RequiredMark />
            </Label>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <InputGroupText className="pl-0.5">$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="security-deposit"
                type="number"
                min={0}
                placeholder="e.g. 100"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          {/* Max Capacity */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="max-capacity" className="font-semibold">
              Max Capacity <RequiredMark />
            </Label>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <UsersIcon className="size-4 text-violet-600" />
              </InputGroupAddon>
              <InputGroupInput
                id="max-capacity"
                type="number"
                min={1}
                placeholder="e.g. 10"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          {/* Location / Address */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="studio-address" className="font-semibold">
              Location / Address <RequiredMark />
            </Label>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <MapPinIcon className="size-4 text-violet-600" />
              </InputGroupAddon>
              <InputGroupInput
                id="studio-address"
                type="text"
                placeholder="e.g. 123 Creative Ave, New York, NY"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="image-url" className="font-semibold">
              Image URL <RequiredMark />
            </Label>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <LinkIcon className="size-4 text-violet-600" />
              </InputGroupAddon>
              <InputGroupInput
                id="image-url"
                type="url"
                placeholder="https://example.com/studio.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          {/* Amenities List */}
          <div className="flex flex-col gap-2">
            <span className="text-sm leading-none font-semibold">
              Amenities List <RequiredMark />
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1.5 sm:grid-cols-3">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  htmlFor={`amenity-${amenity}`}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    id={`amenity-${amenity}`}
                    className="size-5 rounded-md data-checked:bg-violet-600 data-checked:border-violet-600"
                    checked={amenities.has(amenity)}
                    onCheckedChange={(checked) =>
                      toggleAmenity(amenity, checked)
                    }
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label htmlFor="detailed-overview" className="font-semibold">
              Detailed Overview <RequiredMark />
            </Label>
            <Textarea
              id="detailed-overview"
              className="min-h-24"
              placeholder="Tell us more about your studio, its features, and what makes it special..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
            />

            {/* User Name / Email — read-only band */}
            <div className="flex flex-col gap-3 rounded-xl bg-violet-100/80 px-5 py-4 sm:flex-row sm:items-center sm:gap-0">
              <div className="flex flex-1 items-center gap-3">
                <UserIcon className="size-5 shrink-0 text-slate-600" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">User Name</span>
                  <span className="text-sm font-bold text-slate-900">
                    {userName}
                  </span>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-10 bg-violet-200 sm:block"
              />

              <div className="flex flex-1 items-center gap-3">
                <MailIcon className="size-5 shrink-0 text-slate-600" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">User Email</span>
                  <span className="text-sm font-bold text-slate-900">
                    {userEmail}
                  </span>
                </div>
              </div>

              <Badge className="gap-1.5 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                <LockIcon className="size-3" />
                Read-only
              </Badge>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-8 font-semibold"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 bg-violet-600 px-8 text-white hover:bg-violet-700"
          >
            <SendIcon data-icon="inline-start" />
            Add Studio
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddStudioPage;
