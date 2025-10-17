import { cn } from "@/fsd/shared/utils/cn/cn";
import { Button, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";

interface IProps {
  placement?: TooltipPlacement;
  isProtected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  message?: string;
}
export const ProtectedUserButton = (props: IProps) => {
  const { placement, isProtected, onClick, children, message } = props;
  return (
    <Tooltip
      placement={placement}
      {...(isProtected && {
        title: message,
      })}
    >
      <Button
        onClick={onClick}
        className={cn(
          "w-fit !p-3 !border-gray-500",
          isProtected && "opacity-70"
        )}
        disabled={isProtected}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
