import { useState, useEffect } from "react";
import { Button } from "../../../Components/Button/Button";
import { Col } from "../../../Components/Grid/Col"; 
import { Label } from "../../../Components/Label/Label"
import { Line } from "../../../Components/Line/Line";
import '../../../Components/Panel/panel.css'
import { PanelBlock } from "../../../Components/Panel/PanelBlock";
import { PanelCenter } from "../../../Components/Panel/PanelCenter"
import { useJwt } from "../../../Context/JwtContext";
import { getFarmLp } from "../../../Services/Portifolio/PortifolioService";
import { FormFarmLpItem } from "./FormFarmLpItem";
import { FormNewPortifolio } from "./FormNewPortifolio";

export const FormFarmLpSimulator = () => {
    const { jwt, setJwt, address, _id } = useJwt();
    const [onNew, setNew] = useState(false);
    const [list, setList] = useState([]);

    const get = () => {
        var dt = [];
        getFarmLp(jwt, address, _id).then(e => {
            e.forEach(element => {
                dt.push(element);
            });
        }).finally(() => {
            setList(dt);
            console.log('dt', dt)
        })
    }

    useEffect(() => {
        get();
    }, []);

    const onHandleNewPortifolio = () => {
        setNew(false);
    }

    return (
        onNew ?
            <FormNewPortifolio onHandleNewPortifolio={onHandleNewPortifolio} />
            :
            <PanelCenter>
                <Label text="FormFarmLpSimulator" />
                <Button text="new portifolio" onClick={() => { setNew(true) }} />
                <Line />
                {
                    list.map((item, i) => <FormFarmLpItem key={i} item={item} />)
                }
            </PanelCenter>
    )
}