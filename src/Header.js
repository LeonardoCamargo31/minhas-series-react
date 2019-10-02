import React, { useState } from 'react';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    return (
        <Navbar color='light' light expand='md'>
            {/* 'tag' para ele utilizar o componente Link, e 'to' que é o caminho desejado */}
            {/* se usar a href, ele ira dar refresh, e isso não é um compartamento de SPA */}
            <NavbarBrand tag={Link} to='/'>Minhas séries</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={open} navbar>
                <Nav className='ml-auto'>
                    <NavItem>
                        <NavLink tag={Link} to='/generos'>Genêro</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header