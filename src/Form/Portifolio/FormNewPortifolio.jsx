import { useState } from "react"
import { Button } from "../../Components/Button/Button"
import { Col } from "../../Components/Grid/Col"
import { Row } from "../../Components/Grid/Row"
import { Label } from "../../Components/Label/Label"
import { Line } from "../../Components/Line/Line"
import { PanelBlock } from "../../Components/Panel/PanelBlock"
import { PanelCenter } from "../../Components/Panel/PanelCenter"
import { TextInput } from "../../Components/TextInput/TextInput"
import { getCryptoCompare } from "../../Services/CryptoCompare"


export const FormNewPortifolio = ({ onNew, onHandleNewPortifolio }) => {

    const [tokenA, setTokenA] = useState('');
    const [valueA, setValueA] = useState('');
    const [amountA, setAmountA] = useState('');

    const [tokenB, setTokenB] = useState('');
    const [valueB, setValueB] = useState('');
    const [amountB, setAmountB] = useState('');

    const [days, setDays] = useState('');
    const [apr, setAPR] = useState('');

    const tokenAHandle = (e) => {
        setTokenA(e);

        if (e)
            getCryptoCompare(e, 'USD').then(e => {
                setValueA(e);
            });
    }

    const tokenBHandle = (e) => {
        setTokenB(e);
        if (e)
            getCryptoCompare(e, 'USD').then(e => {
                setValueB(e);
            });
    }



    return (
        <PanelCenter>
            <Button text="Return" onClick={onHandleNewPortifolio} />
            <br />
            <Label text="Creating new Portfolio" />
            <Line />
            <Row>
                <Col>
                    <Label text="Token A" />
                    <PanelBlock>
                        <Label text="Token:" />
                        <TextInput value={tokenA} handleChange={tokenAHandle} />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueA} handleChange={setValueA} typeInput="number" />
                        <br />
                        <Label text="Amount:" />
                        <TextInput value={amountA} handleChange={setAmountA} typeInput="number" />
                    </PanelBlock>
                </Col>
                <Col>
                    <Label text="Token B" />
                    <PanelBlock>
                        <Label text="Token:" />
                        <TextInput value={tokenB} handleChange={tokenBHandle} />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueB} handleChange={setValueB} typeInput="number" />
                        <br />
                        <Label text="Amount:" />
                        <TextInput value={amountB} handleChange={setAmountB} typeInput="number" />
                    </PanelBlock>
                </Col>
                <Col>
                    <Label text="" />
                    <PanelBlock>
                        <Label text="Days:" />
                        <TextInput value={days} handleChange={setDays} typeInput="number" />
                        <br />
                        <Label text="APR %:" />
                        <TextInput value={apr} handleChange={setAPR} typeInput="number" />
                        <br />
                        <Button text="Calculate" onClick={onHandleNewPortifolio} />
                    </PanelBlock>
                </Col>
            </Row>
            <Line />

        </PanelCenter>
    )
}