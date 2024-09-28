import { Flex, Form, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useEffect, useState } from 'react'

import { attachmentsToFiles, renderUploadedFile } from 'modules/attachment/utils'
import { useCreateInfrastructureOrderFormWorks } from 'modules/infrastructures/hooks/useCreateInfrastructureOrderFormWorks'
import { useLazyGetInfrastructureOrderFormWorkTypeCost } from 'modules/infrastructures/hooks/useLazyGetInfrastructureOrderFormWorkTypeCost'
import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { FileResponse } from 'shared/types/file'
import { getFieldsErrors } from 'shared/utils/form'

import ChangeInfrastructureOrderFormTable from '../ChangeInfrastructureOrderFormTable'
import {
  ChangeInfrastructureOrderFormTableProps,
  ChangeInfrastructureOrderFormTableRow,
} from '../ChangeInfrastructureOrderFormTable/types'
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

  const [getInfrastructureOrderFormWorkTypeCost] = useLazyGetInfrastructureOrderFormWorkTypeCost()

  const [createInfrastructureOrderFormWorksMutation] = useCreateInfrastructureOrderFormWorks()

  const onChangeWorkType: ChangeInfrastructureOrderFormTableProps['onChangeWorkType'] =
    useDebounceFn(
      async (record, value) => {
        const currentWorks = form.getFieldValue([id, 'works']) || []
        const index = currentWorks.findIndex(
          (work: ChangeInfrastructureOrderFormTableRow) => work.rowId === record.rowId,
        )

        const infrastructureWorkPath: NamePath = [id, 'works', String(index)]
        const currentInfrastructureWork = currentWorks[index]

        try {
          const infrastructureOrderFormWorkTypeCost = await getInfrastructureOrderFormWorkTypeCost({
            orderForm: id,
            workType: value,
          }).unwrap()

          form.setFieldValue(infrastructureWorkPath, {
            ...currentInfrastructureWork,
            type: infrastructureOrderFormWorkTypeCost.type,
            laborCosts: infrastructureOrderFormWorkTypeCost.type.laborCosts,
            cost: infrastructureOrderFormWorkTypeCost.cost,
          })
        } catch (error) {
          if (isErrorResponse(error)) {
            form.setFieldValue(infrastructureWorkPath, { rowId: currentInfrastructureWork.rowId })
          }
        }
      },
      [id],
      500,
    )

  const onChangeAmount: ChangeInfrastructureOrderFormTableProps['onChangeAmount'] = useDebounceFn(
    async (record, value) => {
      if (!record.type || !value) {
        return
      }

      const currentWorks = form.getFieldValue([id, 'works']) || []
      const index = currentWorks.findIndex(
        (work: ChangeInfrastructureOrderFormTableRow) => work.rowId === record.rowId,
      )

      const infrastructureWorkPath: NamePath = [id, 'works', String(index)]
      const currentInfrastructureWork = currentWorks[index]

      try {
        const createdOrderFormWork = await createInfrastructureOrderFormWorksMutation({
          amount: value,
          infrastructureWorkType: record.type.id,
          orderForm: id,
        }).unwrap()

        form.setFieldValue(infrastructureWorkPath, {
          ...currentInfrastructureWork,
          ...createdOrderFormWork,
        })
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [id],
    500,
  )

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
        onChange={setEditableTableRowKeys}
        infrastructureWorkTypes={infrastructureWorkTypes}
        managerIsCurrentUser={managerIsCurrentUser}
        onChangeWorkType={onChangeWorkType}
        onChangeAmount={onChangeAmount}
      />
    </Space>
  )
}

export default ChangeInfrastructureOrderForm
