import axios from 'axios'

import { httpClientConfig } from 'configs/httpClient'

const httpClient = axios.create(httpClientConfig)

export default httpClient
