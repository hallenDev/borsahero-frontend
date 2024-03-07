import { useMutation, useQueryClient } from 'react-query'
import { viewContent } from 'shared/api/member'
import ContentTypeMap from 'shared/types/ContentTypeMap'

const useViewContent = () => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(viewContent)

  return content => {
    mutateAsync(content.id)
      .then(data => {
        const isPlayList = content.type === ContentTypeMap.PLAYLIST

        if (isPlayList) {
          queryClient.setQueryData(['playlists', content.user.id], contents =>
            contents?.map(c =>
              c.id === data.id
                ? {
                    ...c,
                    view_count: data.view_count,
                  }
                : c,
            ),
          )
          queryClient.invalidateQueries('popular-playlists')
        } else {
          queryClient.setQueryData(['videos', content.user.id], contents =>
            contents?.map(c =>
              c.id === data.id
                ? {
                    ...c,
                    view_count: data.view_count,
                  }
                : c,
            ),
          )
        }
      })
      .catch(() => {})
  }
}

export default useViewContent
