import React, { type ReactElement } from 'react'
import { css } from '@emotion/react'
import { palette } from '../../theme'

const RADIUS = '1rem'

const styles = {
  root: css({
    position: 'relative',
    boxSizing: 'border-box',
    height: '100%',

    // By default grid items have these set to `auto`. This lets them take up
    // the space they need as they grow. In our case, we don't want them cell to
    // grow. The inner element will do the growing with scrolling.
    minWidth: 0,
    minHeight: 0,
  }),

  bubbleList: css({
    // clean up all the <ul> an <li> default styles
    listStyle: 'none',
    margin: 0,

    // The direction is reversed so stuff like :first-child and :last-child are
    // inverted as well.
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'start',
    gap: '0.25rem',
    overflowY: 'auto',
    boxSizing: 'border-box',
    height: '100%',
    padding: '1rem 0 1rem 1rem',
  }),

  bubble: css({
    position: 'relative',
    borderRadius: RADIUS,
    padding: '0.25rem 0.5rem',
    background: palette.white.css,
    color: palette.black.css,
  }),

  latestBubble: css({
    // remove the bottom left radius
    borderRadius: `${RADIUS} ${RADIUS} ${RADIUS} 0`,

    '&::before': {
      // Swoosh or arrow that makes this a speech bubble.
      // It's built with CSS and plenty of jank reader beware.
      position: 'absolute',

      // Make this pseudo-element a box and put it to the left of the bubble
      // aligned with the bottom of the bubble
      content: '""',
      left: '-1rem',
      bottom: 0,
      width: '1rem',
      height: '1rem',

      // Give it a radius that's the inverse of the shape you want. We're
      // using this to "cut" out the value of the box. (I did promise jank)
      borderBottomRightRadius: '0.5rem 1rem',

      // The box itself is transparent but it's box shadow is not giving us a
      // sort of inverted rectangle shape where the actual box with the radius
      // is cut out and the swoosh is left behind.
      backgroundColor: 'transparent',
      boxShadow: `0.5rem 0 0 0 ${palette.white.css}`,
    },
  }),

  fadeBase: css({
    content: '""',
    width: '100%',
    height: '1rem',
    position: 'absolute',
    left: 0,
  }),
  fadeTop: css({
    backgroundImage: `linear-gradient(${palette.black.css}, transparent)`,
    top: 0,
  }),
  fadeBottom: css({
    backgroundImage: `linear-gradient(transparent, ${palette.black.css})`,
    bottom: 0,
  }),
}

interface BubblesProp {
  lines: string[]
}

export function Bubbles({ lines }: BubblesProp): ReactElement {
  return (
    <div css={styles.root}>
      <ul css={styles.bubbleList}>
        {lines.map((line, index) => (
          <li
            key={index}
            css={css([styles.bubble, index === 0 && styles.latestBubble])}
          >
            {line}
          </li>
        ))}
      </ul>
      {/*
        Overlay elements that hides elements progressively with a gradient
        when they scroll past the top of bottom. This is prettier than the
        normal cut-off you get with `overflow-y: auto`.
      */}
      <div css={css(styles.fadeBase, styles.fadeTop)} />
      <div css={css(styles.fadeBase, styles.fadeBottom)} />
    </div>
  )
}
