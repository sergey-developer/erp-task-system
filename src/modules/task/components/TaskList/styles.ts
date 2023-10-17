import { Avatar, List } from 'antd'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'

import { TaskTypeEnum } from 'modules/task/constants/task'

export const ListStyled: typeof List = styled(List)`
  height: 900px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.white};

  & .ant-list-item.list-item-selected {
    background-color: ${({ theme }) => theme.colors.chineseWhite};
  }
`

export const AvatarStyled = styled(Avatar)<{
  $type: TaskTypeEnum
}>`
  ${({ theme, $type }) =>
    `background-color: ${
      isEqual($type, TaskTypeEnum.Incident)
        ? theme.colors.fireOpal
        : isEqual($type, TaskTypeEnum.IncidentTask)
        ? theme.colors.darkTangerine
        : isEqual($type, TaskTypeEnum.Request)
        ? theme.colors.unitedNationsBlue
        : isEqual($type, TaskTypeEnum.RequestTask)
        ? theme.colors.darkTangerine
        : ''
    };`}
`
