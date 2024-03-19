import { Space } from 'antd'
import { FC, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'

import { BreadcrumbMatch } from 'shared/hooks/useBreadcrumbsMatches'
import { checkLastItem } from 'shared/utils/common'

type BreadcrumbsProps = {
  matches: BreadcrumbMatch[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ matches }) => {
  const [searchParams] = useSearchParams()

  const crumbs = matches.map((match) => match.handle.crumb({ qs: searchParams }))

  return !!crumbs.length ? (
    <Space>
      {crumbs.map((crumb, index, array) => (
        <Fragment key={index}>
          {crumb}
          {index === 0 || !checkLastItem(index, array) ? ' /' : ''}
        </Fragment>
      ))}
    </Space>
  ) : null
}

export default Breadcrumbs
