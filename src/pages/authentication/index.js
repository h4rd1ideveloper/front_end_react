import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"
import './style.scss'
import '../../assets/bootstrap.min.css'
import Login from './components/Login'
import Sign from './components/Sign'

export default function ({ children, ...props }) {
    let history = useHistory();
    const location = useLocation();
    useEffect(() => {
        if (
            location &&
            location.state &&
            location.state.id
        ) {
            history.push('/cars');
        }
    }, [location, history]);
    return (
        <div id="Authenticate" className="container">
            <div className="row">
                <Login />
                <Sign />
            </div>
        </div>
    );
}