import React, { ReactElement, ReactNode } from "react";
import { Header } from "./header";
import * as classes from "./layout.module.scss"

interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props

  return (
    <div className={classes.layout}>
      <Header />
      <main>{children}</main>
    </div>
  )
}
