import { type NodeInput, type GatsbyNode, type Node } from 'gatsby'
import { type FileSystemNode } from 'gatsby-source-filesystem'

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const { createNode, createParentChildLink } = actions

  if (node.parent == null) {
    throw Error(`Expected MarkdownRemark node ${node.id} to have a parent node`)
  }
  const parent = getNode(node.parent)
  if (parent == null || !isFileSystemNode(parent)) {
    throw Error(
      `Expected MarkdownRemark node parent ${node.parent} to be a File`,
    )
  }

  function createContentTypeNode(
    typeName: string,
    node: Node,
    parent: FileSystemNode,
  ): NodeInput {
    const res: NodeInput = {
      name: parent.name,
      id: createNodeId(`${node.id} >> ${typeName}`),
      parent: node.id,
      children: [],
      internal: {
        type: typeName,
        contentDigest: '',
      },
    }
    res.internal.contentDigest = createContentDigest(res)

    return res
  }

  switch (parent.sourceInstanceName) {
    case 'articles': {
      const article = createContentTypeNode('Article', node, parent)
      await createNode(article)
      createParentChildLink({ parent, child: article })
      break
    }
    case 'notes': {
      const note = createContentTypeNode('Note', node, parent)
      await createNode(note)
      createParentChildLink({ parent, child: note })
      break
    }
  }
}

function isFileSystemNode(node: Node): node is FileSystemNode {
  return node.internal.type === 'File'
}
