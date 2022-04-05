
import { Label } from "../../Components/Label/Label"
import { useJwt } from "../../Context/JwtContext";

export const FormHome = () => {
    const { jwt, setJwt, isConnected, setConnected, address, setAddress, _id } = useJwt();

    return (
        <div >
            <Label text={`home ${jwt} - ${_id}`} />
        </div>
    )
}