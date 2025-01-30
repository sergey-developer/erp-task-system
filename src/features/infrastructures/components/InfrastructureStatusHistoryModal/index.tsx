import { FC } from 'react'

import InfrastructureStatusHistoryTable from 'features/infrastructures/components/InfrastructureStatusHistoryTable'
import { InfrastructureStatusHistoryModel } from 'features/infrastructures/models'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type InfrastructureStatusHistoryModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'onOk' | 'isLoading'>
> & {
  data: InfrastructureStatusHistoryModel
}

const InfrastructureStatusHistoryModal: FC<InfrastructureStatusHistoryModalProps> = ({
  data,
  isLoading,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='infrastructure-status-history-modal'
      title='История статусов'
      okText='Закрыть'
      width='50%'
    >
      <InfrastructureStatusHistoryTable loading={isLoading} dataSource={data} />
    </BaseModal>
  )
}

export default InfrastructureStatusHistoryModal
