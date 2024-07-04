import { Flex, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import React, { FC } from 'react'

import { attachmentsToFiles, renderUploadedFile } from 'modules/attachment/utils'
import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import UploadButton from 'components/Buttons/UploadButton'
import Space from 'components/Space'

import { FileResponse } from 'shared/types/file'

export type ChangeInfrastructureOrderFormProps = {
  data: InfrastructureOrderFormListItemModel

  canUploadFile: boolean
  onUploadFile?: NonNullable<UploadProps['customRequest']>

  canDeleteFile: boolean
  isDeleting: boolean
  onDeleteFile?: NonNullable<UploadProps<FileResponse>['onRemove']>
}

const ChangeInfrastructureOrderForm: FC<ChangeInfrastructureOrderFormProps> = ({
  data,

  canUploadFile,
  onUploadFile,

  canDeleteFile,
  isDeleting,
  onDeleteFile,
}) => {
  const { urgencyRateType, attachments } = data

  const defaultFiles: UploadFile<FileResponse>[] = attachmentsToFiles(attachments ?? [])

  return (
    <Space $block direction='vertical' size='middle'>
      <Flex vertical>
        <ReadonlyField
          rowProps={{ gutter: 8 }}
          leftColProps={{ span: undefined }}
          rightColProps={{ span: undefined }}
          label='Тариф:'
          value={urgencyRateType.title}
        />
      </Flex>

      <Upload
        listType='picture'
        multiple
        disabled={isDeleting}
        customRequest={canUploadFile ? onUploadFile : undefined}
        onRemove={canDeleteFile ? onDeleteFile : undefined}
        defaultFileList={defaultFiles}
        itemRender={renderUploadedFile({ canDelete: !isDeleting, showDelete: canDeleteFile })}
      >
        {canUploadFile && <UploadButton label='Добавить файлы' />}
      </Upload>
    </Space>
  )
}

export default ChangeInfrastructureOrderForm
