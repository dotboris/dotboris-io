import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement } from 'react'
import { useLocation } from '@reach/router'

export function Meta (props: SiteMetadata): ReactElement {
  const siteMetadata = useSiteMetadata()
  const location = useLocation()

  const titleParts = [
    props.title ?? siteMetadata.title,
    props.titleSuffix ?? siteMetadata.titleSuffix
  ]
  const title = titleParts.filter(Boolean).join(' - ')

  const description = props.description ?? siteMetadata.description

  const siteUrl = props.siteUrl ?? siteMetadata.siteUrl
  let pageUrl
  if (siteUrl !== null) {
    pageUrl = new URL(location.pathname, siteUrl)
  }

  return (
    <>
      {title !== ''
        ? <title>{title}</title>
        : null}

      {description !== null
        ? <meta name='description' content={description} />
        : null}

      {pageUrl !== undefined
        ? <link rel='canonical' href={pageUrl.toString()} />
        : null}
    </>
  )
}

interface SiteMetadata {
  title: string | null
  titleSuffix: string | null
  siteUrl: string | null
  description: string | null
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: SiteMetadata
  }
}

function useSiteMetadata (): SiteMetadata {
  const res = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          titleSuffix
          siteUrl
          description
        }
      }
    }
  `)

  return res.site.siteMetadata
}
