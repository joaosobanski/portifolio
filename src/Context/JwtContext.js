import React, { createContext, useState, useContext } from "react";

const JwtContext = createContext();
//global.api = "http://tothemoonapi.herokuapp.com"
global.api = "http://localhost:3003"
export function JwtProvider({ children }) {
    const [jwt, setJwt] = useState('');
    const [_id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [isConnected, setConnected] = useState('');


    return (
        <JwtContext.Provider
            value={{
                jwt, setJwt,
                _id, setId,
                address, setAddress,
                isConnected, setConnected
            }}
        >
            {children}
        </JwtContext.Provider>
    );
}

export function useJwt() {
    const context = useContext(JwtContext);
    if (!context) throw new Error("useJwt must be used within a CountProvider");
    const {
        jwt, setJwt,
        _id, setId,
        address, setAddress,
        isConnected, setConnected
    } = context;
    return {
        jwt, setJwt,
        _id, setId,
        address, setAddress,
        isConnected, setConnected
    };
}