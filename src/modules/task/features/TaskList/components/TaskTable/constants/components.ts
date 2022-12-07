import { TableComponents } from 'rc-table/lib/interface'

import { TaskTableListItem } from '../interfaces'
import ResizeableTitle from '../ResizeableTitle'

const components: TableComponents<TaskTableListItem> = {
  header: {
    cell: ResizeableTitle,
  },
}

export default components
