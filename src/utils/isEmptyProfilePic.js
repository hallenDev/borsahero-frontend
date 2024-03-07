const isEmptyProfilePic = (profilePic = '') => {
  return profilePic?.toLowerCase().includes('nopic')
}

export default isEmptyProfilePic
