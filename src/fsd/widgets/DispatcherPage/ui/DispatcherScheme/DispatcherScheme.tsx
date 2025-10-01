"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button, Tooltip } from "antd";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { AnimatePoint } from "../AnimatePoint/AnimatePoint";
import { texts } from "../../model/schemeTexts";
import { TooltipPlacement } from "antd/es/tooltip";
import { Card } from "antd";
import { useDispatcherScheme } from "../../hooks/useDispatcherScheme";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import { Theme } from "@/fsd/shared/config/theme/theme";
import html2canvas from "html2canvas-pro";
import { DownloadOutlined } from "@ant-design/icons";

interface IProps {
  location_id: string;
}
export const DispatcherScheme = ({ location_id }: IProps) => {
  const { counters, indicationInfoData, status, indicationInfo } =
    useDispatcherScheme(location_id);
  const { theme } = useThemeStore();
  const schemeRef = useRef<HTMLDivElement>(null);

  const handleScreenShotScheme = async () => {
    if (!schemeRef.current) return;

    try {
      const canvas = await html2canvas(schemeRef.current, {
        backgroundColor: null, // прозрачный фон
        scale: 2, // лучшее качество
      });

      const dataUrl = canvas.toDataURL("image/png");

      // Создаем ссылку для скачивания
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `scheme_${location_id}_${new Date().toISOString()}.png`;
      link.click();
    } catch (err) {
      console.error("Ошибка при создании скриншота:", err);
    }
  };

  return (
    <div
      className={cn(
        "h-full relative bg-white rounded-2xl  w-[1680px] shrink-0 flex",
        theme === Theme.DARK && "brightness-90"
      )}
      ref={schemeRef}
    >
      {/* Схема */}
      <Image
        src={"/images/dispatcher/scheme.png"}
        alt="scheme"
        fill
        className="aspect-ratio-2.84/1 object-contain absolute z-0 border-1 border-[#001529] rounded-2xl"
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
      <div className="absolute left-10 top-10 z-30 flex  text-start font-bold gap-5">
        {indicationInfoData.map((info) => (
          <Card
            key={info.id}
            title={`${info.title}:`}
            className={cn(
              "text-center",
              status ? "!text-hot" : "text-primary-text"
            )}
            variant="outlined"
            size="small"
          >
            {info.text}
          </Card>
        ))}
      </div>
      <div className="absolute left-95 top-10 z-30 flex  text-start font-bold gap-5">
        {indicationInfo.map((info) => (
          <Card
            key={info.id}
            title={`${info.title}:`}
            className={cn(
              "text-center",
              status ? "!text-hot" : "text-primary-text"
            )}
            variant="outlined"
            size="small"
          >
            {info.text}
          </Card>
        ))}
      </div>
      {counters.map((card) => (
        <Tooltip
          key={card.id}
          title={card.title}
          placement={(card.placement as TooltipPlacement) || "top"}
        >
          <div
            key={card.id}
            className={cn(
              "absolute flex flex-col items-center cursor-pointer gap-3",
              card.className
            )}
          >
            <div
              className={cn(
                "text-sm rounded-md p-1 font-bold",
                card.isHot ? "bg-hot" : "bg-green-500"
              )}
            >
              {card.value}
            </div>
            <AnimatePoint
              isProblem={card.isHot}
              className={cn("w-3 h-3 z-30", card.pointClassName)}
            />
          </div>
        </Tooltip>
      ))}
      <Button
        type="primary"
        onClick={handleScreenShotScheme}
        className="absolute bottom-10 left-10 z-30 self-end gap-2"
      >
        Сохранить схему
        <DownloadOutlined className="text-lg" />
      </Button>
    </div>
  );
};
