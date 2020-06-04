import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const opt = {
    title: 'Multiple inputs',
    html:
        '<input placeholder="name" required id="swal-name" class="swal2-input">' +
        '<input placeholder="brand" required id="swal-brand" class="swal2-input">' +
        '<input placeholder="year" required id="swal-year" class="swal2-input">' +
        '<input placeholder="color" required id="swal-color" class="swal2-input">' +
        '<input placeholder="plate" required id="swal-plate" class="swal2-input">',
    preConfirm: () => {
        return new Promise((resolve) => {
            resolve({
                name: document.querySelector('#swal-name').value,
                brand: document.querySelector('#swal-brand').value,
                year: document.querySelector('#swal-year').value,
                color: document.querySelector('#swal-color').value,
                plate: document.querySelector('#swal-plate').value,
            })
        })
    },
    onOpen: () => {
        document.querySelector('#swal-name').focus()
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        //MySwal.clickConfirm()
    }
}
export default Swal.mixin()
