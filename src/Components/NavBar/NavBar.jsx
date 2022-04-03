import React, { useState, useEffect } from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { Label } from '../Label/Label';
import './navbar.css'

export const NavBar = () => {
    let nav = useNavigate();
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='menuback'>
            <Container>
                <Navbar.Brand onClick={() => nav('/')}>
                    <Label text="Capivara.Finance" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            className='navbar-item'
                            as={Link}
                            to="/ImpLossCalculator">
                            <Label text="Farm - Impermanent Loss" />
                        </Nav.Link>

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
