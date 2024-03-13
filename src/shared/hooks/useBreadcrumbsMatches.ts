import { UIMatch, useMatches, useSearchParams } from 'react-router-dom'

export type BreadCrumbData = {
  qs: ReturnType<typeof useSearchParams>[0]
}

export type BreadcrumbMatch = UIMatch<unknown, { crumb: (data?: BreadCrumbData) => JSX.Element }>

export const useBreadcrumbsMatches = (): BreadcrumbMatch[] => {
  const matches = useMatches()

  return matches.filter((match) => {
    const handle = match.handle as any
    return Boolean(handle?.crumb)
  }) as BreadcrumbMatch[]
}
