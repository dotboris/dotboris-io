import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://dotboris.io',
    title: '🤷',
    titleSuffix: 'dotboris.io',
    description: (
      'Your #1 stop for all your dotboris related need? ' +
      'Whatever those may be 🤷.'
    )
  },

  // This automatic type generation on happens during `gatsby develop` and
  // seemingly can't be triggered manually. This means that these types can't be
  // effectively used in the CI which is a damn right shame. If there's a way to
  // use them in the CI then I'll turn it back on. See:
  // https://github.com/gatsbyjs/gatsby/discussions/36220
  graphqlTypegen: false,

  plugins: [
    'gatsby-plugin-sass',

    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(__dirname, 'src/pages')
      }
    },

    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'src/data/')
      }
    }
  ]
}

export default config
