import React, { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { publicRoutesConfig } from 'configs/routes'

const PublicApp: FC = () => {
  return <RouterProvider router={createBrowserRouter(publicRoutesConfig)} />
}

export default PublicApp
