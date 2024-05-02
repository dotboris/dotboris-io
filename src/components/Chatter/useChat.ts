import { useEffect, useReducer } from "react";
import { MESSAGES } from "./messages";

export interface Message {
  key: string;
  message: string;
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
      message: value,
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

      const key = String(state.nextKey);
      const messageIndex = Math.floor(
        Math.random() * (state.messagePool.length - 1),
      );
      const message = state.messagePool[messageIndex];

      return {
        ...state,
        messages: {
          ...state.messages,
          [key]: message,
        },
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
