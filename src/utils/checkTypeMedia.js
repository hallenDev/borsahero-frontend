import TagType from 'shared/types/TagType'

export const isVideoRdyType = types => {
  return types.includes(TagType.VIDEO_ATTACHMENT_RDY)
}

export const isVideoType = types => {
  return types.includes(TagType.VIDEO_ATTACHMENT)
}

export const isPhotoType = types => {
  return types.includes(TagType.ATTACHMENT)
}

export const isAudioType = types => {
  return types.includes(TagType.AUDIO_ATTACHMENT)
}

export const isGiftType = types => {
  return types.includes(TagType.VIRTUAL_GIFT)
}

export const isAkAcceptMedia = (types, status) => {
  return (isVideoRdyType(types) || isPhotoType(types)) && status === 'UNREQUESTED'
}

export const isMediaType = types => {
  return isVideoRdyType(types) || isPhotoType(types)
}

export const isMessageType = types => {
  return (
    !isVideoRdyType(types) &&
    !isVideoType(types) &&
    !isPhotoType(types) &&
    !isAudioType(types) &&
    !isGiftType(types) &&
    !isAkAcceptMedia(types) &&
    !isMediaType(types)
  )
}
