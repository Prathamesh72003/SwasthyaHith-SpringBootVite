import { useEffect, useState } from "react";
// import { useLocalState } from "@/util/useLocalStorage";
import axios from "axios";

function RecordView() {
    const recordId = window.location.pathname.split("/")[2];
    const [record, setRecord] = useState<any>(null);

    // const[jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        try {   
            axios.get("http://localhost:8080/api/records/"+recordId,{
                headers:{
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer "+jwt
                }
            }).then((res)=>{
                if (res.status === 200) {
                    return res.data;
                    console.log(res.data);
                    
                }
            }).then((record)=>{
                setRecord(record);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    

    return (
        <div className="flex flex-1 h-screen justify-center items-center flex-col">
            <p className="text-lg font-bold">Record: {recordId}</p>
            <div className="flex flex-col">
                <p>Record ID: {recordId}</p>
                <p>Record For: {record && record.user.username}</p>
                <p>Record URL: {record && record.recordDataURL}</p>   
                <p>Record Last Updated: {record && record.updatedAt}</p>
            </div>
        </div>
    )

}

export default RecordView;