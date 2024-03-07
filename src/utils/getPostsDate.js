import { format, formatDistanceStrict, isSameMinute, differenceInWeeks, differenceInMonths } from 'date-fns'

const getPostsDate = date => {
  const today = new Date()
  const monthDiff = differenceInMonths(new Date(), date)
  const weekDiff = differenceInWeeks(new Date(), date)

  const formatDistanceLocale = {
    xSeconds: '{{count}}s ago',
    xMinutes: '{{count}}m ago',
    xHours: '{{count}}h ago',
    xDays: '{{count}}d ago',
    xYears: '{{count}}y ago',
  }

  const shortEnLocale = {
    formatDistance: (token, count) => {
      return formatDistanceLocale[token].replace('{{count}}', count)
    },
  }

  return isSameMinute(date, today)
    ? 'now'
    : weekDiff < 1
    ? formatDistanceStrict(date, today, { addSuffix: true, locale: shortEnLocale })
    : monthDiff < 1
    ? `${weekDiff}w ago`
    : monthDiff >= 1 && monthDiff <= 6
    ? format(date, 'MMM d')
    : '6mon+'
}

export default getPostsDate
