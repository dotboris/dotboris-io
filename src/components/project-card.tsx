import { css } from '@emotion/react'
import { Github } from 'iconoir-react'
import React, { type ReactElement } from 'react'
import { palette } from '../theme'

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    padding: '1rem',
    border: '1px solid black',
  }),

  title: css({
    fontWeight: 'bold',
    fontSize: '1.3rem',
  }),

  buttonWrapper: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'end',
  }),

  button: css({
    // reset link
    color: 'black',
    textDecoration: 'none',

    // Button styles
    display: 'block',
    padding: '0.5rem 0.75rem',
    backgroundColor: palette.offWhite.css,
    textAlign: 'center',

    '&:hover, &:focus, &:active': {
      backgroundColor: palette.offWhite.darken(4).css,
    },

    '& svg': {
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      width: '1.25rem',
      height: '1.25rem',
    },
  }),
}

export interface ProjectCardProps {
  title: string
  description: string
  githubOwner: string
  githubSlug: string
}

export function ProjectCard({
  title,
  description,
  githubOwner,
  githubSlug,
}: ProjectCardProps): ReactElement {
  return (
    <article css={styles.root}>
      <div css={styles.title}>{title}</div>
      <div>{description}</div>
      <div css={styles.buttonWrapper}>
        <a
          href={`https://github.com/${githubOwner}/${githubSlug}`}
          css={styles.button}
        >
          <Github aria-label='GitHub logo' /> Project Page
        </a>
      </div>
    </article>
  )
}
