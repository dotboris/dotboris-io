import { css } from '@emotion/react'
import { GitHub } from 'iconoir-react'
import React, { type ReactElement } from 'react'

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
    <article
      css={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',

        padding: '1rem',
        border: '1px solid black',
      })}
    >
      <div
        css={css({
          fontWeight: 'bold',
          fontSize: '1.3rem',
        })}
      >
        {title}
      </div>
      <div>{description}</div>
      <div
        css={css({
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'end',
        })}
      >
        <a
          href={`https://github.com/${githubOwner}/${githubSlug}`}
          css={css({
            // reset link
            color: 'black',
            textDecoration: 'none',

            // Button styles
            display: 'block',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#eee', // TODO: reuse values.scss
            textAlign: 'center',

            '&:hover, &:focus, &:active': {
              backgroundColor: '#e0e0e0', // TODO: reuse values.scss
            },

            '& svg': {
              display: 'inline-block',
              verticalAlign: 'text-bottom',
              width: '1.25rem',
              height: '1.25rem',
            },
          })}
        >
          <GitHub aria-label='GitHub logo' /> Project Page
        </a>
      </div>
    </article>
  )
}
