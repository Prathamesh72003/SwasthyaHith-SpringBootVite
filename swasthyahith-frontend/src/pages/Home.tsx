import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home({ jwt }: { jwt?: string }) {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>
            {jwt && <p>JWT: {jwt}</p>}
            <Button onClick={() => {
                navigate("/dashboard");
            }}>Go to dashboard</Button>
        </div>
    )
}

export default Home