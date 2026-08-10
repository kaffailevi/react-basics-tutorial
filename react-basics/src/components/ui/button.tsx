import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg" | "icon";

const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variantClasses: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-95",
  secondary: "bg-card text-foreground border border-transparent hover:bg-opacity-95",
  outline: "border border-gray-200 bg-transparent hover:bg-gray-50",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "bg-transparent underline-offset-4 hover:underline text-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6",
  icon: "h-8 w-8 p-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant = "default", size = "md", disabled, ...rest } = props;

  return (
    <button
      ref={ref}
      className={cn(base, variantClasses[variant], sizeClasses[size], disabled && "opacity-50 cursor-not-allowed", className)}
      disabled={disabled}
      {...rest}
    />
  );
});

Button.displayName = "Button";

export { Button };
export default Button;
