import axios from 'axios';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { yupResolver } from '@hookform/resolvers/yup'

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const signinSchema = yup.object().shape({
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password'),
})

export const signinResolver = yupResolver(signinSchema)

export const signIn = async input => {
    return await axios.post(`${baseUrl}/auth/signIn`, { ...input })
}