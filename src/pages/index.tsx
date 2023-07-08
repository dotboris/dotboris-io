import React, { type ReactElement } from 'react'
import { Layout } from '../layout'
import { Meta } from '../meta'
import { Link, graphql } from 'gatsby'

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

      <h2>Articles</h2>
      {data.allArticle.nodes.map((article) => (
        <article key={article.name}>
          <h3>{article.parent.frontmatter.title}</h3>
          <p>
            {article.parent.frontmatter.description}
            <Link to={`/articles/${article.name}`}>Read More</Link>
          </p>
        </article>
      ))}
    </Layout>
  )
}

export function Head(): ReactElement {
  return <Meta title='👋' />
}
