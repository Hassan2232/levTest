import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwt, id) => {
        setToken(jwt);
        setUserId(id);
        localStorage.setItem('user', JSON.stringify({
            token: jwt,
            userId: id
        }));
    }, []);

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('user');
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        
        if(data && data.token) {
            login(data.token, data.userId);
        }
        
        setIsReady(true);
    }, [login]);

    return{ login, logout, token, userId, isReady }
}
