import React, { useContext, useState } from 'react'
import { FiTrash2, FiEdit, FiCheck } from "react-icons/fi"
import { client } from '../../../assets/httpClient'
import { Context, toDispatch } from './../../../store'

export default function ({ index, user_id, id, name, color, brand, year, plate, ...props }) {
    const [, dispatch] = useContext(Context)
    const [state, setState] = useState({ name, color, brand, year, plate, edit: false })
    const { delete_by_id } = toDispatch
    const id_node = `car_${index + 1}`;
    const handle_input_change = e => {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const save = async e => {
        console.log({ index, user_id, id, id_node })
    }
    const edit = async e => {
        if (state.edit) {
            for (const n of document.querySelectorAll(`#${id_node} input`)) {
                n.disabled = true
                n.style.border = 'none'
            }
            //envia
            const { data } = await client.put(`cars/${id}`, {
                "payload": {
                    "name": state.name,
                    "brand": state.brand,
                    "year": state.year,
                    "color": state.color,
                }
            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (data && !data.error) {
                alert('tudo certo')
                setState({ ...state,...data, edit: false })
            } else {
                alert(data && data.message ? data.message : JSON.stringify(data))
            }
        } else {
            for (const n of document.querySelectorAll(`#${id_node} input:not(.plate)`)) {
                n.disabled = null
                n.style.border = '1px solid black'
            }
            setState({ ...state, edit: true })
        }
    }
    const delet = async e => {
        e.preventDefault()
        try {
            client.delete(`/cars/${id}`)
            dispatch(delete_by_id(id))
        } catch ({ message }) {
            console.error(message)
        }
    }
    return (
        <li id={`car_${index + 1}`}>
            <input onChange={handle_input_change} name='name' value={state.name} disabled />
            <strong>brand:</strong>
            <input onChange={handle_input_change} name='brand' value={state.brand} disabled />
            <strong>year:</strong>
            <input onChange={handle_input_change} name='year' value={state.year} disabled />
            <strong>color:</strong>
            <input onChange={handle_input_change} name='color' value={state.color} disabled />
            <strong>plate:</strong>
            <input className="plate" onChange={handle_input_change} name='plate' value={state.plate} disabled />
            <button className="save" type={"button"} onClick={save}>
                <FiCheck size={20} color={"#a8a8b3"} />
            </button>
            <button className="edit" type={"button"} onClick={edit}>
                <FiEdit size={20} color={"#a8a8b3"} />
            </button>
            <button type={"button"} onClick={delet}>
                <FiTrash2 size={20} color={"#a8a8b3"} />
            </button>
        </li>
    );
}