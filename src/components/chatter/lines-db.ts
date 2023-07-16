import { graphql, useStaticQuery } from 'gatsby'

interface LinesDbQueryResult {
  allDataYaml: {
    nodes: Array<{
      lines?: string[]
    }>
  }
}

export function useLinesDb(): string[] {
  const data = useStaticQuery<LinesDbQueryResult>(graphql`
    {
      allDataYaml {
        nodes {
          lines
        }
      }
    }
  `)

  return data.allDataYaml.nodes
    .flatMap((node) => node.lines)
    .flatMap((line) => (line !== undefined ? [line] : []))
}
