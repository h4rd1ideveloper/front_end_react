import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import "../style.scss"
import { Context } from './../../../store'
import Car from './Car';

export default function (props) {
    const [ctx,] = useContext(Context)
    let history = useHistory();
    const location = useLocation();
    useEffect(() => {
        console.log({ ctx, history, location })
    }, [ctx, history, location])
    return (
        <>
        <header className="container">
            <h1>Your Cars</h1>
        </header>
            <main className="container">
                <ul>
                    {
                        ctx && ctx.cars.map((v, i) => <Car key={i} index={i} user_id={ctx.id} {...v} {...props} />)
                    }
                </ul>
            </main>
        </>
    )
}