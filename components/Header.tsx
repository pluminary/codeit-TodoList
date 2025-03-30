// components/Header.tsx

"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // 뷰포트 크기에 따라 로고 변경
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 376);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = () => {
    router.push("/").then(() => router.reload());
  };

  return (
    <header className="w-full h-[60px] bg-white border-b border-slate-200">
      <div className="mx-auto w-full max-w-[1200px] px-4 mobile:px-6 pc:px-0 h-full flex items-center">
        <img
          src={isMobile ? "/images/logo-small.svg" : "/images/logo-large.svg"}
          alt="Do It Logo"
          className={isMobile ? "w-[71px] h-[40px]" : "w-[151px] h-[40px]"}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </header>
  );
}