
import { createContext,useState } from "react";
// ===CREATING CONTEXT
export const AuthContext = createContext();

// const loginProvider = ({children})=>{
//     const [isLogin, setIslogin] = useState(false)
//     const [profile, setProfile] = useState({})
//     return (
//      <AuthContext.Provider value={{isLogin,setIslogin,profile,setProfile}}>
//          {children}
//      </AuthContext.Provider>
//     )
// }

// export default loginProvider