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
}/*
export function App(props) {
    let history = useHistory();
    const location = useLocation();
    const fetchData = async () => {
        const {id, name} = location.state;
        const {data, status} = await client.get(`/cars`, {headers: { 'authorization': location.state.id}});        
    };
    useEffect(() => {
        if (!location || !location.state || !location.state.id) {
            history.push('/logon');
        } else {
            fetchData();
        }
    }, [location]);
    const {ctx} = props;
    return (
        <div className={"profile-container"}>
            <header>
                <span>Bem Vindo, {name}</span>
                <Link to={{pathname: "/incidents/new", state:{id, name}}} className={"button"}>
                    Cadastrar novo carro
                </Link>
                <button type={"button"} onClick={() => history.push('/logon')}>
                    <FiPower size={18} color={"#E02041"}/>
                </button>
            </header>
            <h1>Carros cadastrados</h1>
            <ul>
                {
                    incidentsList && incidentsList.map(({title, description, value, id, ong_id}, key) => {
                        const delet = async (event) => {
                            event.preventDefault();
                            event.target.disabled = "true";
                            const {status, ...rest} = await clientHttp.delete(`/incidents/${id}`, {
                                headers: {
                                    'Authorization': ong_id
                                }
                            });

                            if (status >= 400) {
                                await FeedBack.fire({
                                    icon: 'error',
                                    title: `Oops... sentimos muito, mas algo deu errado`
                                });
                            } else {
                                setState({name, incidentsList: incidentsList.filter((e) => e.id !== id), id: ong_id})
                            }
                        };
                        return (
                            <li key={key}>
                                <strong>CASO:</strong>
                                <p>{title}</p>
                                <strong>DESCRIÇÃO:</strong>
                                <p>{description}</p>
                                <strong>VALOR:</strong>
                                <p>{value}</p>
                                <button type={"button"} onClick={delet}>
                                    <FiTrash2 size={20} color={"#a8a8b3"}/>
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}*/