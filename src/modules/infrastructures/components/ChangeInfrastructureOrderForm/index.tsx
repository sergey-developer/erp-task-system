import { Flex, Form, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'

import { attachmentsToFiles, renderUploadedFile } from 'modules/attachment/utils'
import {
  useCreateInfrastructureOrderFormWork,
  useUpdateInfrastructureOrderFormWork,
} from 'modules/infrastructures/hooks'
import { useLazyGetInfrastructureOrderFormWorkTypeCost } from 'modules/infrastructures/hooks/useLazyGetInfrastructureOrderFormWorkTypeCost'
import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { FileResponse } from 'shared/types/file'

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
        tableRows.push({ rowId: work.id, isNew: false, ...work })
      })

      form.setFieldValue([id, 'works'], tableRows)
      setEditableTableRowKeys(editableTableRowKeys)
    }
  }, [form, id, works])

  const [
    getInfrastructureOrderFormWorkTypeCost,
    { isFetching: infrastructureOrderFormWorkTypeCostIsFetching },
  ] = useLazyGetInfrastructureOrderFormWorkTypeCost()

  const [
    createInfrastructureOrderFormWorkMutation,
    { isLoading: createInfrastructureOrderFormWorkIsLoading },
  ] = useCreateInfrastructureOrderFormWork()

  const [
    updateInfrastructureOrderFormWorkMutation,
    { isLoading: updateInfrastructureOrderFormWorkIsLoading },
  ] = useUpdateInfrastructureOrderFormWork()

  const updateOrderFormWork = useCallback(
    async ({
      record,
      amount,
      currentInfrastructureWork,
      infrastructureWorkPath,
    }: {
      record: ChangeInfrastructureOrderFormTableRow
      amount: number
      currentInfrastructureWork: ChangeInfrastructureOrderFormTableRow
      infrastructureWorkPath: NamePath
    }) => {
      if (!record.type) return

      try {
        const updatedOrderFormWork = await updateInfrastructureOrderFormWorkMutation({
          amount,
          infrastructureWorkType: record.type.id,
        }).unwrap()

        const updates: ChangeInfrastructureOrderFormTableRow = {
          ...currentInfrastructureWork,
          ...updatedOrderFormWork,
        }

        form.setFieldValue(infrastructureWorkPath, updates)
      } catch (error) {
        console.error('Update order form work error: ', error)
      }
    },
    [form, updateInfrastructureOrderFormWorkMutation],
  )

  const onChangeWorkType = useDebounceFn<
    ChangeInfrastructureOrderFormTableProps['onChangeWorkType']
  >(
    async (record, value, activeRow) => {
      const currentWorks = form.getFieldValue([id, 'works']) || []
      const infrastructureWorkPath: NamePath = [id, 'works', String(activeRow.rowIndex)]
      const currentInfrastructureWork = currentWorks[activeRow.rowIndex]

      if (currentInfrastructureWork.isNew) {
        try {
          const infrastructureOrderFormWorkTypeCost = await getInfrastructureOrderFormWorkTypeCost({
            orderForm: id,
            workType: value,
          }).unwrap()

          const updates: ChangeInfrastructureOrderFormTableRow = {
            ...currentInfrastructureWork,
            type: infrastructureOrderFormWorkTypeCost.type,
            laborCosts: infrastructureOrderFormWorkTypeCost.type.laborCosts,
            cost: infrastructureOrderFormWorkTypeCost.cost,
          }

          form.setFieldValue(infrastructureWorkPath, updates)
        } catch (error) {
          console.error('Change work type error: ', error)
        }
      } else {
        await updateOrderFormWork({
          record,
          amount: currentInfrastructureWork.amount,
          currentInfrastructureWork,
          infrastructureWorkPath,
        })
      }
    },
    [id, form, getInfrastructureOrderFormWorkTypeCost],
    500,
  )

  const onChangeAmount: ChangeInfrastructureOrderFormTableProps['onChangeAmount'] = useDebounceFn(
    async (record, value, activeRow) => {
      if (!record.type || !value) return

      const currentWorks = form.getFieldValue([id, 'works']) || []
      const infrastructureWorkPath: NamePath = [id, 'works', String(activeRow.rowIndex)]
      const currentInfrastructureWork = currentWorks[activeRow.rowIndex]

      if (currentInfrastructureWork.isNew) {
        try {
          const createdOrderFormWork = await createInfrastructureOrderFormWorkMutation({
            amount: value,
            infrastructureWorkType: record.type.id,
            orderForm: id,
          }).unwrap()

          const updates: ChangeInfrastructureOrderFormTableRow = {
            isNew: false,
            ...currentInfrastructureWork,
            ...createdOrderFormWork,
          }

          form.setFieldValue(infrastructureWorkPath, updates)
        } catch (error) {
          console.error('Change amount error: ', error)
        }
      } else {
        await updateOrderFormWork({
          record,
          amount: currentInfrastructureWork.amount,
          currentInfrastructureWork,
          infrastructureWorkPath,
        })
      }
    },
    [id, form, createInfrastructureOrderFormWorkMutation],
    500,
  )

  return (
    <div data-testid='change-infrastructure-order-form-container'>
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
          infrastructureOrderFormWorkTypeCostIsFetching={
            infrastructureOrderFormWorkTypeCostIsFetching
          }
          onChangeAmount={onChangeAmount}
          createWorkIsLoading={createInfrastructureOrderFormWorkIsLoading}
          updateWorkIsLoading={updateInfrastructureOrderFormWorkIsLoading}
        />
      </Space>
    </div>
  )
}

export default ChangeInfrastructureOrderForm
