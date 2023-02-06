import { notification } from 'antd'

import { act, screen } from '@testing-library/react'

export const setupNotifications = () => {
  afterEach(async () => {
    await act(() => {
      notification.destroy()
    })
  })
}

export const findNotification = (text: string) => screen.findByText(text)

export const queryNotification = (text: string) => screen.queryByText(text)
