import { FormItemProps } from 'antd'

import { getFileFromEvent, getFilesFromEvent } from 'shared/utils/form'

export const fileFormItemProps: Pick<FormItemProps, 'getValueFromEvent' | 'valuePropName'> = {
  valuePropName: 'file',
  getValueFromEvent: getFileFromEvent,
}

export const filesFormItemProps: Pick<FormItemProps, 'getValueFromEvent' | 'valuePropName'> = {
  valuePropName: 'fileList',
  getValueFromEvent: getFilesFromEvent,
}
