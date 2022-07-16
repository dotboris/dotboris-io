import { Link } from "gatsby";
import React, { ReactElement } from "react";
import { Chatter } from "./chatter";
import * as classes from './header.module.scss'

export function Header(): ReactElement {
  return (
    <div className={classes.header}>
      <Chatter className={classes.chatter} />
    </div>
  )
}
