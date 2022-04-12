import moment from "moment"
import { useState } from "react"
import { Button } from "../../../Components/Button/Button"
import { Datepicker } from "../../../Components/Datepicker/Datepicker"
import { Col } from "../../../Components/Grid/Col"
import { Row } from "../../../Components/Grid/Row" 
import { Label } from "../../../Components/Label/Label"
import { Line } from "../../../Components/Line/Line"
import { PanelBlock } from "../../../Components/Panel/PanelBlock"
import { PanelCenter } from "../../../Components/Panel/PanelCenter"
import { TextInput } from "../../../Components/TextInput/TextInput"
import { useJwt } from "../../../Context/JwtContext"
import { getCryptoCompare } from "../../../Services/CryptoCompare"
import { postFarmlLp } from "../../../Services/Portifolio/PortifolioService"



export const FormNewPortifolio = ({ onNew, onHandleNewPortifolio }) => {
    const { jwt, address, _id } = useJwt();
    const [dateSelected, setDateSelected] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [valueTotal, setValueTotal] = useState('');
    const [obs, setObs] = useState('');

    const [protocol, setProtocol] = useState('');
    const [tokenA, setTokenA] = useState('');
    const [valueAToken, setValueAToken] = useState('');
    const [valueA, setValueA] = useState(0);
    const [amountA, setAmountA] = useState(0);

    const [tokenB, setTokenB] = useState('');
    const [valueBToken, setValueBToken] = useState('');
    const [valueB, setValueB] = useState(0);
    const [amountB, setAmountB] = useState(0);

    const [days, setDays] = useState('');
    const [apr, setAPR] = useState('');

    const onClickSavePortifolio = () => {
        postFarmlLp(protocol, days, valueTotal, obs, dateSelected, apr, tokenA, amountA, valueA, tokenB, amountB, valueB, jwt, address, _id).then((e) => {
            console.log("voltou")
            onHandleNewPortifolio();
        })
    }

    const validFields = async () => {
        if (!valueA)
            setValueA(0);
        if (!valueB)
            setValueB(0);
        if (!amountA)
            setAmountA(0);
        if (!amountB)
            setAmountB(0);
    }

    const handleValueTokenA = (e) => {
        setValueAToken(e);
        divideValueTotal(valueTotal, tokenA, tokenB, e, valueBToken);

    }
    const handleValueTokenB = (e) => {
        setValueBToken(e);
        divideValueTotal(valueTotal, tokenA, tokenB, valueAToken, e);

    }

    const handleValueTotal = async (e) => {
        setValueTotal(e);
        divideValueTotal(e, tokenA, tokenB, valueAToken, valueBToken);

    }

    const divideValueTotal = async (valueTotal, tokenA, tokenB, valueA, valueB) => {
        await validFields();
        var frac = valueTotal / 2;
        if (tokenA) {
            var a = await getCryptoCompare(tokenA, 'USD')
            setValueAToken(valueA ? valueA : a);
            setValueA(frac);
            setAmountA(frac / (valueA ? valueA : a));
        }
        if (tokenB) {
            var b = await getCryptoCompare(tokenB, 'USD')

            setValueBToken(valueB ? valueB : b);
            setValueB(frac);
            setAmountB(frac / (valueB ? valueB : b));
        }
    }

    const tokenAHandle = async (e) => {
        await setTokenA(e);
        divideValueTotal(valueTotal, e, tokenB, null, null);
    }

    const tokenBHandle = async (e) => {
        await setTokenB(e);
        divideValueTotal(valueTotal, tokenA, e);
    }



    return (
        <PanelCenter>
            <Button text="Return" onClick={onHandleNewPortifolio} />
            <br />
            <Label text="Creating new Portfolio" />
            <Line />
            <Row>
                <Col>
                    <Label text="" />
                    <PanelBlock>
                        <Label text="Total $:" />
                        <TextInput value={valueTotal} handleChange={handleValueTotal} typeInput="number" placeholder="Set Total Value LP" />
                        <br />
                        <Label text="Protocol:" />
                        <TextInput value={protocol} handleChange={setProtocol} placeholder="Dex name" />
                        <br />
                        <Label text="APR %:" />
                        <TextInput value={apr} handleChange={setAPR} typeInput="number" />
                        <br />
                        <Label text="Date Stake:" />
                        <Datepicker value={dateSelected} onChange={setDateSelected} text="Date" />
                    </PanelBlock>
                </Col>
                <Col>
                    <Label text="Token A" />
                    <PanelBlock>
                        <Label text="Token:" />
                        <TextInput value={tokenA} handleChange={tokenAHandle} placeholder="Token A Name" />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueAToken} handleChange={handleValueTokenA} typeInput="number" />
                        <br />
                        <Label text="Amount:" />
                        <TextInput value={amountA} handleChange={setAmountA} typeInput="number" disabled={true} />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueA} handleChange={setValueA} typeInput="number" disabled={true} />
                    </PanelBlock>
                </Col>
                <Col>
                    <Label text="Token B" />
                    <PanelBlock>
                        <Label text="Token:" />
                        <TextInput value={tokenB} handleChange={tokenBHandle} placeholder="Token B Name" />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueBToken} handleChange={handleValueTokenB} typeInput="number" />
                        <br />
                        <Label text="Amount:" />
                        <TextInput value={amountB} handleChange={setAmountB} typeInput="number" disabled={true} />
                        <br />
                        <Label text="Value:" />
                        <TextInput value={valueB} handleChange={setValueB} typeInput="number" disabled={true} />
                    </PanelBlock>
                </Col>
            </Row>
            <Label text="Description:" />
            <TextInput value={obs} handleChange={setObs} className="text-input-400" />
            <br />
            <Line />
            <Button text="Add stake to portifolio" onClick={onClickSavePortifolio} />

        </PanelCenter>
    )
}