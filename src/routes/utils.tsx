import React from 'react';
import { RouteConfig } from './interfaces'
import { RouteObject } from 'react-router-dom'

export function applyRoutesLayout(routesConfig: RouteConfig[]): RouteObject[] {
  return routesConfig.map(({ layout: Layout, element: Element, ...rest}) => {
    if (Layout) {
      return {
        ...rest,
        element: <Layout><Element /></Layout>,
      }
    }
    return  {
      ...rest,
      element: <Element />,
    }
  });
}
