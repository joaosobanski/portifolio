import { useState } from "react"
import { Label } from "../../Components/Label/Label"
import { PanelCenter } from "../../Components/Panel/PanelCenter";
import { TextInput } from "../../Components/TextInput/TextInput";
import { useJwt } from "../../Context/JwtContext";
import { getCryptoCompare } from "../../Services/CryptoCompare";

export const FormFeedBack = () => {
    const { jwt, setJwt } = useJwt();
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [v, setV] = useState('');

    const consultar = () => {
        if (a && b)
            getCryptoCompare(a, b).then(e => {
                setV(e);
            });
    }

    return (
        <PanelCenter>
            <Label text="Write Token" />
            <Label text={jwt} />
            <br />
            <Label text="Token A" />
            <TextInput handleChange={setA} value={a} />
            <br />
            <Label text="Token B" />
            <TextInput handleChange={setB} value={b} />
            <button onClick={consultar}>Search</button>
            <br />
            <Label text="Value" />
            <TextInput handleChange={setV} value={v} />
        </PanelCenter>
    )
}