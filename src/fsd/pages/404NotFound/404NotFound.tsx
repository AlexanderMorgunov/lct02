// src/fsd/pages/404NotFound/404NotFound.tsx
"use client";

import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center w-full"
      style={{
        backgroundImage: "url('/images/login/bg-loginpage.png')",
        backdropFilter: "brightness(50%)",
      }}
    >
      <h1 className="text-[12rem] font-bold drop-shadow-lg animate-fadeIn">
        404
      </h1>
      <p className="text-3xl mb-6 font-bold text-blue-950 animate-fadeIn [animation-delay:200ms]">
        Страница не найдена
      </p>

      <Link
        href="/"
        className="group flex items-center gap-2 px-6 py-3 bg-blue-950 hover:bg-blue-800 rounded-xl text-2xl font-medium shadow-lg transition duration-300"
      >
        <ArrowLeftOutlined className="w-7 h-7 transform transition-transform duration-300 group-hover:-translate-x-2" />
        На главную
      </Link>
    </div>
  );
}
