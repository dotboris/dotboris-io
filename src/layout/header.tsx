import { Link } from "gatsby";
import React, { ReactElement } from "react";
import * as classes from './header.module.scss'

export function Header(): ReactElement {
  return (
    <div className={classes.header}>
      <Welcomer />
      <nav>
        <ul>
          <li>
            <Link to="https://github.com/dotboris">github.com/dotboris</Link>
          </li>
          <li>
            <Link to="https://github.com/dotboris">Projects</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function Welcomer(): ReactElement {
  return (
    <div className={classes.welcomer}>
      <img src="https://picsum.photos/100" alt="" />
      <div className={classes.bubble}>
        {'\u{1f44b}'} Hi! I'm Boris.
      </div>
    </div>
  )
}
