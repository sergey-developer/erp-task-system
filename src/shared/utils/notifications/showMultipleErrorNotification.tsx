import showErrorNotification from './showErrorNotification'

const showMultipleErrorNotification = (errors: Array<string>): void => {
  errors.forEach((error) => {
    showErrorNotification(error)
  })
}

export default showMultipleErrorNotification
