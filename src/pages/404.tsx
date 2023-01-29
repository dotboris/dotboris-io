import React, { type ReactElement } from 'react'
import { Layout } from '../layout'
import { Meta } from '../meta'
import { Link } from 'gatsby'

export default function NotFoundPage (): ReactElement {
  return (
    <Layout>
      <h1>404 not found</h1>
      <p>That's odd 🤔. How did you get here?</p>
      <p>
        I don't know what to tell you.  Maybe next time you should try doing
        the exact opposite of whatever it is you did to get here.
      </p>
      <p>
        If that doesn't work, you can always try turning it off and on again.
      </p>
      <p>
        In the meantime, here's a not so helpful link back to
        the <Link to='/'>home page</Link>.
      </p>
    </Layout>
  )
}

export function Head (): ReactElement {
  return <Meta title='😕' />
}
