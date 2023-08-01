import { JSXElementConstructor } from 'react'

export type NavMenuItem = {
  text: string
  key: string
  link?: string
  icon?: JSXElementConstructor<any>
  children?: Array<NavMenuItem>
}
