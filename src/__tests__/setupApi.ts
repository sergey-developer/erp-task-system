import api from '__tests__/mocks/api'
import { apiService } from 'shared/services/api'
import store from 'state/store'

const setupApi = () => {
  afterEach(() => {
    api.reset()
    store.dispatch(apiService.util.resetApiState())
  })
}

export default setupApi
