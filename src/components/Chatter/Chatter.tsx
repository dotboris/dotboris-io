import React from "react";
import { cn } from "../../classnames";

const MESSAGES = [
  "Hi! I'm Boris!",
  "Testing testing testing testing",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
];

export function Chatter(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <div className="font-normal">
      {children}
      <MessageList>
        {MESSAGES.map((message, index) => (
          <Message key={message} message={message} isLatest={index === 0} />
        ))}
      </MessageList>
    </div>
  );
}

function MessageList(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <ul className="absolute flex max-w-sm flex-col gap-2 pr-4">{children}</ul>
  );
}

function Message(props: { message: string; isLatest: boolean }) {
  const { message, isLatest } = props;
  return (
    <div className={cn("relative", isLatest && "mt-3")}>
      {isLatest && (
        <svg
          width={16}
          height={12}
          className="absolute -top-[11px] left-8 fill-white stroke-neutral-200"
        >
          <path
            d="
              M 0  12
              L 8  0
              L 16 12
            "
          ></path>
        </svg>
      )}
      <li className="inline-block rounded-xl border border-neutral-200 bg-white px-4 py-2 text-black shadow-lg">
        {message}
      </li>
    </div>
  );
}
