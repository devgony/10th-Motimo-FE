"use client";

import { AppBar } from "@/components/shared";
import GoalInfo from "@/components/shared/GoalInfo/GoalInfo";
import TodoList from "@/components/main/TodoList/TodoList";
import GoalTitleArea from "@/components/main/GoalTitleArea/GoalTitleArea";
import GoalMenuContainer from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import Banner from "@/components/shared/Banner/Banner";
import GoalCard from "@/components/main/GoalCard/GoalCard";
import MainHeader from "@/components/main/MainHeader/MainHeader";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import dynamic from "next/dynamic";

// 클라이언트에서만 렌더링되는 BottomTabBar (SSR 제외)
const BottomTabBar = dynamic(
  () =>
    import("@/components/shared/BottomTabBar/BottomTabBar").then((mod) => ({
      default: mod.BottomTabBar,
    })),
  { ssr: false },
);

export default function Main() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
  const router = useRouter();
  const { isLoggedIn, hasCompletedOnboarding, setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    const checkLoginStatus = () => {
      console.log("📌loginStatus", isLoggedIn);
      console.log("📌hasCompletedOnboarding", hasCompletedOnboarding);

      if (!isLoggedIn || !hasCompletedOnboarding) {
        // 로그인하지 않았거나 온보딩을 완료하지 않은 경우
        router.replace("/onboarding");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router, isLoggedIn, hasCompletedOnboarding]);

  const tmpDaysOfServiceUse = 1;

  return (
    <>
      <section className="w-full h-full">
        <div
          data-icon="false"
          data-type="main"
          className="w-full h-full relative bg-white inline-flex flex-col flex-1 justify-start  gap-1"
        >
          <MainHeader daysOfServiceUse={tmpDaysOfServiceUse} />
          {/* <div className="flex justify-end w-full">
            <AppBar type="main" />
          </div>
          <Banner
            title="목표는 멀어도 나는 계속 가는 중"
            tag="모티모와 함께 한 지 1일차"
          /> */}
          <GoalMenuContainer />
          {/* <div className="w-full flex-1 p-4 bg-background-normal inline-flex flex-col justify-start items-start gap-2 ">
            <GoalTitleArea goalTitle="6개월 안에 책 50권 읽기" />
            <GoalInfo leftDateNum={180} leftTodoNum={0} />
            <TodoList initTodoItemsInfo={[]} todoTotalLen={0} />
          </div> */}
          <GoalCard />
        </div>
      </section>
      <BottomTabBar className="fixed z-40 bottom-0" type="1" />
    </>
  );
}
