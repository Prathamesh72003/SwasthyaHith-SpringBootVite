import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RecordView from "./pages/RecordView";
import { useSelector } from "react-redux";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  const role = useSelector((state: any) => state.auth?.role);
  
  return (
    <>
      <Routes>

        {!role && <Route path="*" element={<Navigate to="/" />} />}
        <Route path="/" element={<LandingPage />} />
        {!role && <Route path="/login" element={<Login />} />}
        {!role && <Route path="/signup" element={<SignUpPage />} />}

        {role == "ROLE_PATIENT" && <Route path="/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>}/>}
        {role == "ROLE_DOCTOR" && <Route path="/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>}/>}
        
        
        <Route path="/records/:id" element={
          <PrivateRoute>
            <RecordView />
          </PrivateRoute>
        } />

        {/* <Route path="/" element={<Home jwt={jsonWebToken} />} /> */}
        


      </Routes>

    </>
  )
}

export default App