import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const initiateUpload = async input => {
    // return await axios.post(`${baseUrl}/content/initiate-upload`, { ...input })
    let cnt = 0;
    while(cnt < 3) {
        try {
            const res= await axios.post(`${baseUrl}/content/initiate-upload`, { ...input })
            return res;
        } catch (e) {
            cnt ++;
            if(cnt == 3) {
                throw ("Network Error");
            }
        }
    }
    
}

export const uploadFile = async input => {
    // return await axios.post(`${baseUrl}/content/upload`, { ...input })
    let cnt = 0;
    while(cnt < 3) {
        try {
            const res = await axios.post(`${baseUrl}/content/upload`, { ...input })
            return res;
        } catch (e) {
            cnt ++;
            if(cnt == 3) {
                throw ("Network Error");
            }
        }
    }
}

export const completeUpload = async input => {
    // return await axios.post(`${baseUrl}/content/complete-upload`, { ...input })
    let cnt = 0;
    while(cnt < 3) {
        try {
            const res = await axios.post(`${baseUrl}/content/complete-upload`, { ...input })
            return res;
        } catch (e) {
            cnt ++;
            if(cnt == 3) {
                throw ("Network Error");
            }
        }
    }
}

export const addVideo = async formData => {
    return await axios.post(`${baseUrl}/content/video`, formData)
}

export const updateVideo = async ({ id, formData }) => {
    return await axios.put(`${baseUrl}/content/video/${id}`, formData)
}

export const deleteVideo = async id => {
    return await axios.delete(`${baseUrl}/content/video/${id}`)
}

export const uploadContent = async input => {
    return await axios.post(`${baseUrl}/content`, { ...input })
}

export const getVideos = userId =>
  axios.get(`${baseUrl}/content/videos`, { params: { userId } })

export const getPlaylists = userId =>
  axios.get(`${baseUrl}/content/playlists`, { params: { userId } })

export const updateContent = input => axios.put(`${baseUrl}/content/${input.id}`, { ...input })
export const deleteContent = id => axios.delete(`${baseUrl}/content/${id}`)

export const viewVideo = id => axios.put(`${baseUrl}/content/video/${id}/view`);
export const viewContent = id => axios.put(`${baseUrl}/content/${id}/view`)

export const viewUserProfile = id => axios.put(`${baseUrl}/user/profile/${id}/view`)

export const updateProfile = input => axios.post(`${baseUrl}/user/update-profile`, { ...input })

export const getProfile = input => axios.get(`${baseUrl}/user/profile/${input.id}`);

export const getPopularPlaylists = () => axios.get(`${baseUrl}/discovery/popular-playlists`)

export const uploadPhoto = blob => {
    const form_data = new FormData()
    form_data.append('file', blob)
    return axios.post(`${baseUrl}/user/upload-profile-photo`, form_data)
}

export const createStream = formData => {
    return axios.post(`${baseUrl}/stream/create`, formData);
}

export const deleteStream = id => {
    return axios.delete(`${baseUrl}/stream/${id}`);
}

export const getStream = id => {
    return axios.get(`${baseUrl}/stream/${id}`);
}

export const getChatToken = input => {
    return axios.post(`${baseUrl}/stream/getChatToken`, {...input});
}

export const getSubscription = () => axios.get(`${baseUrl}/subscription`)

export const subscribePlan = input => axios.post(`${baseUrl}/subscription`, { ...input })

export const cancelSubscription = () => axios.post(`${baseUrl}/subscription/cancel`)

export const updateSubscription = input => axios.post(`${baseUrl}/subscription/update`, { ...input })

export const getPaymentMethod = () => axios.get(`${baseUrl}/payment-method`)

export const getPayoutDetails = () => axios.get(`${baseUrl}/payout`)

export const getStripeAccountLink = () => axios.get(`${baseUrl}/payout/account-link`)

export const createSetupIntentSecret = () => axios.post(`${baseUrl}/payment-method/setup-intent-secret`)

export const createProfileSubscription = input => axios.post(`${baseUrl}/subscription/profile`, { ...input })
export const editProfileSubscription = input => axios.put(`${baseUrl}/subscription/profile`, { ...input })
export const deleteProfileSubscription = () => axios.delete(`${baseUrl}/subscription/profile`)
export const getProfileSubscription = () => axios.get(`${baseUrl}/subscription/profile`)
