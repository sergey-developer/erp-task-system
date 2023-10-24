import { Space } from 'antd'
import { FC, Fragment } from 'react'
import { useMatches, useSearchParams } from 'react-router-dom'

export type BreadCrumbArgs = {
  qs: ReturnType<typeof useSearchParams>[0]
}

const Breadcrumbs: FC = () => {
  const matches = useMatches()
  const [searchParams] = useSearchParams()

  const crumbs = matches
    .filter((match) => {
      const handle = match.handle as any
      return Boolean(handle?.crumb)
    })
    .map((match) => {
      const handle = match.handle as any
      return handle.crumb({ qs: searchParams } as BreadCrumbArgs)
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
