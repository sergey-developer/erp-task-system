import { FC } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorBoundary: FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>Страница не найдена</div>
    }
  }

  return <div>Ошибка. Что-то пошло не так</div>
}

export default ErrorBoundary
