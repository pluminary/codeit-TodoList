// components/Header.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/").then(() => {
      router.reload(); // 강제로 새로고침
    });
  };

  return (
    <header className="w-full bg-brand-900 py-4 px-6 text-white text-xl font-bold shadow-md">
      <Link href="/" onClick={handleClick}>
        <h1 className="cursor-pointer">📝 내 할 일 목록</h1>
      </Link>
    </header>
  );
}