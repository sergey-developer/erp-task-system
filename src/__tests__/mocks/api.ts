import { setupServer } from 'msw/node'

export const API_RESPONSE_DELAY = 800

const api = setupServer()

export default api
