import { setupServer } from 'msw/node'

export const API_RESPONSE_DELAY = 300

const api = setupServer()

export default api
