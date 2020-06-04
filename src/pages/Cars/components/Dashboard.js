import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import "../style.scss"
import { Context, toDispatch } from './../../../store'
import Car from './Car';
import Swal, { opt } from '../../../assets/swal'
import { client } from '../../../assets/httpClient'
export default function (props) {
    const { init, create } = toDispatch
    const [ctx, dispatch] = useContext(Context)
    let history = useHistory();
    const location = useLocation();
    const getOut = () => {
        dispatch(init({}))
        history.push('/')
    }
    const save = async e => {
        try {
            const { value } = await Swal.fire(opt)
            if (value && value.plate) {
                const bodyFormData = new FormData();
                for (const [key, val] of Object.entries(value)) {
                    bodyFormData.set(key, val)
                }
                bodyFormData.set('user_id', ctx.id)
                const { data: car } = await client.post('cars/', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
                if (car && !car.error) {
                    dispatch(create(car))
                }
            } else {
                alert('plate must to be mandatory and unique')
            }
        } catch (error) {
            console.log({ ...error })
        }
    }
    useEffect(() => {
        if (ctx && ctx.name === "") {
            getOut()
        }
        console.log({ ctx, history, location })
    }, [ctx, history, location])
    return (
        <>
            <header className="container my-5 d-flex flex-row text-white">
                <h1 className="mr-auto">Your Cars</h1>
                <button className="save mx-1 btn btn-outline-primary" type={"button"} onClick={save}>
                    New Car
                </button>
                <button className="btn btn-outline-danger" onClick={e => {
                    e.preventDefault();
                    getOut()
                }}>Sair</button>
            </header>
            <main className="container">
                <ul>
                    {
                        ctx && ctx.cars && ctx.cars.map((v, i) => <Car key={i} index={i} user_id={ctx.id} {...v} {...props} />)
                    }
                </ul>
            </main>
        </>
    )
}