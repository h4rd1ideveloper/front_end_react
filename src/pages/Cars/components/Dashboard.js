import React, { useEffect, useContext } from 'react';
import Store, { Context, toDispatch } from './../../../store'
export function App(props) {
    const [, dispatch] = useContext(Context)
    useEffect(() => {
        try {
            fetch('http://localhost:8080/users')
                .then(r => r.json())
                .then(r => dispatch(toDispatch.init(r)))
        } catch (e) {
            console.error(e)
        }
    }, [dispatch])
    return <p>{JSON.stringify( props)}</p>
}

export default function (props) {
    return <Store children={<App {...props} />} />
}
 /***
     const [state, setState] = useState([]);
     let history = useHistory();
     const fetchData = async () => {
         try {
             const {data} = await clientHttp.get("/ongs");
             setState(data);
         } catch (e) {
             await FeedBack.fire({
                 icon: 'error',
                 title: `Oops... sentimos muito, mas algo deu errado`,
                 footer: `<code>${e.message}</code>`
             });
             window.location.reload();
         }
     };
     useEffect(() => {
         fetchData();
     }, []);
     return (
         <div className={"ongs-container"}>
             <header>
                 <img src={logoImg} alt="Be The Hero"/>
                 <span></span>
                 <Link to={'/logon'} className={"backl-ink button btn-custom"}>
                     <FiLogIn size={16} color={'#E02041'}/>
                     Logon
                 </Link>
             </header>
             <h1>ONG s</h1>
             <ul>
                 {
                     state && state.map(({name, email, whatsapp, city, uf, id}, index) => {
                         return (
                             <li key={`${id}-${index}`}>
                                 <p><strong>Instituição</strong>{name}</p>
                                 <p><strong>E-mail:</strong>{email}</p>
                                 <p><strong>WhatsApp:</strong>{whatsapp}</p>
                                 <p><strong>Cidade:</strong>{city}</p>
                                 <p className={'Cap'}><strong>UF:</strong>{uf}</p>
                                 <button type={"button"}>
                                     <FiList/>
                                 </button>
                             </li>
                         );
                     })
                 }
             </ul>
         </div>
     );
 **/