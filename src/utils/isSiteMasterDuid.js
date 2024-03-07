import { SITE_MASTER_ID } from '&/environments/environment'

export default function isSiteMasterDuid(duid) {
  return parseInt(duid) === parseInt(SITE_MASTER_ID)
}
