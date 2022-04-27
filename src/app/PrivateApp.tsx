import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout/PrivateLayout'

const TaskListPage = React.lazy(
  () => import('modules/tasks/task-list/components/TaskListPage'),
)

const PrivateApp: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TaskListPage />} />

        <Route path='requests' element={<TaskListPage />} />

        <Route path='*' element={<div>Страница не найдена</div>} />
      </Route>
    </Routes>
  )
}

export default PrivateApp
