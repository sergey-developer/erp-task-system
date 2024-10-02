import { Flex, Form, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import React, { FC, Key, useEffect, useState } from 'react'

import { attachmentsToFiles, renderUploadedFile } from 'modules/attachment/utils'
import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import Space from 'components/Space'

import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { FileResponse } from 'shared/types/file'

import ChangeInfrastructureOrderFormTable from '../ChangeInfrastructureOrderFormTable'
import { ChangeInfrastructureOrderFormTableRow } from '../ChangeInfrastructureOrderFormTable/types'
import { ChangeInfrastructureOrdersFormsTabFormFields } from '../ChangeInfrastructureOrdersFormsTab/types'

export type ChangeInfrastructureOrderFormProps = {
  data: InfrastructureOrderFormListItemModel
  infrastructureWorkTypes: InfrastructureWorkTypesCatalogModel
  managerIsCurrentUser: boolean

  canUploadFile: boolean
  onUploadFile?: NonNullable<UploadProps['customRequest']>

  canDeleteFile: boolean
  isDeleting: boolean
  onDeleteFile?: NonNullable<UploadProps<FileResponse>['onRemove']>
}

const ChangeInfrastructureOrderForm: FC<ChangeInfrastructureOrderFormProps> = ({
  data,
  infrastructureWorkTypes,
  managerIsCurrentUser,

  canUploadFile,
  onUploadFile,

  canDeleteFile,
  isDeleting,
  onDeleteFile,
}) => {
  const { urgencyRateType, attachments, works, id } = data
  const defaultFiles: UploadFile<FileResponse>[] = attachmentsToFiles(attachments ?? [])

  const form = Form.useFormInstance<ChangeInfrastructureOrdersFormsTabFormFields>()

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  useEffect(() => {
    if (works.length) {
      const tableRows: ChangeInfrastructureOrderFormTableRow[] = []
      const editableTableRowKeys: Key[] = []

      works.forEach((work) => {
        editableTableRowKeys.push(work.id)
        tableRows.push({ rowId: work.id, ...work })
      })

      form.setFieldValue([id, 'works'], tableRows)
      setEditableTableRowKeys(editableTableRowKeys)
    }
  }, [form, id, works])

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
        {/*{canUploadFile && <UploadButton label='Добавить файлы' />}*/}
      </Upload>

      <ChangeInfrastructureOrderFormTable
        name={[id, 'works']}
        editableKeys={editableTableRowKeys}
        infrastructureWorkTypes={infrastructureWorkTypes}
        managerIsCurrentUser={managerIsCurrentUser}
      />
    </Space>
  )
}

export default ChangeInfrastructureOrderForm
