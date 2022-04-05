import { Label } from "../../../Components/Label/Label";
import { useJwt } from "../../../Context/JwtContext";

import { useState, useEffect } from 'react';
import { PanelBlock } from "../../../Components/Panel/PanelBlock";
import { Button } from "../../../Components/Button/Button";
import { Row } from "../../../Components/Grid/Row";
import { Col } from "../../../Components/Grid/Col";
import { getCryptoCompare } from "../../../Services/CryptoCompare";
import { numberFormat } from "../../../Components/Currency/FormatCurrency";
import Table from 'react-bootstrap/Table'
import { TableValues } from "../../../Components/TableGrid/TableValues";
import { removeWalletToken } from "../../../Services/Portifolio/TokensCoins/TokenService";

export const FormListItemToken = ({ item }) => {
    const { jwt, setJwt, isConnected, setConnected, address, setAddress, _id } = useJwt();
    const [isC, setC] = useState(false);
    const [valueNow, setValueNow] = useState(0);
    const [invisible, setInvi] = useState(false)

    useEffect(() => {
        getCryptoCompare(item.token, 'USD').then(e => {
            setValueNow(e);
        });
    })

    const onClickRemove = () => {
        removeWalletToken(jwt, address, _id, item._id).then(e => {
            setInvi(true);
            console.log(e)
        })
    }

    return (
        !invisible &&
        <div>
            <TableValues
                onClick={() => { setC(!isC) }}
                values={[
                    `${item.amount} ${item.token}`,
                    numberFormat(item.total),
                    numberFormat(valueNow * item.amount),
                    `${(((valueNow / item.value) - 1) * 100).toFixed(2)}%`
                ]} />
            {
                isC &&
                <Button text={`Remove ${item.token}`} onClick={onClickRemove} />
            }
        </div>
    )
}

/*

        <PanelBlock>
            <Label text={item.token} classname="label-grid" />
            <Label text={numberFormat(item.value)} classname="label-grid" />
            <Label text={numberFormat(valueNow)} classname="label-grid" /> 
        </PanelBlock>

        
        <div className="divrow" >
            <label className="col">
                {item.token}
            </label>
            <label className="col">
                {numberFormat(item.value)}
            </label>
            <label className="col">
                {numberFormat(valueNow)}
            </label>
        </div>
        */