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
  const notifications = await screen.findAllByRole('alert')
  const notification = notifications.find((ntf) => Boolean(within(ntf).queryByText(text)))

  if (notification) {
    return notification
  } else {
    throw new Error(`Notification with text "${text}" was not found`)
  }
}

const queryNotification = (text: string) => screen.queryByText(text)

const utils = {
  setupNotifications,
  findNotification,
  queryNotification,
}

export default utils
