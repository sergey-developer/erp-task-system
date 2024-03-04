import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

type BreadcrumbProps = {
  link: string
  text: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({ link, text }) => {
  const location = useLocation()
  return location.pathname === link ? <>{text}</> : <Link to={link}>{text}</Link>
}

export default Breadcrumb
