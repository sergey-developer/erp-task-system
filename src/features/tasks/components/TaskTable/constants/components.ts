import { TableComponents } from 'rc-table/es/interface'

import ResizeableTitle from '../ResizeableTitle'
import { TaskTableItem } from '../types'

const components: TableComponents<TaskTableItem> = {
  header: {
    cell: ResizeableTitle,
  },
}

export default components
