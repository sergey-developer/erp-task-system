import { FormItemProps } from 'antd'

import { getFilesFromEvent } from 'shared/utils/form'

export const filesFormItemProps: Pick<FormItemProps, 'getValueFromEvent' | 'valuePropName'> = {
  valuePropName: 'fileList',
  getValueFromEvent: getFilesFromEvent,
}
