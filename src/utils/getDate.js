import { toDate } from 'date-fns-tz'

const getDate = date => toDate(date, { timeZone: 'America/New_York' })

export default getDate
