import Centrifuge from 'centrifuge'
import { getUserStore } from 'services/storage.service'

const WS_URL = process.env.REACT_APP_WS_URL || ''

export const centrifuge = new Centrifuge(WS_URL, {
  debug: process.env.NODE_ENV !== 'production',
  refreshEndpoint: `${process.env.API_ENTRY_POINT}/members/jwt/refresh`,
  refreshHeaders: { Authorization: `Bearer: ${getUserStore()?.authToken}` },
  refreshAttempts: 5,
})

export const connectToCentrifuge = jwt => {
  if (!centrifuge.isConnected()) {
    centrifuge.setToken(jwt)

    centrifuge.connect()
  }
}

export const disconnectToCentrifuge = () => {
  if (centrifuge.isConnected()) {
    centrifuge.disconnect()
  }
}

export const subscribeToChannel = channel => {
  return centrifuge.subscribe(channel)
}
