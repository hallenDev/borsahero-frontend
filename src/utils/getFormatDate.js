import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

export const getFormatDate = unixtime => {
  return format(
    unixtime * 1000,
    isToday(unixtime * 1000) ? 'HH:mm' : 'd MMMM yyyy, HH:mm',
  )
}

export const getFormatSeparator = unixtime => {
  return isToday(unixtime * 1000)
    ? 'Today'
    : format(unixtime * 1000, 'd MMMM yyyy')
}
