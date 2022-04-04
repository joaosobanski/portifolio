
import React, { useState, useEffect } from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import './navbar.css'


export const NavBar = () => {
    let nav = useNavigate();

    const [isConnected, setConnect] = useState(false);
    const [walletAddres, setWalletAddres] = useState('');

    useEffect(() => {
        console.log('aq')
        pressedConnectWallet();
    }, []);

    const pressedDisconnectWallet = () => {
        setConnect(false);
        setWalletAddres('');
    }

    const pressedConnectWallet = async () => {
        if (!isConnected) {
            const walletResponse = await connectWallet();
            setConnect(walletResponse.connectedStatus);
            setWalletAddres(walletResponse.addres);
        } else {
            return alert("conta ja conectada" + walletAddres)
        }
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const addres = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                const object = {
                    connectedStatus: true,
                    status: 'Conectado com sucesso!',
                    addres: addres
                }

                return object;

            } catch (err) {
                console.log('err', err)
            }
            finally {

            }


        } else {
            return {
                connectStatus: false,
                status: "Metamask nao encontrada!"
            }
        }
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='menuback'>
            <Container>
                <Navbar.Brand onClick={() => nav('/')}>
                    <Label text="Capivara.Finance" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown
                            className='navbar-item'
                            title={
                                <Label text="Portifolio" />
                            }
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item className='navbar-item-dropdown' onClick={() => nav('/FarmLPSimulator')}>Create LP Token and stake Simulator</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>

                        <NavDropdown
                            className='navbar-item'
                            title={
                                <Label text="Calculator" />
                            }
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item className='navbar-item-dropdown' onClick={() => nav('/ImpLossCalculator')}>Farm - Impermanent Loss</NavDropdown.Item>
                            <NavDropdown.Item className='navbar-item-dropdown' onClick={() => nav('/AutoStakeCalculator')}>Auto Stake</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>

                        <Nav.Link className='navbar-item' onClick={() => nav('/FeedBack')}>
                            <Label text="Send FeedBack" />
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <div className="label1234">
                            Developed & Powered by @beavissembutthead
                            <label href="https://t.me/+9hCfDAmS5YY0ZTE5" target="_blank">
                            </label>
                        </div>
                    </Nav>
                    <Nav>
                        {
                            isConnected &&
                            <Button onClick={pressedDisconnectWallet} className="connect" text={`Wallet ${walletAddres}`} />
                            ||
                            <Button onClick={pressedConnectWallet} className="connect" text={`Connect Wallet`} />
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

/*

                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        */
