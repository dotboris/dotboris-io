import classNames from "classnames"
import React, { ReactElement, useState } from "react"
import * as classes from "./chatter.module.scss"

export function Chatter(): ReactElement {
  const { lines, addLine } = useLines([`\u{1f44b} Hi! I'm Boris.`])

  return (
    <div
      className={classes.chatter}
      onClick={addLine}
    >
      <img src="https://picsum.photos/100" alt="" />
      <div className={classes.bubblesWrapper}>
        <ul className={classes.bubbles}>
          {lines.map((line, index) => <li key={index}>{line}</li>)}
        </ul>

        {/*
          Overlay elements that hides elements progressively with a gradient
          when they scroll past the top of bottom. This is prettier than the
          normal cut-off you get with `overflow-y: auto`.
        */}
        <div className={classNames(classes.fade, classes.fadeTop)} />
        <div className={classNames(classes.fade, classes.fadeBottom)} />
      </div>
    </div>
  )
}

function useLines(initialState: string[]) {
  const [lines, setLines] = useState(initialState)

  function pickRandomLine() {
    const parts = Array.from(
      Array(Math.floor(Math.random() * 5) + 2),
      () => Math.floor(Math.random() * 100000).toString()
    )
    return parts.join(" ")
  }

  function addLine() {
    // Lines work in reverse, because at the CSS layer we use flex-direction:
    // column-reverse which reverses everything but allows scrollilng to work
    // backwards which is what makes sense for a chat box.
    setLines(lines => [pickRandomLine(), ...lines])
  }

  return {
    lines,
    addLine,
  }
}
