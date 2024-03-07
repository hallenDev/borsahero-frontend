import { createContext, useState, useEffect, useMemo } from 'react';

import { getUserStore, setUserStore, removeUserStore, setAuthToken, removeAuthToken, getAuthToken } from 'services/storage.service';
import useAxiosConfig from 'hooks/useAxiosConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(getUserStore())

    const [accessToken, setAccessToken] = useState(getAuthToken());
    const [isSignedIn, setSignedIn] = useState(getAuthToken() ? true: false);

    useEffect(() => {
        if(userData && (!userData.avatar || !userData.first_name || !userData.last_name || !userData.username)) {
            
        }
    }, [userData])

    useEffect(() => {
        setUserData(getUserStore())
    }, [children])
    
    const context = useMemo(
        () => ({
            signIn: params => {
                setUserData(params);
                setUserStore(params);
                setAuthToken(params.accessToken);
                setSignedIn(true);
            },
            signOut: () => {
                removeUserStore();
                setUserData({})
                removeAuthToken();
                setAccessToken(null);
                setSignedIn(false);
            },
            updateUserData: params => {
                setUserData(params);
                setUserStore(params);
            }
        }),
        [accessToken]
    );

    useAxiosConfig();
        
    return (
        <AuthContext.Provider
            value={{
                ...context,
                isSignedIn,
                userData,
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;