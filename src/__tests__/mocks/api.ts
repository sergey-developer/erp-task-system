import axiosMockAdapter from 'axios-mock-adapter'

import httpClient from 'shared/services/api/httpClient'

const api = new axiosMockAdapter(httpClient, { delayResponse: 1000 })

export default api
