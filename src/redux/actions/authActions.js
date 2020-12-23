import { SETUSER, LOGOUT } from "../type/authTypes";

const logoutUser = () => ({
    type: LOGOUT
})

export default logoutUser