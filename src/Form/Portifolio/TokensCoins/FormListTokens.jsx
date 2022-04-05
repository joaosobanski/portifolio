import { Label } from "../../../Components/Label/Label";
import { useJwt } from "../../../Context/JwtContext";

import { useState, useEffect } from 'react';
import { FormNewToken } from "./FormNewToken";
import { Button } from "../../../Components/Button/Button";
import { PanelCenter } from "../../../Components/Panel/PanelCenter";
import { Line } from "../../../Components/Line/Line";
import { getWalletToken } from "../../../Services/Portifolio/TokensCoins/TokenService";
import { FormListItemToken } from "./FormListItemToken";
 
import { TableTitles } from "../../../Components/TableGrid/TableTitles";
export const FormListTokens = () => {
    const { jwt, setJwt, isConnected, setConnected, address, setAddress, _id } = useJwt();
    const [isNew, setNew] = useState(false);
    const [list, setList] = useState([]);

    const onClose = () => {
        setNew(false)
        get();
    }
    const get = () => {
        var data = [];
        getWalletToken(jwt, address, _id).then(e => {
            e.forEach(element => {
                data.push(element);
            });
        }).finally(() => {
            setList(data);
            console.log(data);
        });
    }

    useEffect(() => {
        get();
    }, []);

    return (

        isNew ?
            <FormNewToken onClose={onClose} />
            :
            <PanelCenter>
                <Label text={`tokens`} />
                <Button text="Add new" onClick={() => { setNew(true) }} />
                <TableTitles titles={["Token", "Value", "Value Now", "Valuation"]} />
                <Line />
                {
                    list.map((item, i) => <FormListItemToken item={item} key={i} />)
                }

            </PanelCenter>
    )
}

/**/