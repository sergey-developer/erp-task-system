import api from '__tests/mocks/api'
import { apiService } from 'shared/services/api'
import store from 'state/store'

const setupApiTests = () => {
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

export default setupApiTests
