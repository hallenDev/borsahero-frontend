import isToday from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'
import { format } from 'date-fns'

export const useDateTime = () => {
  return {
    format: (date = new Date(), pattern) => {
      return format(parseISO(date), pattern)
    },
    getFormatDate: date => {
      let d = date ? parseISO(date) : new Date()

      return isToday(d)
        ? 'Today, ' + format(d, 'HH:mm')
        : format(d, 'd MMMM yyyy')
    },

    getFormatSeparator: date => {
      let d = date ? parseISO(date) : new Date()

      return isToday(d) ? 'Today' : format(d, 'MM/dd/yyyy')
    },
    getInboxTime: date => {
      let d = date ? date : new Date()

      return isToday(d) ? format(d, 'hh:mm aaa') : format(d, 'MM/dd/yy')
    },
    getMessageTime: date => {
      return format(parseISO(date), 'hh:mm aaa')
    },

    getFeedbackTime: date => {
      let d = date ? parseISO(date) : new Date()

      return isToday(d) ? 'Today' : format(d, 'MMM dd, yyyy')
    },
    getPostTime: date => {
      let d = date ? parseISO(date) : new Date()

      return isToday(d) ? 'Today' : format(d, 'MMMM dd, yyyy')
    },
    getPublishDate: date => {
      let d = date ? parseISO(date) : new Date()

      return isToday(d) ? 'Today' : format(d, 'MM/dd/yyyy')
    },
    getSubscriptionDate: timestamp => {
      let d = new Date(timestamp)
      return isToday(d) ? 'Today' : format(d, 'MMMM dd, yyyy')
    },
  }
}

export default useDateTime
