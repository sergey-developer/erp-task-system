import moment, { Moment } from 'moment'

const formatDate = (
  date: moment.MomentInput,
  format: string,
): ReturnType<Moment['format']> => {
  return moment(date).format(format)
}

export default formatDate
