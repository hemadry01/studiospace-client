import React from "react";
import Camera from "@/assets/camera.png";
import Sound from "@/assets/video-camera.png"
import Podcast from "@/assets/microphone.png";
import Music from "@/assets/musical-note.png";
import Art from "@/assets/art.png";
import Image from "next/image";

const BrowseCategoryPage = () => {
  return (
    <section className="px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5">
        <div className="group flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100">
            <Image src={Camera} alt="Camera" width={45} height={45} />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 transition group-hover:text-purple-600">
            Photo Studios
          </h2>
        </div>

        <div className="group flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100">
            <Image src={Sound} alt="Sound" width={45} height={45} />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 transition group-hover:text-purple-600">
            Sound Stages
          </h2>
        </div>

        <div className="group flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100">
            <Image src={Podcast} alt="Podcast" width={45} height={45} />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 transition group-hover:text-purple-600">
            Podcast Rooms
          </h2>
        </div>

        <div className="group flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100">
            <Image src={Music} alt="Music" width={45} height={45} />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 transition group-hover:text-purple-600">
            Music Suites
          </h2>
        </div>

        <div className="group flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100">
            <Image src={Art} alt="Art" width={45} height={45} />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 transition group-hover:text-purple-600">
            Art Workshops
          </h2>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategoryPage;
