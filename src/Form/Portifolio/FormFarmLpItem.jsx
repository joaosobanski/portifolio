import { numberFormat } from "../../Components/Currency/FormatCurrency"
import { Col } from "../../Components/Grid/Col"
import { Row } from "../../Components/Grid/Row"
import { Label } from "../../Components/Label/Label"
import { PanelBlock } from "../../Components/Panel/PanelBlock"
import moment from "moment"
import { useState } from "react";
import { Line } from "../../Components/Line/Line"
import { Button } from "../../Components/Button/Button"
import { TextInput } from "../../Components/TextInput/TextInput"
import { Datepicker } from "../../Components/Datepicker/Datepicker"
export const FormFarmLpItem = ({ item }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <PanelBlock>
            <Row>
                <Col>
                    <Label text={item.protocol} classname="label-grid" />
                </Col>
                <Col>
                    <Label text={`${item.tokenA}-${item.tokenB} LP`} classname="label-grid" />
                </Col>
                <Col>
                    <Label text={`${numberFormat(item.valueTotal)}`} classname="label-grid" />
                </Col>
                <Col>
                    <Button text="Details" onClick={() => { setCollapse(!collapse) }} />
                </Col>
            </Row>
            {
                collapse &&
                <div>
                    <Line />

                    <Row>
                        <Col>
                            <Label text="" />
                            <PanelBlock>
                                <Label text="Total $:" />
                                <TextInput value={item.valueTotal} typeInput="number" placeholder="Set Total Value LP" disabled={true} />
                                <br />
                                <Label text="Protocol:" />
                                <TextInput value={item.protocol} placeholder="Dex name" disabled={true} />
                                <br />
                                <Label text="APR %:" />
                                <TextInput value={item.apr} typeInput="number" disabled={true} />
                                <br />
                                <Label text="Date Stake:" />
                                <TextInput value={moment(item.date).format("DD/MM/YYYY")} typeInput="date" disabled={true} /> 
                            </PanelBlock>
                        </Col>
                        <Col>
                            <Label text="Token A" />
                            <PanelBlock>
                                <Label text="Token:" />
                                <TextInput value={item.tokenA} placeholder="Token A Name" disabled={true} />
                                <br />
                                <Label text="Value:" />
                                <TextInput value={item.valueAToken} typeInput="number" disabled={true} />
                                <br />
                                <Label text="Amount:" />
                                <TextInput value={item.amountA} typeInput="number" disabled={true} />
                                <br />
                                <Label text="Value:" />
                                <TextInput value={item.valueA} typeInput="number" disabled={true} />
                            </PanelBlock>
                        </Col>
                        <Col>
                            <Label text="Token B" />
                            <PanelBlock>
                                <Label text="Token:" />
                                <TextInput value={item.tokenB} placeholder="Token B Name" disabled={true} />
                                <br />
                                <Label text="Value:" />
                                <TextInput value={item.valueBToken} typeInput="number" disabled={true} />
                                <br />
                                <Label text="Amount:" />
                                <TextInput value={item.amountB} typeInput="number" disabled={true} />
                                <br />
                                <Label text="Value:" />
                                <TextInput value={item.valueB} typeInput="number" disabled={true} />
                            </PanelBlock>
                        </Col>
                    </Row>
                </div>
            }
        </PanelBlock>
    )

}