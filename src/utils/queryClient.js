import { QueryClient } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

import { STALE_TIME_24_HOURS as staleTime } from '&/environments/environment'
import { STALE_TIME_24_HOURS as cacheTime } from '&/environments/environment'
import { fetchCountries } from 'shared/api/members'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: ({ data, status }) => {
        typeof window !== 'undefined' && !!status && !data?.error?.USER_DISABLED
          ? (window.location.href = `/errorPage/${status}`)
          : null
      },
    },
  },
})

queryClient.setQueryDefaults('locationCountries', {
  queryFn: fetchCountries,
  cacheTime,
  staleTime,
})

const localStoragePersistor = createWebStoragePersistor({
  storage: typeof window !== 'undefined' ? window.localStorage : null,
})

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})

export default queryClient
