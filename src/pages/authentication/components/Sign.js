import React, { useContext, useEffect } from 'react'
import { client } from '../../../assets/httpClient'
import _helper from '../../../assets/helprs'
import { useHistory } from "react-router-dom"
import { Context, toDispatch } from './../../../store'

export default function (props) {
    const { toggle, isEmail } = _helper
    const [ctx, dispatch] = useContext(Context)
    const { init } = toDispatch
    let history = useHistory();
    useEffect(
        () => {
            console.log({ ctx, props }, 'att')
        }, [ctx, props]
    )
    async function submit_sign(e) {
        e.preventDefault();
        const [btn, n_email, n_name, n_password] = [
            document.querySelector('#submit_sign'),
            document.querySelector('#sign input[name=email]'),
            document.querySelector('#sign input[name=name]'),
            document.querySelector('#sign input[name=password]'),
        ]
        const [email, name, password] = [n_email.value, n_name.value, n_password.value]
        if (!email || !name || !password || !isEmail(email)) {
            alert('preencha corretamente todos os campos')
            return false;
        }
        btn.disabled = "true";
        btn.innerText = " . . . ";

        const { data } = await client.post('/users', { email, name, password })

        if (data && data.fields && data.fields.includes('email')) {
            n_email.classList.remove('is-valid')
            n_email.classList.add('is-invalid')
        }
        else {
            n_email.classList.remove('is-invalid')
            n_email.classList.add('is-valid')
        }
        console.log(data, 'final')
        btn.disabled = "false";
        btn.innerText = "Login";
        if (data && !data.error) {
            const user = data.user
            dispatch(init(user))
            history.push('/', user)
        }
    }
    return (
        <div id="sign" className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto bg-white p-5 shadow d-none">
            <fieldset className="mb-5">
                <legend className="text-capitalize text-white text-center mb-4">
                    <h1>authentication</h1>
                </legend>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="form-group col-12  mx-auto ">
                            <label htmlFor="name">
                                <input maxLength="30" minLength="0" type="text" className="form-control border" name="name" aria-describedby="nameHelpId_5ed6bcacbf45c" placeholder="Name" />
                            </label>
                            <small id="nameHelpId_5ed6bcacbf45c" className="form-text text-secondary">Your name</small>
                        </div>
                        <div className="form-group col-12  mx-auto">
                            <label htmlFor="email">
                                <input maxLength="100" minLength="7" type="email" className="form-control border" name="email" aria-describedby="emailHelpId_5ed6bcacbf463" placeholder="E-mail" />
                            </label>
                            <small id="emailHelpId_5ed6bcacbf463" className="form-text text-secondary">example@email.com</small>
                        </div>
                        <div className="form-group col-12  mx-auto ">
                            <label htmlFor="password">
                                <input required="" maxLength="20" minLength="8" type="password" className="form-control border" name="password" aria-describedby="passwordHelpId_5ed6bcacbf445" placeholder="Password" />
                            </label>
                            <small id="passwordHelpId_5ed6bcacbf445" className="form-text text-secondary">* 8-20 length</small>
                        </div>

                    </div>
                </div>
            </fieldset>
            <div className="d-flex flex-row align-items-center justify-content-between mx-auto text-white-50 ">
                <button id="submit_sign" onClick={submit_sign} className="btn btn-block btn-outline-primary m-0 mx-1 w-25">Sign</button>
                <button id="toLogin" onClick={toggle()} type="button" className="btn btn-block btn-outline-dark m-0 mx-1 w-25">Login</button>
            </div>
        </div>
    );
}
