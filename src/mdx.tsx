import React, { ReactElement } from 'react'
import { Layout, LayoutProps } from './layout'
import { MDXProvider } from '@mdx-js/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBright as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Meta, MetaProps } from './meta'

interface FrontMatter {
  title?: string
  description?: string
}

type PropsWithPageContext<T> = T & {
  pageContext: { frontmatter: FrontMatter }
}

export default function MdxLayout (props: PropsWithPageContext<LayoutProps>): ReactElement {
  return (
    <Layout
      withChatter={props.withChatter}
      mainClassName={props.mainClassName}
    >
      <MDXProvider
        components={{
          code: Code
        }}
      >
        {props.children}
      </MDXProvider>
    </Layout>
  )
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

function Code (props: JSX.IntrinsicElements['code']): ReactElement {
  const { children, className } = props

  const match = /language-([a-z]+)/.exec(className ?? '')
  if (match !== null && typeof children === 'string') {
    const code = children.trim()

    const language = match[1]
    return (
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle}
        showLineNumbers
        PreTag='div'
      >
        {code}
      </SyntaxHighlighter>
    )
  } else {
    return (
      <code {...props} />
    )
  }
}

function getFrontMatter<T> (props: PropsWithPageContext<T>): FrontMatter {
  return props.pageContext.frontmatter
}
