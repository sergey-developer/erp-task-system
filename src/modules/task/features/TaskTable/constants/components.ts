import { TableComponents } from 'rc-table/lib/interface'

import ResizeableTitle from '../ResizeableTitle'
import { TaskTableListItem } from '../interfaces'

const components: TableComponents<TaskTableListItem> = {
  header: {
    cell: ResizeableTitle,
  },
}

export default components
