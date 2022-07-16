import classNames from "classnames"
import { StaticImage } from "gatsby-plugin-image"
import React, { ReactElement } from "react"
import * as classes from "./chatter.module.scss"
import { useRandomLines } from "./random-lines"

export function Chatter(): ReactElement {
  const { lines, startNewLine } = useRandomLines(`\u{1f44b} Hi! I'm Boris.`)

  return (
    <div
      className={classes.chatter}
      onClick={startNewLine}
    >
      <StaticImage
        src="../assets/avatar.png"
        alt="dotboris' avatar. A yellow anime duck with its mouth open"
        className={classes.avatar}
        layout="fixed"
        width={100}
        height={100}
      />
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
