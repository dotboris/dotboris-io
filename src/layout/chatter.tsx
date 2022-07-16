import classNames from "classnames"
import React, { ReactElement } from "react"
import * as classes from "./chatter.module.scss"

interface ChatterProps {
  className?: string
}

export function Chatter(props: ChatterProps): ReactElement {
  return (
    <div className={classNames(classes.chatter, props.className)}>
      <img src="https://picsum.photos/100" alt="" />
      <ul className={classes.bubbles}>
        <li>{'\u{1f44b}'} Hi! I'm Bori 1234 1234asdf asdfasdf s 1.</li>
        <li>{'\u{1f44b}'} Hi! I'm Boris 12341 1234 12342.</li>
        <li>{'\u{1f44b}'} Hi! I'm Boris 3.</li>
      </ul>
    </div>
  )
}
