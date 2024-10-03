import { useBoolean } from 'ahooks'
import { Flex, Form, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'

import { attachmentsToFiles, renderUploadedFile } from 'modules/attachment/utils'
import { deleteInfrastructureOrdersFormsWorkErrMsg } from 'modules/infrastructures/constants'
import { useDeleteInfrastructureOrdersFormsWork } from 'modules/infrastructures/hooks/useDeleteInfrastructureOrdersFormsWork'
import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { FileResponse } from 'shared/types/file'
import { showErrorNotification } from 'shared/utils/notifications'

import ChangeInfrastructureOrderFormTable from '../ChangeInfrastructureOrderFormTable'
import {
  ActiveChangeInfrastructureOrderFormTableRow,
  ChangeInfrastructureOrderFormTableRow,
} from '../ChangeInfrastructureOrderFormTable/types'
import { ChangeInfrastructureOrdersFormsTabFormFields } from '../ChangeInfrastructureOrdersFormsTab/types'

const ConfirmDeleteInfrastructureWorkTypeModal = React.lazy(
  () => import('modules/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal'),
)

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

  const [
    activeChangeInfrastructureOrderFormTableRow,
    setActiveChangeInfrastructureOrderFormTableRow,
  ] = useState<ActiveChangeInfrastructureOrderFormTableRow>()

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

  const [
    deleteInfrastructureOrdersFormsWorkMutation,
    { isLoading: deleteInfrastructureOrdersFormsWorkIsLoading },
  ] = useDeleteInfrastructureOrdersFormsWork()

  // delete work type
  const [
    confirmDeleteInfrastructureWorkTypeModalOpened,
    {
      setTrue: openConfirmDeleteInfrastructureWorkTypeModal,
      setFalse: closeConfirmDeleteInfrastructureWorkTypeModal,
    },
  ] = useBoolean(false)

  const handleOpenConfirmDeleteInfrastructureWorkTypeModal = useDebounceFn(
    (row: ActiveChangeInfrastructureOrderFormTableRow) => {
      setActiveChangeInfrastructureOrderFormTableRow(row)
      openConfirmDeleteInfrastructureWorkTypeModal()
    },
  )

  const handleCloseConfirmDeleteInfrastructureWorkTypeModal = useDebounceFn(() => {
    setActiveChangeInfrastructureOrderFormTableRow(undefined)
    closeConfirmDeleteInfrastructureWorkTypeModal()
  })

  const onDeleteInfrastructureWorkType = useCallback(async () => {
    if (!activeChangeInfrastructureOrderFormTableRow) return

    try {
      if (activeChangeInfrastructureOrderFormTableRow.id) {
        await deleteInfrastructureOrdersFormsWorkMutation({
          infrastructureWorkId: activeChangeInfrastructureOrderFormTableRow.id!,
        })
      }

      const tableDataSource: ChangeInfrastructureOrderFormTableRow[] = form.getFieldValue([
        id,
        'works',
      ])

      form.setFieldValue(
        [id, 'works'],
        tableDataSource.filter(
          (_, index) => index !== activeChangeInfrastructureOrderFormTableRow.rowIndex,
        ),
      )
    } catch (error) {
      showErrorNotification(deleteInfrastructureOrdersFormsWorkErrMsg)
      console.error('Ошибка удаления работ по изменению инфраструктуры: ', error)
    }

    setActiveChangeInfrastructureOrderFormTableRow(undefined)
    closeConfirmDeleteInfrastructureWorkTypeModal()
  }, [
    activeChangeInfrastructureOrderFormTableRow,
    form,
    deleteInfrastructureOrdersFormsWorkMutation,
    closeConfirmDeleteInfrastructureWorkTypeModal,
    id,
  ])

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
          onClickDeleteInfrastructureWorkType={handleOpenConfirmDeleteInfrastructureWorkTypeModal}
        />

        {confirmDeleteInfrastructureWorkTypeModalOpened &&
          activeChangeInfrastructureOrderFormTableRow && (
            <React.Suspense
              fallback={
                <ModalFallback
                  open
                  onCancel={handleCloseConfirmDeleteInfrastructureWorkTypeModal}
                  tip='Загрузка модалки удаления работ'
                />
              }
            >
              <ConfirmDeleteInfrastructureWorkTypeModal
                open={confirmDeleteInfrastructureWorkTypeModalOpened}
                onCancel={handleCloseConfirmDeleteInfrastructureWorkTypeModal}
                onOk={onDeleteInfrastructureWorkType}
                confirmLoading={deleteInfrastructureOrdersFormsWorkIsLoading}
              />
            </React.Suspense>
          )}
      </Space>
    </div>
  )
}

export default ChangeInfrastructureOrderForm
