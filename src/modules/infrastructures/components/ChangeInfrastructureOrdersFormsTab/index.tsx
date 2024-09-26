import { Collapse, Form, Typography, UploadProps } from 'antd'
import { CollapseProps } from 'rc-collapse/es/interface'
import { FC, useCallback, useMemo } from 'react'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useIdBelongAuthUser } from 'modules/auth/hooks'
import { useGetInfrastructureOrdersForms } from 'modules/infrastructures/hooks'
import { InfrastructureModel } from 'modules/infrastructures/models'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { useGetInfrastructureWorkTypes } from 'shared/hooks/catalogs/infrastructureWorkTypes/index'
import { IdType } from 'shared/types/common'

import ChangeInfrastructureOrderForm from '../ChangeInfrastructureOrderForm'
import { ChangeInfrastructureOrdersFormsTabFormFields } from './types'

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

  const {
    currentData: infrastructureOrdersForms = [],
    isFetching: infrastructureOrdersFormsIsFetching,
  } = useGetInfrastructureOrdersForms({ infrastructureProject: infrastructureId })

  const {
    currentData: infrastructureWorkTypes = [],
    isFetching: infrastructureWorkTypesIsFetching,
  } = useGetInfrastructureWorkTypes(undefined, { skip: !managerIsCurrentUser })

  const [createAttachment] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const onUploadFile = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.OrderFormFile }, options)
    },
    [createAttachment],
  )

  const ordersFormsItems: CollapseProps['items'] = useMemo(
    () =>
      infrastructureOrdersForms.map((orderForm) => ({
        key: orderForm.id,
        label: <Text strong>Бланк-заказ №{orderForm.number}</Text>,
        children: (
          <ChangeInfrastructureOrderForm
            data={orderForm}
            managerIsCurrentUser={managerIsCurrentUser}
            canUploadFile={managerIsCurrentUser}
            onUploadFile={onUploadFile}
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
      managerIsCurrentUser,
      onUploadFile,
    ],
  )

  const ordersFormsItemsActiveKeys: CollapseProps['defaultActiveKey'] = useMemo(
    () => infrastructureOrdersForms.map((orderForm) => orderForm.id),
    [infrastructureOrdersForms],
  )

  return (
    <Space
      $block
      direction='vertical'
      size='large'
      data-testid='change-infrastructure-order-form-tab'
    >
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
    </Space>
  )
}

export default ChangeInfrastructureOrdersFormsTab
