"use client";
import { IframeWithLoader } from "@/fsd/features/IframeWithLoader/IframeWithLoader";

export const DispatcherForecast = () => {
  return <IframeWithLoader src={process.env.NEXT_PUBLIC_FORECAST_URL || ""} />;
};
