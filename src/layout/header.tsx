import React, { ReactElement } from "react";
import { Chatter } from "../chatter";
import * as classes from './header.module.scss'

export function Header(): ReactElement {
  return (
    <div className={classes.header}>
      <div className={classes.content}>
        <Chatter />
      </div>
    </div>
  )
}
