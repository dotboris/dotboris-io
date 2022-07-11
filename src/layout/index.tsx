import React, { ReactElement, ReactNode } from "react";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function Footer(): ReactElement {
  return <>TODO: footer</>
}
