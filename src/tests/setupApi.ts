import { api } from 'shared/services/api'
import store from 'state/store'
import { server } from 'tests/mocks/server'

const setupApi = () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    store.dispatch(api.util.resetApiState())
  })

  afterAll(() => server.close())
}

export default setupApi
