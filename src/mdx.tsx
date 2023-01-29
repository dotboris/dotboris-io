import React, { type ReactElement } from 'react'
import { Meta, type MetaProps } from './meta'

interface FrontMatter {
  title?: string
  description?: string
}

type PropsWithPageContext<T> = T & {
  pageContext: { frontmatter: FrontMatter }
}

export function Head (props: PropsWithPageContext<MetaProps>): ReactElement {
  const frontMatter = getFrontMatter(props)

  return (
    <Meta
      title={frontMatter.title ?? props.title}
      description={frontMatter.description ?? props.description}
    />
  )
}

function getFrontMatter<T> (props: PropsWithPageContext<T>): FrontMatter {
  return props.pageContext.frontmatter
}
