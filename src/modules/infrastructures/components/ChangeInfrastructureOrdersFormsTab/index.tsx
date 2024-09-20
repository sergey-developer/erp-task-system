import { Collapse, Form, Typography } from 'antd'
import { CollapseProps } from 'rc-collapse/es/interface'
import { UploadRequestOption } from 'rc-upload/es/interface'
import { FC, useCallback, useMemo } from 'react'

import { useDeleteAttachment } from 'modules/attachment/hooks'
import { useIdBelongAuthUser } from 'modules/auth/hooks'
import { useGetInfrastructureOrdersForms } from 'modules/infrastructures/hooks'
import { InfrastructureModel } from 'modules/infrastructures/models'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'

import { useCreateInfrastructureOrderFormAttachment } from '../../hooks/useCreateInfrastructureOrderFormAttachment'
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

  const [createInfrastructureOrderFormAttachment] = useCreateInfrastructureOrderFormAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const onUploadFile = useCallback(
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
            managerIsCurrentUser={managerIsCurrentUser}
            canUploadFile={managerIsCurrentUser}
            onUploadFile={onUploadFile(orderForm.id)}
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
        <LoadingArea isLoading={infrastructureOrdersFormsIsFetching}>
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
