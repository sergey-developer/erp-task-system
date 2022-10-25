import { notification } from 'antd'

export const setupNotifications = () => {
  afterEach(() => {
    notification.destroy()
  })
}
