import api from '__tests__/mocks/api'
import { apiService } from 'shared/services/api'
import store from 'state/store'

const setupApi = () => {
  beforeAll(() => {
    api.listen()
  })

  afterEach(() => {
    api.resetHandlers()
    store.dispatch(apiService.util.resetApiState())
  })

  afterAll(() => {
    api.close()
  })
}

export default setupApi
