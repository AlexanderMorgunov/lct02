"use client";
import { Spin } from "antd";
import { useState } from "react";

interface IframeWithLoaderProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

export const IframeWithLoader = ({
  src,
  className,
  style,
  fallback = <Spin size="large" />,
}: IframeWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {fallback}
        </div>
      )}
      <iframe
        src={src}
        className={className}
        style={{ width: "100%", height: "100%", border: "none", ...style }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
