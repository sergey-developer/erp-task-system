import { showErrorNotification } from './showErrorNotification'

export const showMultipleErrorNotification = (errors: Array<string>): void => {
  errors.forEach((error) => {
    showErrorNotification(error)
  })
}
