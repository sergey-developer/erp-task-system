import { act, screen } from '@testing-library/react'
import { notification } from 'antd'

const setupNotifications = () => {
  afterEach(async () => {
    await act(() => {
      notification.destroy()
    })
  })
}

const findNotification = (text: string) => screen.findByText(text)

const queryNotification = (text: string) => screen.queryByText(text)

const utils = {
  setupNotifications,
  findNotification,
  queryNotification,
}

export default utils
