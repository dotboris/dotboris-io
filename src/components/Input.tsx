import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-neutral-400 bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-black placeholder:text-neutral-300 focus-visible:border-rose-300 focus-visible:ring-3 focus-visible:ring-rose-300/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-white/50 disabled:opacity-50 aria-invalid:border-red-700 aria-invalid:ring-3 aria-invalid:ring-red-700/20 md:text-sm dark:bg-white/30 dark:disabled:bg-white/80 dark:aria-invalid:border-red-700/50 dark:aria-invalid:ring-red-700/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
