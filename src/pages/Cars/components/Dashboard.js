import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom"
import "../style.scss"
import { client } from '../../../assets/httpClient'
import Store, { Context, functionsToDispatch } from '../../../store/Cars'

export function App(props) {
    const [, dispatch] = useContext(Context)
    const { init } = functionsToDispatch
    const storeFromServer = async () => {
        const { data } = await client.get('http://localhost:8080/cars')
        dispatch(init(data))
    }
    useEffect(() => {
        try {
            storeFromServer()
        } catch (e) {
            console.error(e)
        }
    }, [])
    return <p>{JSON.stringify(props)}</p>
}


export default function (props) {
    return <Store children={<App {...props} />} />
}