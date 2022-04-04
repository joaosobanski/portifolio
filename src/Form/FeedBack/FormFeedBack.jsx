import { useState } from "react"
import { Label } from "../../Components/Label/Label"
import { TextInput } from "../../Components/TextInput/TextInput";
import { getCryptoCompare } from "../../Services/CryptoCompare";

export const FormFeedBack = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [v, setV] = useState('');

    const consultar = () => {
        getCryptoCompare(a, b).then(e => {
            console.log('json', e)
            setV(e);
        });
    }

    return (
        <div>
            <Label text="Token A" />
            <TextInput handleChange={setA} value={a} />
            <br />
            <Label text="Token B" />
            <TextInput handleChange={setB} value={b} />
            <button onClick={consultar}>consultar</button>
            <br />
            <Label text="Valor" />
            <TextInput handleChange={setV} value={v} />
        </div>
    )
}