import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://dotboris.io',
    title: '🤷',
    titleSuffix: 'dotboris.io',
    description:
      'Your one stop shop for all your dotboris related needs. ' +
      'Whatever that means 🤷.',
  },

  // This automatic type generation on happens during `gatsby develop` and
  // seemingly can't be triggered manually. This means that these types can't be
  // effectively used in the CI which is a damn right shame. If there's a way to
  // use them in the CI then I'll turn it back on. See:
  // https://github.com/gatsbyjs/gatsby/discussions/36220
  graphqlTypegen: false,

  plugins: [
    'gatsby-plugin-netlify',

    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv() {
          return process.env.GATSBY_ENV ?? 'development'
        },
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: '/' }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },

    'gatsby-plugin-sass',

    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: path.join(__dirname, 'src/content/articles'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'notes',
        path: path.join(__dirname, 'src/content/notes'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
              aliases: {
                bash: ['sh', 'shell'],
              },
            },
          },
        ],
      },
    },

    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'src/data/'),
      },
    },
  ],
}

export default config
