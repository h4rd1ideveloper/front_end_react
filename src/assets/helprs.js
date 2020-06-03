export default {
    isEmail: (mail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)),
    toggle: (target = '#login,#sign', classToggle = 'd-none') => e => {
        e.preventDefault();
        for (const node of document.querySelectorAll(target)) {
            node.classList.toggle(classToggle)
        }
    }
}