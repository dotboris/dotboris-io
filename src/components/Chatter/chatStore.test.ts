import { chatStore } from "./chatStore";
import { beforeEach, describe, expect, it } from "vitest";
import { MESSAGES } from "./messages";
import { last } from "lodash-es";

describe("chatStore", () => {
  beforeEach(() => {
    chatStore.send({ type: "reset" });
  });

  it("resets", () => {
    chatStore.send({ type: "reset" });
    expect(chatStore.getSnapshot().context).toEqual(
      chatStore.getInitialSnapshot().context,
    );
  });

  it("should start with an empty history", () => {
    const { history } = chatStore.getInitialSnapshot().context;
    expect(history).toEqual([]);
  });

  it("should loop through all messages", () => {
    const seenMessages = new Set<string>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _message of MESSAGES) {
      chatStore.send({ type: "newMessage" });

      const lastMessage = last(chatStore.getSnapshot().context.history)?.text;
      if (lastMessage != null) {
        seenMessages.add(lastMessage);
      }
    }

    expect(seenMessages).toEqual(new Set(MESSAGES));
  });

  it("should limit history size", () => {
    for (let i = 0; i < 4; i++) {
      chatStore.send({ type: "newMessage" });
    }

    const before = chatStore.getSnapshot();

    chatStore.send({ type: "newMessage" });

    const after = chatStore.getSnapshot();

    expect(after.context.history.length).toBe(5);
    expect(after.context.history.slice(0, 4)).toEqual(
      before.context.history.slice(-4),
    );
  });

  it("should remove messages", () => {
    chatStore.send({ type: "newMessage" });
    chatStore.send({ type: "newMessage" });
    chatStore.send({ type: "newMessage" });

    const before = chatStore.getSnapshot();

    chatStore.send({ type: "removeMessage", id: before.context.history[1].id });

    const after = chatStore.getSnapshot();
    expect(after.context.history).toEqual(
      before.context.history.toSpliced(1, 1),
    );
  });

  it("should handle removing non-existing messages", () => {
    chatStore.send({ type: "newMessage" });
    chatStore.send({ type: "newMessage" });
    chatStore.send({ type: "newMessage" });

    const before = chatStore.getSnapshot();

    chatStore.send({
      type: "removeMessage",
      id: -1, // doesn't exist
    });

    const after = chatStore.getSnapshot();
    expect(after.context.history).toEqual(before.context.history);
  });
});
