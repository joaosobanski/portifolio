import { useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Label } from "../../Components/Label/Label"
import '../../Components/Panel/panel.css'
import { PanelCenter } from "../../Components/Panel/PanelCenter"
import { useJwt } from "../../Context/JwtContext";
import { FormNewPortifolio } from "./FormNewPortifolio";

export const FormFarmLpSimulator = () => {
    const { jwt, setJwt } = useJwt();

    const [onNew, setNew] = useState(false);

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
            </PanelCenter>
    )
}