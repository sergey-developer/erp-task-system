import { getEquipmentListTemplateErrMsg } from 'features/warehouse/constants/equipment'
import {
  GetEquipmentListTemplateQueryArgs,
  GetEquipmentListTemplateSuccessResponse,
} from 'features/warehouse/models'
import { useLazyGetEquipmentListTemplateQuery } from 'features/warehouse/services/equipmentApi.service'
import { useCallback, useEffect } from 'react'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { base64ToBytes } from 'shared/utils/common'
import { downloadFile } from 'shared/utils/file'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetEquipmentListTemplateResult = [
  () => Promise<void>,
  CustomUseQueryStateResult<
    GetEquipmentListTemplateQueryArgs,
    GetEquipmentListTemplateSuccessResponse
  >,
]

export const useLazyGetEquipmentsTemplate = (): UseLazyGetEquipmentListTemplateResult => {
  const [trigger, state] = useLazyGetEquipmentListTemplateQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentListTemplateErrMsg)
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
