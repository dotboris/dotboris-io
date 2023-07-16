import { StaticImage } from 'gatsby-plugin-image'
import React, { type ReactElement } from 'react'
import { useLinesDb } from './lines-db'
import { useRandomLines } from './random-lines'
import { css } from '@emotion/react'
import { palette } from '../../theme'
import { Bubbles } from './bubbles'

const styles = {
  root: css({
    display: 'grid',
    grid: 'auto / auto 1fr',
    alignItems: 'end',

    // Because of the scrolling nonsense for the bubbles we need to take up the
    // size of the parent.
    height: '100%',
  }),

  avatar: css({
    // It's a button, remove the default styles
    all: 'unset',

    '&, .avatar-image': {
      borderRadius: '100%',
    },

    '.avatar-image': {
      border: 'transparent 3px solid',
      outline: `${palette.highlight.css} 3px solid`,
    },

    // When a real hover device is available (ex: a mouse), we do the usual
    // hover thing.
    '@media (hover: hover)': {
      cursor: 'pointer',

      '&:hover, &:focus, &:active': {
        '.avatar-image': {
          outlineColor: palette.white.css,
        },
      },
    },

    // When we don't have a hover device (ex: on mobile), we avoid using :hover
    // because it's "sticky" in the sense that clicking an element once leaves
    // it in a :hover state until something else is clicked. We use :active
    // instead to give feedback to the user that they're touch worked.
    '@media (hover: none)': {
      // We use transition here in a bit of a funny way. We want the :active
      // effect to lag or stay around for a little bit. This is because of
      // mobile the active state is gone in a flash and it's pretty jarring. We
      // do this funny move because `transition` doesn't let you add a delay on
      // the tail end of something. We have to manage that ourselves.
      //
      // There are two states:
      // - not :active -> delay on outline-color
      // - :active -> no delay on outline-color
      //
      // This makes it so that the delay only happens when we leave the :active
      // state. Here's what the timeline looks like:
      // - User touches
      // - :active state is set (instant)
      // - delay is removed (instant)
      // - color is changed (instant)
      // - User stops touching (usually instant since it's a tap)
      // - :active state is removed (instant)
      // - delay is set (instant)
      // - color is changed back (after the delay)
      '.avatar-image': {
        transition: 'outline-color 0s 0.2s',
      },

      '&:active': {
        '.avatar-image': {
          outlineColor: palette.white.css,
          transition: 'outline-color 0s',
        },
      },
    },
  }),
}

export function Chatter(): ReactElement {
  const allLines = useLinesDb()
  const { lines, startNewLine } = useRandomLines(
    "\u{1f44b} Hi! I'm Boris.",
    allLines,
  )

  return (
    <div css={styles.root}>
      <button
        css={styles.avatar}
        type='button'
        onClick={startNewLine}
        title='Say something!'
      >
        <StaticImage
          src='../../assets/avatar.png'
          alt="dotboris' avatar. A yellow anime duck with its mouth open"
          className='avatar-image'
          layout='fixed'
          width={100}
          height={100}
        />
      </button>
      <Bubbles lines={lines} />
    </div>
  )
}
