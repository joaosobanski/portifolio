import { useState } from "react"
import { Label } from "../../Components/Label/Label"
import { TextInput } from "../../Components/TextInput/TextInput";
import { getCryptoCompare } from "../../Services/CryptoCompare";

export const FormFeedBack = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [v, setV] = useState('');

    const consultar = () => {
        if (a && b)
            getCryptoCompare(a, b).then(e => {
                console.log('json', e)
                setV(e);
            });
    }

    return (
        <div className="panel-center">
            <Label text="Write Token" />
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
        </div>
    )
}