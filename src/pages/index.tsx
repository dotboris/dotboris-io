import React, { type ReactElement } from 'react'
import { Layout } from '../layout'
import { Meta } from '../meta'

export default function IndexPage (): ReactElement {
  return (
    <Layout withChatter>
      <h1>Hello world</h1>
      Content goes here
    </Layout>
  )
}

export function Head (): ReactElement {
  return <Meta title='👋' />
}
