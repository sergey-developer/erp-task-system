import { act, screen, within } from '@testing-library/react'
import { notification } from 'antd'

const setupNotifications = () => {
  afterEach(async () => {
    await act(() => {
      notification.destroy()
    })
  })
}

const findNotification = async (text: string) => {
  const notification = await screen.findByRole('alert')
  return within(notification).getByText(text)
}

const queryNotification = (text: string) => screen.queryByText(text)

const utils = {
  setupNotifications,
  findNotification,
  queryNotification,
}

export default utils
