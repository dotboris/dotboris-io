import { MESSAGES } from "./messages";
import { createStore } from "@xstate/store";
import { last } from "lodash-es";

export const chatStore = createStore({
  context: {
    messages: [] as { id: number; text: string }[],
  },
  on: {
    newMessage: {
      messages: (context) => {
        // Pick the next message
        const messageIndex = Math.floor(Math.random() * (MESSAGES.length - 1));
        const message = MESSAGES[messageIndex];

        // Add it to the list
        const lastId = last(context.messages)?.id ?? 0;
        const messages = [
          ...context.messages,
          {
            id: lastId + 1,
            text: message,
          },
        ];

        // remove overflow
        while (messages.length > 5) {
          messages.shift();
        }

        return messages;
      },
    },
    removeMessage: {
      messages: (context, event: { id: number }) =>
        context.messages.filter(({ id }) => id !== event.id),
    },
  },
});
