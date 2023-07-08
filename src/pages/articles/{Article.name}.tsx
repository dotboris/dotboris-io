import { graphql } from 'gatsby'
import React, { type ReactElement } from 'react'
import { Layout } from '../../layout'
import { Meta } from '../../meta'

interface PageQuery {
  article: {
    parent: {
      html: string
      frontmatter: {
        title?: string
        description?: string
      }
    }
  }
}
export const pageQuery = graphql`
  query ($id: String!) {
    article(id: { eq: $id }) {
      parent {
        ... on MarkdownRemark {
          html
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`

interface Props {
  data: PageQuery
}

export default function ArticlePage({ data }: Props): ReactElement {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.article.parent.html }} />
    </Layout>
  )
}

export function Head({ data }: Props): ReactElement {
  return (
    <Meta
      title={data.article.parent.frontmatter.title}
      description={data.article.parent.frontmatter.description}
    />
  )
}
