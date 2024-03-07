import {
  FILE_EXTANTION,
  VIDEO_MAX_SIZE,
  PHOTO_MAX_SIZE,
  FILE_MIN_PROPORTIONS_W,
  FILE_MIN_PROPORTIONS_H,
  ERROR_TEXT_MAX_SIZE_VIDEO,
  ERROR_TEXT_MAX_SIZE_IMAGE,
  ERROR_TEXT_TYPE,
  ERROR_TEXT_PROPORTIONS_PHOTO,
} from 'shared/types/AddMediaParams'
import noop from 'shared/utils/noop'

const fileValidation = (file, mediaAddHandler = noop, setErrors) => {
  if (!file) return
  if (file?.type?.match('audio*')) {
    mediaAddHandler(file)
    return
  }
  const parts = file?.name?.split('.')

  if (FILE_EXTANTION && !FILE_EXTANTION.includes(parts[parts?.length - 1].toLowerCase())) {
    setErrors(ERROR_TEXT_TYPE)
    return
  }
  if (file.type.match('video*')) {
    if (file.size > VIDEO_MAX_SIZE) setErrors(ERROR_TEXT_MAX_SIZE_VIDEO)
    else {
      mediaAddHandler(file)
    }
  } else if (file.type.match('image*')) {
    var reader = new FileReader()

    reader.addEventListener('load', function () {
      const image = new Image()

      image.addEventListener('load', function () {
        if (image.width < FILE_MIN_PROPORTIONS_W || image.height < FILE_MIN_PROPORTIONS_H) {
          setErrors(ERROR_TEXT_PROPORTIONS_PHOTO)
        } else if (file.size > PHOTO_MAX_SIZE) setErrors(ERROR_TEXT_MAX_SIZE_IMAGE)
        else {
          mediaAddHandler(file)
        }
      })
      image.src = URL.createObjectURL(file)
    })

    reader.readAsDataURL(file)
  }
}

export default fileValidation
