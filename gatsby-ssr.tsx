import { type GatsbySSR } from 'gatsby'

export const onRenderBody: GatsbySSR['onRenderBody'] = args => {
  args.setHtmlAttributes({ lang: 'en' })
}
