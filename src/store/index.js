import React, { useReducer } from 'react'

const INITIAL_STATE = { id: 0, name: '', email: '', password: '', cars: [] }
const Types = {
    init: 'initialize',
    create: 'create_car',
    update: 'update_car',
    delete: 'delete_car'
}

export const toDispatch = {
    init: payload => ({ type: Types.init, payload }),
    create: payload => ({ type: Types.create, payload }),
    update: payload => ({ type: Types.update, payload }),
    delete_by_id: payload => ({ type: Types.delete, payload })
}

function reducer(state = INITIAL_STATE, action) {
    const {id, cars, name, email, password } = state
    const { payload } = action
    switch (action.type) {
        case Types.init:
            return action.payload;
        case Types.create:
            return {id, name, email, password, cars: [...cars, payload] };
        case Types.update:
            return {id, name, email, password, cars: cars.map(car => car.id === payload.id ? payload : car) }
        case Types.delete:
            return {id, name, email, password, cars: cars.filter(car => car.id !== payload) }
        default:
            return state
    }
}
export const Context = React.createContext(INITIAL_STATE)

export default function Store({ children }) {
    const [store, dispatch] = useReducer(reducer, INITIAL_STATE)
    return (
        <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
    )
}
