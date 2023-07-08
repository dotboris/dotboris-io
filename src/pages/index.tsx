import React, { type ReactElement } from 'react'
import { Layout } from '../layout'
import { Meta } from '../meta'
import { Link, graphql } from 'gatsby'
import { ProjectCard } from '../components/project-card'
import { css } from '@emotion/react'
import { ArrowRight, FastArrowRight } from 'iconoir-react'

interface PageQuery {
  allArticle: {
    nodes: Array<{
      name: string
      parent: {
        frontmatter: {
          title: string
          description: string
        }
      }
    }>
  }
}
export const pageQuery = graphql`
  query MyQuery {
    allArticle {
      nodes {
        name
        parent {
          ... on MarkdownRemark {
            frontmatter {
              description
              title
            }
          }
        }
      }
    }
  }
`

interface Props {
  data: PageQuery
}
export default function IndexPage({ data }: Props): ReactElement {
  return (
    <Layout withChatter>
      <h1>Hello World!</h1>
      <p>
        👋 Hello there! My name is Boris and it looks like you've found yourself
        on my website. Welcome! This is my humble abode on the internet. This is
        where I share thoughts, ideas, projects and anything that might suite my
        fancy.
      </p>

      <h2>Projects</h2>
      <ProjectsGrid />

      <h2>Articles</h2>
      {data.allArticle.nodes.map((article) => (
        <article key={article.name}>
          <h3>{article.parent.frontmatter.title}</h3>
          <p>{article.parent.frontmatter.description}</p>
          <p>
            <Link to={`/articles/${article.name}`}>
              Continue reading
              <FastArrowRight
                aria-hidden
                css={css({
                  display: 'inline-block',
                  width: '1rem',
                  height: '1rem',
                  verticalAlign: 'bottom',
                })}
              />
            </Link>
          </p>
        </article>
      ))}
    </Layout>
  )
}

export function Head(): ReactElement {
  return <Meta title='👋' />
}

function ProjectsGrid(): ReactElement {
  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      })}
    >
      <ProjectCard
        title='Prod Guard'
        description="Browser extension that lets you know when you're connected to production by giving you a clear visual warning."
        githubOwner='dotboris'
        githubSlug='prod-guard'
      />
      <ProjectCard
        title='cdo'
        description='Small command to run other commands in a given directory.'
        githubOwner='dotboris'
        githubSlug='cdo'
      />
      <ProjectCard
        title='Alt'
        description='Simple version manager tool for switching between different versions of commands.'
        githubOwner='dotboris'
        githubSlug='alt'
      />
    </div>
  )
}
