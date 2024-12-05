import { Button } from "@/components/ui/button"
import { clearUser } from "@/store/store";
import { useLocalState } from "@/util/useLocalStorage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {

  const role = useSelector((state: any) => state.auth?.role);
  console.log("Role in DoctorDashboard:", role);


  const [jwt, setJwt] = useLocalState("", "jwt");
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:8080/api/records", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    }).then((records) => {
      setRecords(records);
    })
  }, [])


  function createRecord() {

    axios.post(
      "http://localhost:8080/api/records",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    }).then((record) => {
      console.log(record);

    })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    setJwt("");
    dispatch(clearUser());
    localStorage.clear();
    navigate("/login");
}

  return (
    <div className="m-5">
      {records && records.map((record, index) => {
        return (
          <div key={record}>
            <a href={"/records/" + record.id}>{record.id}</a>
          </div>
        )
      })}
      <Button onClick={() => createRecord()}>Upload a medical record</Button>

      <Button onClick={()=>logOut()}>Logout</Button> 
    </div>
  )
}

export default DoctorDashboard