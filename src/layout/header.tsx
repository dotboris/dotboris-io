import React, { type ReactElement } from 'react'
import { Chatter } from '../components/chatter'
import { css } from '@emotion/react'
import { breakpoints, mediaQueries, palette, sizing } from '../theme'

const styles = {
  root: css({
    backgroundColor: palette.black.css,
    color: palette.white.css,
    boxSizing: 'border-box',
    borderBottom: `${palette.highlight.css} 5px solid`,

    // It gives the feeling that the header is both there and not when it's empty
    minHeight: '1rem',
  }),

  withChatter: css({
    height: '60vh',
    padding: `3rem ${sizing.contentPadding}`,

    [mediaQueries.desktop]: {
      padding: `10rem ${sizing.contentPadding}`,
    },
  }),

  content: css({
    height: '100%',
    margin: 'auto',
    maxWidth: breakpoints.desktop,
  }),
}

interface HeaderProps {
  withChatter: boolean
}

export function Header(props: HeaderProps): ReactElement {
  const { withChatter } = props

  return (
    <div css={[styles.root, withChatter && styles.withChatter]}>
      <div css={styles.content}>{withChatter ? <Chatter /> : null}</div>
    </div>
  )
}
