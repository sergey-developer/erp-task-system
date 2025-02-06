import { InfrastructureStatusHistoryDTO } from 'features/infrastructures/api/dto'
import InfrastructureStatusHistoryTable from 'features/infrastructures/components/InfrastructureStatusHistoryTable'
import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type InfrastructureStatusHistoryModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'onOk' | 'isLoading'>
> & {
  data: InfrastructureStatusHistoryDTO
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
