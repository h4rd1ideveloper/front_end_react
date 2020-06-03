import React, { useContext } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { client } from '../../../assets/httpClient'
import { Context, toDispatch } from './../../../store'

export default function ({ key, id, name, color, brand, year, plate, ...props }) {
    const [, dispatch] = useContext(Context)
    const { delete_by_id } = toDispatch
    const delet = async (e) => {
        e.preventDefault()
        try {
            client.delete(`/cars/${id}`)
            dispatch(delete_by_id(id))
        } catch ({ message }) {
            console.error(message)
        }
    }
    return (
        <li>
            <strong>name:</strong>
            <p>{name}</p>
            <strong>brand:</strong>
            <p>{brand}</p>
            <strong>year:</strong>
            <p>{year}</p>
            <strong>color:</strong>
            <p>{color}</p>
            <strong>plate:</strong>
            <p>{plate}</p>
            <button type={"button"} onClick={delet}>
                <FiTrash2 size={20} color={"#a8a8b3"} />
            </button>
        </li>
    );
}