"use client";

import React from "react";
import Image from "next/image";
import { Tooltip } from "antd";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { AnimatePoint } from "../AnimatePoint/AnimatePoint";

export const DispatcherScheme = () => {
  const cards = [
    {
      id: 0,
      value: 10.5963,
      className: "bottom-[265px] left-[143px]",
      isProblem: true,
    },
    {
      id: 1,
      value: 100.106,
      className: "bottom-[405px] right-[560px]",
      isProblem: false,
    },
  ];

  const texts = [
    {
      title: "Теплосеть подача",
      className: "bottom-[440px] left-[41px] text-hot w-28",
    },
    {
      title: "Теплосеть обратка",
      className: "bottom-[350px] left-[41px] text-hot w-28",
    },
    {
      title: "ХВС",
      className: "bottom-[260px] left-[60px] text-water",
    },
    {
      title: "Отопление",
      className: "bottom-[476px] left-[745px] text-gray",
    },
    {
      title: "ГВС",
      className: "bottom-[390px] left-[771px] text-gray",
    },
    {
      title: "ХВС",
      className: "bottom-[276px] left-[771px] text-gray",
    },
    {
      title: "Индивидуальный тепловой пункт (ИТП)",
      className: "bottom-[320px] left-[235px] text-2xl text-hot w-56",
    },
    {
      title: "Многоквартирный жилой дом (МКД)",
      className: "bottom-[655px] left-[1250px] text-2xl text-hot w-80",
    },
  ];

  return (
    <div className="flex justify-center h-full w-full relative bg-white rounded-2xl">
      {cards.map((card) => (
        <div
          key={card.id}
          className={cn("absolute flex flex-col items-center", card.className)}
        >
          {/* тултип */}
          <Tooltip
            title={card.value}
            placement="top"
            open
            className={cn(card.isProblem ? "!text-hot" : "!text-green-500")}
            color={card.isProblem ? "red" : "green"}
          />
          <AnimatePoint
            isProblem={card.isProblem}
            className="w-3 h-3 absolute z-30 mt-6 "
          />
        </div>
      ))}

      {/* Схема */}
      <Image
        src={"/images/dispatcher/scheme.png"}
        alt="scheme"
        fill
        className="aspect-ratio-2.84/1 object-contain absolute z-0"
      />
      {texts.map((text) => (
        <div
          key={text.title}
          className={cn(
            "absolute z-20 text-sm flex text-center font-bold",
            text.className
          )}
        >
          {text.title}
        </div>
      ))}
    </div>
  );
};
