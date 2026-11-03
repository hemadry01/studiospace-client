
import BrowseCategory from "@/components/BrowseCategory";
import HeroSliderPage from "@/components/HeroSlider";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";
import StudioFature from "@/components/StudioFature";

export default function Home() {
  return (
    <div>
      <HeroSliderPage/>
      <BrowseCategory/>
      <StudioFature/>
      <HowBookingWorks/>
      <HostGuarantee/>
    </div>
  );
}
