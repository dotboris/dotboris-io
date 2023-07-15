import { css } from '@emotion/react'
import { HSL } from './color'

export const palette = {
  black: new HSL(0, 0, 13),

  white: new HSL(0, 0, 100),
  get offWhite() {
    return this.white.darken(7.5)
  },

  pink: new HSL(328, 100, 83),
  get highlight() {
    return this.pink
  },
}

export const sizing = {
  lineHeight: '1.2',
  fontSize: '1rem',
  contentPadding: '1.5rem',
}

export const breakpoints = {
  mobile: '320px',
  tablet: '740px',
  desktop: '980px',
  wide: '1300px',
}
export const mediaQueries = Object.fromEntries(
  Object.entries(breakpoints).map(([name, minWidth]) => [
    name,
    `@media (min-width: ${minWidth})`,
  ]),
)

export const globalCss = css({
  'html, body': {
    fontFamily: "'Atkinson Hyperlegible', sans-serif",
    fontSize: sizing.fontSize,
    lineHeight: sizing.lineHeight,

    padding: 0,
    margin: 0,

    // In case we have very little content, we don't want a stubby page
    minHeight: '100vh',
  },

  code: {
    fontFamily: "'Fira Code', monospace",
  },
  ':not(pre) > code': {
    fontSize: '0.875em',
    padding: '0.1em 0.2em',
    backgroundColor: palette.offWhite.css,
    borderRadius: '4px',
  },
})
