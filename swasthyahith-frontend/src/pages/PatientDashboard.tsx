import { Button } from "@/components/ui/button";
import { clearUser } from "@/store/store";
import { useLocalState } from "@/util/useLocalStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function PatientDashboard(){

    const [jwt, setJwt] = useLocalState("", "jwt");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logOut = () => {
        setJwt("");
        dispatch(clearUser());
        localStorage.clear();
        navigate("/login");
    }

    return(
        <div>
            <h1>Patient Dashboard</h1>
            <Button onClick={()=>logOut()}>Logout</Button>
        </div>
    )
}

export default PatientDashboard;