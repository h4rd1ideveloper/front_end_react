import React, { useContext } from 'react'
import { client } from '../../../assets/httpClient'
import { useHistory } from "react-router-dom"
import _helper from '../../../assets/helprs'
import { Context, toDispatch } from './../../../store'

export default function (props) {
    const { toggle, isEmail } = _helper
    let history = useHistory();
    const [, dispatch] = useContext(Context)
    const { init } = toDispatch
    async function submit_login(e) {
        e.preventDefault();
        const [btn, n_email, n_password] = [
            document.querySelector('#submit_login'),
            document.querySelector('#login input[name=email]'),
            document.querySelector('#login input[name=password]')
        ]
        const [email, password] = [n_email.value, n_password.value]
        if (!email || !password || !isEmail(email)) {
            alert('preencha corretamente todos os campos')
            return false;
        }
        btn.disabled = "true";
        btn.innerText = "Aguarde ...";
        const { data } = await client.post('/login', { email, password })
        if (data && data.fields && data.fields.includes('email')) {
            n_email.classList.add('is-invalid')
            n_email.classList.remove('is-valid')
            n_password.classList.remove('is-invalid')
            n_password.classList.remove('is-valid')
        } else {
            n_email.classList.add('is-valid')
            n_email.classList.remove('is-invalid')
            if (data && data.fields && data.fields.includes('password')) {
                n_password.classList.add('is-invalid')
                n_password.classList.remove('is-valid')
            }
            else {
                n_password.classList.add('is-valid')
                n_password.classList.remove('is-invalid')
            }
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
        <div id="login" className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto bg-white p-5 shadow">
            <fieldset className="mb-5">
                <legend className="text-capitalize text-center mb-4">
                    <h1>authentication</h1>
                </legend>
                <div className="container-fluid p-0">
                    <div className="row">
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
            <div className="d-flex flex-row align-items-center justify-content-between  mx-auto text-white-50">
                <button onClick={submit_login} id="submit_login" className="btn  btn-block btn-primary m-0 mx-1 w-25">Login</button>
                <button id="toSign" onClick={toggle()} type="button" className="btn  btn-block btn-secondary m-0 mx-1  w-25 ">Sign</button>
            </div>
        </div>
    );
}