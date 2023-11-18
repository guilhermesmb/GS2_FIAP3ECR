
import axios from "axios";

const { createContext, useState } = require("react");

export const AuthContext = createContext({})

export function AuthProvider({children}){
    const [username, setUsername] = useState(null)
    const [user_id, setUser_id] = useState(null)

    async function login(credenciais){
        const resp = await axios.get("http://localhost:3000/usuarios")
        const usuarios = resp.data
        const usuario = usuarios.find(u => u.email === credenciais.email)
        if (usuario?.senha === credenciais.senha){
            setUsername(usuario.nome)
            setUser_id(usuario.id)
            return true
        }
        return false
    }

    return(
        <AuthContext.Provider value={{user_id, username, login}}>
            {children}
        </AuthContext.Provider>
    )
}