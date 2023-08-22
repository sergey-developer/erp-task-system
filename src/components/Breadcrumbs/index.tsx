import { Space } from 'antd'
import { FC, Fragment } from 'react'
import { useMatches } from 'react-router-dom'

const Breadcrumbs: FC = () => {
  const matches = useMatches()

  const crumbs = matches
    .filter((match) => {
      const handle = match.handle as any
      return Boolean(handle?.crumb)
    })
    .map((match) => {
      const handle = match.handle as any
      return handle.crumb({ qs: new URLSearchParams(window.location.search) })
    })

  return !!crumbs.length ? (
    <Space>
      {crumbs.map((crumb, index, array) => (
        <Fragment key={index}>
          {crumb}
          {index === 0 || index !== array.length - 1 ? ' /' : ''}
        </Fragment>
      ))}
    </Space>
  ) : null
}

export default Breadcrumbs
