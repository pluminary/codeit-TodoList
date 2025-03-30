// components/Header.tsx

 // 클라이언트 컴포넌트로 설정
"use client";
import Link from "next/link";
import { useRouter } from "next/router";

// Header 컴포넌트
export default function Header() {
  // useRouter 훅을 사용하여 라우터 객체를 가져옴
  const router = useRouter();

  // 홈으로 이동하는 함수
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/").then(() => {
      router.reload(); // 강제로 새로고침
    });
  };

  // Link 컴포넌트의 onClick 이벤트 핸들러를 사용하여 홈으로 이동하는 함수를 호출
  return (
    <header className="w-full bg-brand-900 py-4 px-6 text-white text-xl font-bold shadow-md">
      <Link href="/" onClick={handleClick}>
        <h1 className="cursor-pointer">📝 내 할 일 목록</h1>
      </Link>
    </header>
  );
}