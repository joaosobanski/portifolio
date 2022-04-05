import { Label } from "../../../Components/Label/Label";
import { useJwt } from "../../../Context/JwtContext";

import { useState, useEffect } from 'react';
import { Button } from "../../../Components/Button/Button";
import { PanelCenter } from "../../../Components/Panel/PanelCenter";
import { TextInput } from "../../../Components/TextInput/TextInput";
import { Line } from "../../../Components/Line/Line";
import { getCryptoCompare } from "../../../Services/CryptoCompare";
import { numberFormat } from "../../../Components/Currency/FormatCurrency";
import { postWalletToken } from "../../../Services/Portifolio/TokensCoins/TokenService";


export const FormNewToken = ({ onClose }) => {
    const { jwt, setJwt, isConnected, setConnected, address, setAddress, _id } = useJwt();

    const [token, setToken] = useState('');
    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [desc, setDesc] = useState('');

    const onTokenChange = (e) => {
        setToken(e);

        getCryptoCompare(e, 'USD').then(ee => {
            setValue(ee);
            setTotal(ee * amount);
        });
    }
    const onAmountChange = (e) => {
        setAmount(e);
        setTotal(e * value);
    }

    const onValueChange = (e) => {
        setValue(e);
        setTotal(amount * e);
    }

    const onClickAdd = () => {
        postWalletToken(amount, value, desc, total, token, jwt, _id, address).then((e) => {
            onClose();
        }).finally(() => {
        });
    }

    return (
        <PanelCenter>
            <Label text="Add Token In Portifolio" />
            <br />
            <Button text="Return" onClick={onClose} />
            <Line />
            <Label text="Description:" />
            <TextInput handleChange={setDesc} value={desc} />
            <br />
            <Label text="Token:" />
            <TextInput handleChange={onTokenChange} value={token} />
            <br />
            <Label text="Amount:" />
            <TextInput handleChange={onAmountChange} value={amount} typeInput="number" />
            <br />
            <Label text="Value:" />
            <TextInput handleChange={onValueChange} value={value} typeInput="number" />
            <br />
            <Label text="Value Total:" />
            <TextInput handleChange={setTotal} value={numberFormat(total)} disabled={true} />
            <Line />
            <Button text="Add Token" onClick={onClickAdd} />
        </PanelCenter>
    )
}