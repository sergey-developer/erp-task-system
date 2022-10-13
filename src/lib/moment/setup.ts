import 'moment/locale/ru'

import * as moment from 'moment'
import momentDurationFormat from 'moment-duration-format'

const setup = () => {
  momentDurationFormat(moment)
  moment.locale('ru')
}

export default setup
