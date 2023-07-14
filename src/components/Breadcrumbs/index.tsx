import { Space } from 'antd'
import { FC, Fragment } from 'react'
import { useMatches } from 'react-router-dom'

const Breadcrumbs: FC = () => {
  const matches = useMatches()
  console.log(matches)
  const crumbs = matches
    .filter((match) => {
      const handle = match.handle as any
      return Boolean(handle?.crumb)
    })
    .map((match) => {
      const handle = match.handle as any
      return handle.crumb()
    })

  return !!crumbs.length ? (
    <Space>
      {crumbs.map((crumb, index) => (
        <Fragment key={index}>{crumb} /</Fragment>
      ))}
    </Space>
  ) : null
}

export default Breadcrumbs
