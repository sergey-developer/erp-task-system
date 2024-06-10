import { AxiosResponseHeaders } from 'axios'

export const extractFileNameFromHeaders = (headers: AxiosResponseHeaders): string =>
  decodeURIComponent(headers['content-disposition']?.split('filename=')[1] || 'filename')
