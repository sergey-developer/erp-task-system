import axios from 'axios'

import { config } from 'configs/api'

const api = axios.create(config)

export default api
