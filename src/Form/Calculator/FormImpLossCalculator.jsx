import { useState, useEffect } from "react";
import { Button } from "../../Components/Button/Button";
import { Col } from "../../Components/Grid/Col";
import { Row } from "../../Components/Grid/Row";
import { Label } from "../../Components/Label/Label";
import { Line } from "../../Components/Line/Line";
import { PanelBlock } from "../../Components/Panel/PanelBlock";
import { PanelCenter } from "../../Components/Panel/PanelCenter";
import { TextInput } from "../../Components/TextInput/TextInput";
import moment from "moment"
import { getCryptoCompare } from "../../Services/CryptoCompare";

export function formatCurrency(value) {
    const numberFormat = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
    return numberFormat;
}

export const FromImpLossCalculator = () => {
    const [dateSelected, setDateSelected] = useState(0);
    const [valueTotal, setValueTotal] = useState('');
    const [obs, setObs] = useState('');

    const [protocol, setProtocol] = useState('');
    const [tokenA, setTokenA] = useState('');
    const [valueAToken, setValueAToken] = useState('');
    const [valueA, setValueA] = useState(0);
    const [valueAFuture, setValueAFuture] = useState(0);
    const [valueBFuture, setValueBFuture] = useState(0);
    const [amountA, setAmountA] = useState(0);

    const [tokenB, setTokenB] = useState('');
    const [valueBToken, setValueBToken] = useState('');
    const [valueB, setValueB] = useState(0);
    const [amountB, setAmountB] = useState(0);

    const [days, setDays] = useState(0);
    const [apr, setAPR] = useState(0);
    const [lines, setLines] = useState([]);

    const onClickSavePortifolio = () => {
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


    const onClickCalculate = () => {


        const product_constant = amountA * amountB;
        const initial_price_ratio = valueAFuture / valueBFuture;
        const future_qtd_a = Math.sqrt(product_constant / initial_price_ratio);
        const future_qtd_b = Math.sqrt(product_constant * initial_price_ratio);
        const total_value_future = (future_qtd_a * valueAFuture) + (future_qtd_b * valueBFuture);
        const held_a = valueAFuture * amountA;
        const held_b = valueBFuture * amountB;
        const total_held = held_a + held_b;
        const difference_v_hold = total_value_future - total_held;
        const total_value_apr = total_value_future * (1 + ((apr / 100) / 365) * (days));
        var lines = [];
        if (total_value_future) {

            lines.push(`Future Total: ${formatCurrency(total_value_future)}`);
            lines.push(`Valuation: ${formatCurrency(total_value_future - valueTotal)}`);
            lines.push('\n');
            lines.push(`Token A`);
            lines.push(formatCurrency(future_qtd_a * valueAFuture));
            lines.push(future_qtd_a);
            lines.push('\n');
            lines.push(`Token B`);
            lines.push(formatCurrency(future_qtd_b * valueBFuture));
            lines.push(future_qtd_b);
            if (apr != null && apr > 0) {
                lines.push('\n');
                lines.push(`Reward (Earn): ${formatCurrency(total_value_apr - total_value_future)}`);
            }
            lines.push('\n');
            lines.push(`Imp Loss: ${formatCurrency(total_held - total_value_future)}`);
            setLines(lines)
        }

    }



    return (
        <PanelCenter>
            <br />
            <Label text="Impermanent Loss Calculator" />
            <Line />
            <Row>
                <Col>
                    <Label text="" />
                    <PanelBlock>
                        <Label text="Total $:" />
                        <TextInput value={valueTotal} handleChange={handleValueTotal} typeInput="number" placeholder="Set Total Value LP" />
                        <br />
                        <Label text="APR %:" />
                        <TextInput value={apr} handleChange={setAPR} typeInput="number" />
                        <br />
                        <Label text="Days:" />
                        <TextInput value={days} handleChange={setDays} text="number" />
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
                        <br />
                        <Label text="Future Value:" />
                        <TextInput value={valueAFuture} handleChange={setValueAFuture} typeInput="number" />
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
                        <br />
                        <Label text="Future Value:" />
                        <TextInput value={valueBFuture} handleChange={setValueBFuture} typeInput="number" />
                    </PanelBlock>
                </Col>
            </Row>
            <Button text="Calculate" onClick={onClickCalculate} />
            <Line />
            {
                lines.length > 0 &&
                lines.map((item, i) =>
                    <div key={i} >
                        <Label text={item} />
                    </div>
                )
            }

        </PanelCenter>
    )
}