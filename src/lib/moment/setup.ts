import * as moment from 'moment'
import momentDurationFormat from 'moment-duration-format'
import 'moment/locale/ru'

const setup = () => {
  momentDurationFormat(moment)
  moment.locale('ru')
}

export default setup
