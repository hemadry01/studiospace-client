"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { PackageCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IStudio } from "@/type/Studio";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

import { Separator } from "@/components/ui/separator";

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

interface IEditStudioProps{
    studio:IStudio
}

const EditStudioDialog = ({ studio }:IEditStudioProps) => {

      const router = useRouter();
    //   const { data: session } = authClient.useSession();
    //   const user = session?.user;
    //   const userName = user?.name ?? "John Doe";
    //   const userEmail = user?.email ?? "john.doe@example.com";
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
    
      const [form, setForm] = useState(studio);
      const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const { _id, ...updatedData } = form;
           const res =  await fetch(`http://localhost:8000/studios/${studio._id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            });
            const data = await res.json();
            console.log(data);
    }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className={"min-w-4xl"}>
        <DialogHeader>
          <DialogTitle>Edit Studio</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-sm border border-border bg-white p-8 shadow-sm"
            >
              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                {/* Studio Title */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="studio-title" className="font-semibold">
                    Studio Title
                  </Label>
                  <Input
                    id="studio-title"
                    type="text"
                    placeholder="e.g. Studio Title"
                    className="h-11"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="studio-category" className="font-semibold">
                    Category
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => update("category", value ?? "")}
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
                        <SelectItem key={item.value} value={form.category}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hourly Rate */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="hourly-rate" className="font-semibold">
                    Hourly Rate ($)
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
                      value={form.hourlyRate}
                      onChange={(e) => update("hourlyRate", e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>

                {/* Security Deposit */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="security-deposit" className="font-semibold">
                    Security Deposit ($)
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
                      value={form.securityDeposit}
                      onChange={(e) =>
                        update("securityDeposit", e.target.value)
                      }
                      required
                    />
                  </InputGroup>
                </div>

                {/* Max Capacity */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="max-capacity" className="font-semibold">
                    Max Capacity
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
                      value={form.maxCapacity}
                      onChange={(e) => update("maxCapacity", e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>

                {/* Location / Address */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="studio-address" className="font-semibold">
                    Location / Address
                  </Label>
                  <InputGroup className="h-11">
                    <InputGroupAddon align="inline-start">
                      <MapPinIcon className="size-4 text-violet-600" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="studio-address"
                      type="text"
                      placeholder="e.g. 123 Creative Ave, New York, NY"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image-url" className="font-semibold">
                    Image URL
                  </Label>
                  <InputGroup className="h-11">
                    <InputGroupAddon align="inline-start">
                      <LinkIcon className="size-4 text-violet-600" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="image-url"
                      type="url"
                      placeholder="https://example.com/studio.jpg"
                      value={form.imageUrl}
                      onChange={(e) => update("imageUrl", e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>

                {/* Amenities List */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm leading-none font-semibold">
                    Amenities List
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
                    Detailed Overview
                  </Label>
                  <Textarea
                    id="detailed-overview"
                    className="min-h-24"
                    placeholder="Tell us more about your studio, its features, and what makes it special..."
                    value={form.overview}
                    onChange={(e) => update("overview", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-8 font-semibold"
                  onClick={() => router.push("/my-listings")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 bg-violet-600 px-8 text-white hover:bg-violet-700"
                >
                  <SendIcon data-icon="inline-start" />
                  Edit Studio
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDialog;
