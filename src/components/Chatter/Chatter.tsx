import React from "react";
import { cn } from "../../classnames";
import { useChat } from "./useChat";

export function Chatter(props: React.PropsWithChildren) {
  const { children } = props;

  const { messages, showMessage, removeMessage } = useChat();

  return (
    <div>
      <button
        type="button"
        className="rounded-full hover:ring hover:ring-rose-300"
        onClick={showMessage}
      >
        {children}
      </button>
      <MessageList>
        {messages.map(({ key, message }, index) => (
          <Message
            key={key}
            message={message}
            isLatest={index === messages.length - 1}
            onClick={() => {
              removeMessage(key);
            }}
          />
        ))}
      </MessageList>
    </div>
  );
}

function MessageList(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <ul className="absolute flex max-w-sm flex-col-reverse gap-2 pb-4 pr-4">
      {children}
    </ul>
  );
}

function Message(props: {
  message: string;
  isLatest: boolean;
  onClick: () => void;
}) {
  const { message, isLatest, onClick } = props;
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
      <li className="inline-block min-w-20 rounded-xl border border-neutral-200 bg-white shadow-lg">
        <button
          type="button"
          className="w-full px-4 py-2 text-left font-normal text-black"
          onClick={onClick}
        >
          {message}
        </button>
      </li>
    </div>
  );
}
