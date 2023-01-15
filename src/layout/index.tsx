import React, { ReactElement, ReactNode } from 'react'
import { Header } from './header'
import * as classes from './layout.module.scss'

export interface LayoutProps {
  withChatter?: boolean
  mainClassName?: string
  children: ReactNode
}

export function Layout (props: LayoutProps): ReactElement {
  return (
    <div className={classes.layout}>
      <Header withChatter={props.withChatter ?? false} />
      <main className={props.mainClassName}>
        {props.children}
      </main>
    </div>
  )
}
