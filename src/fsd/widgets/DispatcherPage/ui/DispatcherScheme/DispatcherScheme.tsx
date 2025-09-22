"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Spin, Tooltip } from "antd";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { AnimatePoint } from "../AnimatePoint/AnimatePoint";
import { useSocket } from "@/fsd/shared/hooks/useSocket";
import { IGetIndicationResponse } from "@/fsd/entities/Indication/types/type";
import { texts } from "../../model/schemeTexts";

interface IProps {
  location_id: string;
}

export const DispatcherScheme = ({ location_id }: IProps) => {
  const indications = useSocket<IGetIndicationResponse>("indications", {
    location_id: location_id,
  });

  const { cold_water_in, temp_hot_water_in } =
    indications?.indications[0] || {};

  useEffect(() => {
    console.log(indications);
  }, [indications]);

  const counters = [
    {
      id: 0,
      value: cold_water_in ?? <Spin size="small" />,
      className: "bottom-[265px] left-[143px]",
      isCold: false,
    },
    {
      id: 1,
      value: temp_hot_water_in ? (
        `${temp_hot_water_in} °C`
      ) : (
        <Spin size="small" />
      ),
      className: "bottom-[405px] right-[560px]",
      isCold: true,
    },
  ];

  return (
    <div className="flex justify-center h-full w-full relative bg-white rounded-2xl">
      {counters.map((card) => (
        <div
          key={card.id}
          className={cn("absolute flex flex-col items-center", card.className)}
        >
          <Tooltip
            title={card.value}
            placement="top"
            open
            className={cn(card.isCold ? "!text-hot" : "!text-green-500")}
            color={card.isCold ? "red" : "green"}
          />
          <AnimatePoint
            isProblem={card.isCold}
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
        priority
      />
      {texts.map((text) => (
        <div
          key={text.id}
          className={cn(
            "absolute z-30 text-sm flex text-center font-bold !text-black",
            text.className
          )}
        >
          {text.title}
        </div>
      ))}
    </div>
  );
};
