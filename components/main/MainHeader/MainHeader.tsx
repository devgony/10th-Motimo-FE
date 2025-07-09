"use client";
import { AppBar } from "@/components/shared";
import Banner from "@/components/shared/Banner/Banner";
import { getCheerComment } from "@/lib/main/cheersFetching";
import { getPoints } from "@/lib/main/pointsFetching";
import useSWR from "swr";

interface MainHeaderProps {
  daysOfServiceUse: number;
}
const MainHeader = ({ daysOfServiceUse }: MainHeaderProps) => {
  // 임시 fetching. RSC에서 가져오도록 바꿔야 함
  const { data: cheerData } = useSWR("title", getCheerComment);
  const { data: pointData } = useSWR("points", getPoints);
  const cheerPhrase = cheerData?.cheerPhrase ?? "";
  const points = `${(pointData?.point ?? 0).toLocaleString()}P`;

  return (
    <>
      <div
        className="flex justify-end w-full h-14" // Banner 여유 공간 확보
      >
        <div className="fixed top-0 z-20">
          <AppBar type="main" points={points} />
        </div>
      </div>
      <Banner
        title={cheerPhrase}
        tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`}
      />
    </>
  );
};

export default MainHeader;
