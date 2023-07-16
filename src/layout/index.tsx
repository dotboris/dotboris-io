import React, { type ReactElement, type ReactNode } from 'react'
import { Header } from './header'
import { Global, css } from '@emotion/react'
import { breakpoints, globalCss, sizing } from '../theme'

const styles = {
  main: css({
    maxWidth: breakpoints.desktop,
    margin: 'auto',
    padding: sizing.contentPadding,
  }),
}

export interface LayoutProps {
  withChatter?: boolean
  mainClassName?: string
  children: ReactNode
}

export function Layout(props: LayoutProps): ReactElement {
  return (
    <>
      <Global styles={globalCss} />
      <div>
        <Header withChatter={props.withChatter ?? false} />
        <main css={styles.main} className={props.mainClassName}>
          {props.children}
        </main>
      </div>
    </>
  )
}
