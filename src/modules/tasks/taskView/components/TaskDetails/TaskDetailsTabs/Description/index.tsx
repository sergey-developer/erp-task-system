import { Typography } from 'antd'
import React, { FC } from 'react'

import OpenableText from 'components/OpenableText'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'

const { Title } = Typography

type DescriptionProps = Pick<TaskDetailsModel, 'description'> & {
  title: string
}

const Description: FC<DescriptionProps> = ({ title, description }) => {
  return (
    <>
      <Title level={5}>{title}</Title>

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
