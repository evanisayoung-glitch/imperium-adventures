import { HomeLedger, HomeShow } from "@/components/commission/HomeShow";
import { HouseClose } from "@/components/commission/HouseClose";

export default function Home() {
  return (
    <>
      <HomeShow />
      <HomeLedger />
      <HouseClose />
    </>
  );
}
