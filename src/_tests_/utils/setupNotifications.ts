import { notification } from 'antd'

import { act } from '@testing-library/react'

export const setupNotifications = () => {
  afterEach(async () => {
    await act(() => {
      notification.destroy()
    })
  })
}
