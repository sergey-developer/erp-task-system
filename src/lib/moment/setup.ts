import momentDurationFormat from 'moment-duration-format'
import * as moment from 'moment-timezone'
import 'moment/locale/ru'

const setup = () => {
  momentDurationFormat(moment)
  moment.locale('ru')
}

export default setup
