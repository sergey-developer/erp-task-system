import { Typography } from 'antd'
import React, { FC } from 'react'

import OpenableText from 'components/OpenableText'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'

const { Title } = Typography

type DescriptionProps = Pick<TaskDetailsModel, 'description'>

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <>
      <Title level={5}>Описание</Title>

      {description && (
        <OpenableText
          className='margin-b-15'
          text={description}
          modalTitle='Описание'
        />
      )}
    </>
  )
}

export default Description
