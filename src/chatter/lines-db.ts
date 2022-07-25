import { graphql, useStaticQuery } from "gatsby"

type LinesDbQueryResult = {
  allDataYaml: {
    nodes: {
      lines?: string[]
    }[]
  }
}

export function useLinesDb(): string[] {
  const data = useStaticQuery<LinesDbQueryResult>(
    graphql`{
      allDataYaml {
        nodes {
          lines
        }
      }
    }
  `)

  return data.allDataYaml.nodes
    .flatMap(node => node.lines)
    .flatMap(line => line ? [line] : [])
}
