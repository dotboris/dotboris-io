import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { Chatter } from '../chatter'
import * as classes from './header.module.scss'

interface HeaderProps {
  withChatter: boolean
}

export function Header (props: HeaderProps): ReactElement {
  const { withChatter } = props

  return (
    <div
      className={classNames({
        [classes.header]: true,
        [classes.withChatter]: withChatter
      })}
    >
      <div className={classes.content}>
        {withChatter ? <Chatter /> : null}
      </div>
    </div>
  )
}
