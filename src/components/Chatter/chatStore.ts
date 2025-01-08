import { MESSAGES } from "./messages";
import { createStore } from "@xstate/store";
import { last } from "lodash-es";

const initialContext = {
  history: [] as { id: number; text: string }[],
  messagePool: MESSAGES,
};

export const chatStore = createStore({
  context: initialContext,
  on: {
    reset: () => initialContext,
    newMessage: (context) => {
      // Pick the next message
      const messageIndex = Math.floor(
        Math.random() * (context.messagePool.length - 1),
      );
      const message = context.messagePool[messageIndex];

      // Add it to the list
      const lastId = last(context.history)?.id ?? 0;
      const history = [
        ...context.history,
        {
          id: lastId + 1,
          text: message,
        },
      ];

      // Remove overflow
      while (history.length > 5) {
        history.shift();
      }

      // Remove from pool
      let messagePool = context.messagePool.toSpliced(messageIndex, 1);
      // Reset when we run out
      if (messagePool.length === 0) {
        messagePool = MESSAGES;
      }

      return { history, messagePool };
    },
    removeMessage: {
      history: (context, event: { id: number }) =>
        context.history.filter(({ id }) => id !== event.id),
    },
  },
});
