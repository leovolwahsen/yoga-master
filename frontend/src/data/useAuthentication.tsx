import { useContext } from "react"
import { AuthContext } from "../utilities/providers/AuthenticationProvider"

export const useAuthentication = () => {
    const auth = useContext(AuthContext)
    return auth;
}
