import { useBoolean } from 'ahooks'
import { Button, Collapse, Form, Typography, UploadProps } from 'antd'
import { CollapseProps } from 'rc-collapse/es/interface'
import { UploadRequestOption } from 'rc-upload/es/interface'
import React, { FC, lazy, useCallback, useMemo } from 'react'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useIdBelongAuthUser } from 'modules/auth/hooks'
import ChangeInfrastructureOrderForm from 'modules/infrastructures/components/ChangeInfrastructureOrderForm'
import { CreateInfrastructureOrderModalProps } from 'modules/infrastructures/components/CreateInfrastructureOrderModal/types'
import {
  useCreateInfrastructureOrderForm,
  useGetInfrastructureOrdersForms,
} from 'modules/infrastructures/hooks'
import { useCreateInfrastructureOrderFormAttachment } from 'modules/infrastructures/hooks/useCreateInfrastructureOrderFormAttachment'
import { InfrastructureModel } from 'modules/infrastructures/models'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'

import { useGetInfrastructureWorkTypes } from 'shared/hooks/catalogs/infrastructureWorkTypes'
import { useGetUrgencyRateTypes } from 'shared/hooks/catalogs/urgencyRateTypes'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'

import { SpaceStyled } from './styles'
import { ChangeInfrastructureOrdersFormsTabFormFields } from './types'

const CreateInfrastructureOrderModal = lazy(
  () => import('modules/infrastructures/components/CreateInfrastructureOrderModal'),
)

const { Text } = Typography

export type ChangeInfrastructureOrdersFormsTabProps = {
  infrastructureId: IdType
} & Pick<InfrastructureModel, 'manager'>

const ChangeInfrastructureOrdersFormsTab: FC<ChangeInfrastructureOrdersFormsTabProps> = ({
  infrastructureId,
  manager,
}) => {
  const [form] = Form.useForm<ChangeInfrastructureOrdersFormsTabFormFields>()
  const managerIsCurrentUser = useIdBelongAuthUser(manager?.id)

  // create order form
  const [createOrderModalOpened, { toggle: toggleCreateOrderModal }] = useBoolean(false)

  const debouncedToggleCreateOrderModal = useDebounceFn(toggleCreateOrderModal)

  const { data: urgencyRateTypes = [], isFetching: urgencyRateTypesIsFetching } =
    useGetUrgencyRateTypes(undefined, { skip: !createOrderModalOpened })
  // create order form

  const {
    currentData: infrastructureOrdersForms = [],
    isFetching: infrastructureOrdersFormsIsFetching,
  } = useGetInfrastructureOrdersForms({ infrastructureProject: infrastructureId })

  const [
    createInfrastructureOrderFormMutation,
    { isLoading: createInfrastructureOrderFormIsLoading },
  ] = useCreateInfrastructureOrderForm()

  const {
    currentData: infrastructureWorkTypes = [],
    isFetching: infrastructureWorkTypesIsFetching,
  } = useGetInfrastructureWorkTypes(undefined, { skip: !managerIsCurrentUser })

  const [createInfrastructureOrderFormAttachment] = useCreateInfrastructureOrderFormAttachment()
  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const createOrderFormFile = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.OrderFormFile }, options)
    },
    [createAttachment],
  )

  const onCreateInfrastructureOrder = useCallback<CreateInfrastructureOrderModalProps['onSubmit']>(
    async (values, form) => {
      try {
        await createInfrastructureOrderFormMutation({
          ...values,
          attachments: values.attachments?.length
            ? extractIdsFromFilesResponse(values.attachments)
            : undefined,
          infrastructureProject: infrastructureId,
        }).unwrap()

        toggleCreateOrderModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            form.setFields(getFieldsErrors(error.data))
          }
        } else {
          console.error('Create infrastructure order error: ', error)
        }
      }
    },
    [createInfrastructureOrderFormMutation, infrastructureId, toggleCreateOrderModal],
  )

  const onUploadInfrastructureOrderFormFile = useCallback(
    (orderFormId: IdType) => async (options: UploadRequestOption) => {
      await createInfrastructureOrderFormAttachment({ orderFormId }, options)
    },
    [createInfrastructureOrderFormAttachment],
  )

  const ordersFormsItems: CollapseProps['items'] = useMemo(
    () =>
      infrastructureOrdersForms.map((orderForm) => ({
        key: orderForm.id,
        label: <Text strong>Бланк-заказ №{orderForm.number}</Text>,
        children: (
          <ChangeInfrastructureOrderForm
            data={orderForm}
            infrastructureWorkTypes={infrastructureWorkTypes}
            managerIsCurrentUser={managerIsCurrentUser}
            canUploadFile={managerIsCurrentUser}
            onUploadFile={onUploadInfrastructureOrderFormFile(orderForm.id)}
            canDeleteFile={managerIsCurrentUser}
            isDeleting={deleteAttachmentIsLoading}
            onDeleteFile={deleteAttachment}
          />
        ),
      })),
    [
      deleteAttachment,
      deleteAttachmentIsLoading,
      infrastructureOrdersForms,
      infrastructureWorkTypes,
      managerIsCurrentUser,
      onUploadInfrastructureOrderFormFile,
    ],
  )

  const ordersFormsItemsActiveKeys: CollapseProps['defaultActiveKey'] = useMemo(
    () => infrastructureOrdersForms.map((orderForm) => orderForm.id),
    [infrastructureOrdersForms],
  )

  return (
    <SpaceStyled
      $block
      direction='vertical'
      size='large'
      data-testid='change-infrastructure-order-form-tab'
    >
      {managerIsCurrentUser && (
        <Button onClick={debouncedToggleCreateOrderModal}>Создать бланк-заказ</Button>
      )}

      <Form form={form}>
        <LoadingArea
          isLoading={infrastructureOrdersFormsIsFetching || infrastructureWorkTypesIsFetching}
        >
          {!!infrastructureOrdersForms.length ? (
            <Collapse
              ghost
              defaultActiveKey={ordersFormsItemsActiveKeys}
              items={ordersFormsItems}
            />
          ) : (
            <Text>Нет бланк заказов</Text>
          )}
        </LoadingArea>
      </Form>

      {createOrderModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleCreateOrderModal} />}
        >
          <CreateInfrastructureOrderModal
            open={createOrderModalOpened}
            onCancel={debouncedToggleCreateOrderModal}
            isLoading={createInfrastructureOrderFormIsLoading}
            urgencyRateTypes={urgencyRateTypes}
            urgencyRateTypesIsLoading={urgencyRateTypesIsFetching}
            onUploadFile={createOrderFormFile}
            fileIsUploading={createAttachmentIsLoading}
            onDeleteFile={deleteAttachment}
            fileIsDeleting={deleteAttachmentIsLoading}
            onSubmit={onCreateInfrastructureOrder}
          />
        </React.Suspense>
      )}
    </SpaceStyled>
  )
}

export default ChangeInfrastructureOrdersFormsTab
