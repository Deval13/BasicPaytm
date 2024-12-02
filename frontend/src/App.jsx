import {
  BrowserRouter,Routes , Route
} from 'react-router-dom'

import { DashBoard } from './Pages/Dashboard'
import { Login } from './Pages/Login'
import { Signup } from './Pages/SignIn'
import { Payment } from './Pages/Payment'
import { SendMoneyPage } from './Pages/SendMoney'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<DashBoard />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path = "/send" element = {<SendMoneyPage/>}></Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
