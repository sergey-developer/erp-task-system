import { JSXElementConstructor } from 'react'

export type NavMenuItem = {
  link: string
  text: string
  icon: JSXElementConstructor<any>
  key: string
}
