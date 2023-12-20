import { useCallback, useEffect } from 'react'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { getEquipmentListTemplateErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentListTemplateQueryArgs,
  GetEquipmentListTemplateSuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetEquipmentListTemplateQuery } from 'modules/warehouse/services/equipmentApi.service'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { isErrorResponse } from 'shared/services/baseApi'
import { base64ToArrayBuffer, clickDownloadLink } from 'shared/utils/common'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentListTemplateResult = [
  () => Promise<void>,
  CustomUseQueryStateResult<
    GetEquipmentListTemplateQueryArgs,
    GetEquipmentListTemplateSuccessResponse
  >,
]

export const useGetEquipmentListTemplate = (): UseGetEquipmentListTemplateResult => {
  const [trigger, state] = useLazyGetEquipmentListTemplateQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentListTemplateErrorMsg)
    }
  }, [state.error])

  const handler = useCallback(async () => {
    const { data } = await trigger()

    if (data) {
      clickDownloadLink(base64ToArrayBuffer(data), MimetypeEnum.Xls, 'Шаблон загрузки оборудования')
    }
  }, [trigger])

  return [handler, state]
}
