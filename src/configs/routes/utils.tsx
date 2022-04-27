import React from 'react'
import { RouteObject } from 'react-router-dom'

import { RouteConfig } from './interfaces'

export function applyRoutesLayout(routesConfig: RouteConfig[]): RouteObject[] {
  return routesConfig.map(({ layout: Layout, element: Element, ...route }) => ({
    ...route,
    element: Layout ? (
      <Layout>
        <Element />
      </Layout>
    ) : (
      <Element />
    ),
  }))
}
