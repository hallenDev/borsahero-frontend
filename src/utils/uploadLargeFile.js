import { initiateUpload, uploadFile, completeUpload } from 'shared/api/member'
import noop from 'utils/noop'

const CHUNK_SIZE = 1024 * 1024 * 5;

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

const uploadLargeFile = async (
  fileData,
  onProgress = noop,
  onCompleted = noop,
  onError = noop,
  ) => {
    try {

      const file = fileData.file;
      const response = await initiateUpload({ fileName: file.name })
      
      const { tempId, uploadId } = response
      
      const size = file.size;
      
      const totalChunks = Math.ceil(size / CHUNK_SIZE)

      let uploadedChunks = 0;
      const uploadPromises = []
      let start = 0
      let end
      for (let i = 0; i < totalChunks; i++) {
        end = start + CHUNK_SIZE
        const data = file.slice(start, end > size ? size: end);
        const base64 = await blobToBase64(data);
        const uploadPromise = uploadFile({
          index: i,
          fileName: file.name,
          uploadId,
          tempId,
          file: base64,
        }).then(() => {
          uploadedChunks++
          const progress = Math.floor((uploadedChunks / totalChunks) * 100)
          onProgress(progress)
        })

        uploadPromises.push(uploadPromise)

        start = end;
      }

    await Promise.all(uploadPromises)

    const completedResponse = await completeUpload({
      uploadId,
      tempId,
      fileName: file.name,
    })

    onCompleted(completedResponse.data, completedResponse.key)

    return;
  } catch (error) {
    console.log('error while uploading large file', error);

    onError(error)
  }
}

export default uploadLargeFile
