const {atom}= require('recoil')

const admin = atom({
    key:'admin',
    default:false
})

const edit= atom({
    key:'edit',
    default:false
})

export {admin,edit}