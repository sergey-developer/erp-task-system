import { getEquipmentsTemplateErrMsg } from 'features/equipments/api/constants'
import { useLazyGetEquipmentsTemplateQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useCallback, useEffect } from 'react'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { base64ToBytes } from 'shared/utils/common'
import { downloadFile } from 'shared/utils/file'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentsTemplateRequest, GetEquipmentsTemplateResponse } from '../api/schemas'

type UseLazyGetEquipmentListTemplateResult = [
  () => Promise<void>,
  CustomUseQueryStateResult<GetEquipmentsTemplateRequest, GetEquipmentsTemplateResponse>,
]

export const useLazyGetEquipmentsTemplate = (): UseLazyGetEquipmentListTemplateResult => {
  const [trigger, state] = useLazyGetEquipmentsTemplateQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentsTemplateErrMsg)
    }
  }, [state.error])

  const handler = useCallback(async () => {
    const { data } = await trigger()

    if (data) {
      downloadFile(base64ToBytes(data), MimetypeEnum.Xls, 'Шаблон загрузки оборудования')
    }
  }, [trigger])

  return [handler, state]
}
