import MessageType from 'shared/types/MessageType'
import { checkIsIncludeAllNotifType } from 'shared/utils/checkIsIncludeNotifType'
import { isGiftType } from './checkTypeMedia'

export const notificationMapper = message => {
  const { data } = message

  if (checkIsIncludeAllNotifType(data.msg_type)) {
    data.notification = {}

    if (data.msg_type === MessageType.NEW_MESSAGE) {
      data.notification.username = data.payload.users[0].username
      data.notification.photoUrl = data.payload.users[0].pic || data.payload.users[0].profile_pic
      data.notification.duid = data.payload.users[0].duid
      data.notification.message = data.payload.threads[0].message
      data.notification.msg_system_id = data?.payload?.messages[0]?.msg_system_id

      if (isGiftType(data.payload.threads[0].tag)) {
        data.notification.gift = data.payload.threads[0].gift
      }

      return data
    }

    if (data.msg_type === MessageType.QUALITY_SCORE) {
      data.notification.username = data.payload.users[0].username
      data.notification.photoUrl = data.payload.users[0].pic || data.payload.users[0].profile_pic
      data.notification.duid = data.payload.users[0].duid
      data.notification.message = data.payload.activity.text
      return data
    }

    if (data.msg_type === MessageType.USER_ACCOUNT_UPDATED) {
      data.notification.username = data.payload.users[0].username
      data.notification.photoUrl = data.payload.users[0].pic || data.payload.users[0].profile_pic
      data.notification.duid = data.payload.users[0].duid
      data.notification.message = data.payload.activity.text
      data.notification.auth_keys = data.payload.auth_keys
      return data
    }

    if (data.msg_type === MessageType.USER_ACCOUNT_UPDATED) {
      data.notification.auth_keys = data.payload.auth_keys

      return data
    }

    data.notification.username = data.payload.user.username
    data.notification.photoUrl = data.payload.user.pic || data.payload.user.profile_pic
    data.notification.duid = data.payload.user.duid
    data.notification.message = data.payload.activity.text

    return data
  }

  return data
}
