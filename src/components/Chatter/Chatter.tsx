import React from "react";
import { cn } from "../../classnames";
import { chatStore } from "./chatStore";
import { useSelector } from "@xstate/store/react";

export function Chatter(props: React.PropsWithChildren) {
  const { children } = props;

  const history = useSelector(chatStore, ({ context }) => context.history);

  return (
    <div>
      <button
        type="button"
        className="duration-50 block rounded-full ring-rose-300 transition hover:ring"
        onClick={() => chatStore.send({ type: "newMessage" })}
      >
        {children}
      </button>
      <MessageList>
        {history.map((message, index) => (
          <MessageItem
            key={message.id}
            messageId={message.id}
            messageText={message.text}
            isLatest={index === history.length - 1}
            removeMessage={() =>
              chatStore.send({ type: "removeMessage", id: message.id })
            }
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

function MessageItem(props: {
  messageId: number;
  messageText: string;
  isLatest: boolean;
  removeMessage: (key: string) => void;
}) {
  const { messageId, messageText, isLatest } = props;

  return (
    <div className={cn("relative", isLatest && "mt-3.5")}>
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
          onClick={() =>
            chatStore.send({ type: "removeMessage", id: messageId })
          }
        >
          {messageText}
        </button>
      </li>
    </div>
  );
}
