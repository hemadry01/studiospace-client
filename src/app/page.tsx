
import HeroSliderPage from "@/components/HeroSlider";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";
import StudioFature from "@/components/StudioFature";

export default function Home() {
  return (
    <div>
      <HeroSliderPage/>
      <StudioFature/>
      <HowBookingWorks/>
      <HostGuarantee/>
    </div>
  );
}
