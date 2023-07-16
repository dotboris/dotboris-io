import { StaticImage } from 'gatsby-plugin-image'
import React, { type ReactElement } from 'react'
import { useLinesDb } from './lines-db'
import { useRandomLines } from './random-lines'
import { css } from '@emotion/react'
import { palette } from '../../theme'

const BUBBLES_CONTAINER_PADDING = '1rem'
const BUBBLE_RADIUS = '0.5rem'

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

  bubblesWrapper: css({
    position: 'relative',
    boxSizing: 'border-box',
    height: '100%',

    // By default grid items have these set to `auto`. This lets them take up
    // the space they need as they grow. In our case, we don't want them cell to
    // grow. The inner element will do the growing with scrolling.
    minWidth: 0,
    minHeight: 0,
  }),

  bubbles: css({
    '&, li': {
      // clean up all the <ul> an <li> default styles
      listStyle: 'none',
      margin: 0,
    },

    // The direction is reversed so stuff like :first-child and :last-child are
    // inverted as well.
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'start',
    gap: '0.25rem',
    overflowY: 'auto',
    boxSizing: 'border-box',
    height: '100%',
    paddingTop: BUBBLES_CONTAINER_PADDING,
    paddingRight: 0,
    paddingBottom: BUBBLES_CONTAINER_PADDING,
    paddingLeft: BUBBLES_CONTAINER_PADDING,

    // Individual bubble
    '& > *': {
      position: 'relative',
      borderRadius: BUBBLE_RADIUS,
      padding: '0.25rem 0.5rem',
      background: palette.white.css,
      color: palette.black.css,

      // Only the child at the bottom (first because of `column-reverse`) has as swoosh
      '&:first-child': {
        // remove the bottom left radius
        borderRadius: `${BUBBLE_RADIUS} ${BUBBLE_RADIUS} ${BUBBLE_RADIUS} 0`,

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
      },
    },
  }),

  fadeBase: css({
    content: '""',
    width: '100%',
    height: BUBBLES_CONTAINER_PADDING,
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
      <div css={styles.bubblesWrapper}>
        <ul css={styles.bubbles}>
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
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
    </div>
  )
}
