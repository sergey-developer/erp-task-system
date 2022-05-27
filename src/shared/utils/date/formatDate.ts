import moment, { Moment } from 'moment'

const formatDate = (
  date: moment.MomentInput,
  format: string,
): ReturnType<Moment['format']> => {
  if (!date) return ''
  const momentDate = moment(date)
  return momentDate.isValid() ? momentDate.format(format) : 'Некорректная дата'
}

export default formatDate
