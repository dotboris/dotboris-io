import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://dotboris.io`,
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
  ],
}

export default config
