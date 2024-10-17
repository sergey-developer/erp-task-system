import { AxiosResponseHeaders } from 'axios'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'

export const extractFileNameFromHeaders = (
  headers: AxiosResponseHeaders,
  defaultFilename: string = DEFAULT_FILE_NAME,
): string =>
  decodeURIComponent(headers['content-disposition']?.split('filename=')[1] || defaultFilename)
