import { useEffect, useReducer } from "react";
import { MESSAGES } from "./messages";

export interface Message {
  key: string;
  text: string;
}

export function useChat() {
  const [state, dispatch] = useReducer(reducer, { state: "loading" });
  useEffect(() => {
    dispatch({ type: "init", messages: MESSAGES });
  }, []);

  let messages: Message[] = [];
  if (state.state === "ready") {
    messages = Object.entries(state.messages).map(([key, value]) => ({
      key,
      text: value,
    }));
  }

  return {
    messages,
    showMessage: () => {
      dispatch({ type: "show-message" });
    },
    removeMessage: (key: string) => {
      dispatch({ type: "remove-message", key });
    },
  };
}

type Action =
  | { type: "init"; messages: string[] }
  | { type: "show-message" }
  | { type: "remove-message"; key: string };
type State =
  | { state: "loading" }
  | {
      state: "ready";
      nextKey: number;
      messages: Record<string, string>;
      messagePool: string[];
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "init":
      if (state.state === "loading") {
        return {
          state: "ready",
          messagePool: [...action.messages],
          nextKey: 0,
          messages: {},
        };
      } else {
        return state;
      }
    case "show-message": {
      if (state.state !== "ready") {
        return state;
      }

      // Pick the next message
      const messageIndex = Math.floor(
        Math.random() * (state.messagePool.length - 1),
      );
      const message = state.messagePool[messageIndex];

      // Add it to the list
      const messages = {
        ...state.messages,
        [String(state.nextKey)]: message,
      };

      // Remove keys that overflow
      const keys = Object.keys(messages);
      while (keys.length > 5) {
        const toRemove = keys.shift();
        if (toRemove) {
          delete messages[toRemove];
        }
      }

      return {
        ...state,
        messages,
        nextKey: state.nextKey + 1,
      };
    }
    case "remove-message": {
      if (state.state !== "ready") {
        return state;
      }

      const messages = { ...state.messages };
      delete messages[action.key];

      return {
        ...state,
        messages,
      };
    }
  }
}
