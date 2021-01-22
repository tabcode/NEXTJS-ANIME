import Head from 'next/head';
import { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Input,NavbarToggler,Collapse } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Container = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <Head>
                <title>NextJS | Anime</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/monokai.min.css" />
            </Head>
            <div>
                <Navbar styles="background-color:#4985C0" light expand="md">
                    <NavbarBrand href="/">CODE</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/tabcode/nextJsAnime-MongoDB" target="_black"><span className="text">GitHub</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://www.facebook.com/tabCodee" target="_black"><span className="text">Facebook</span></NavLink>
                            </NavItem>
                        </Nav>
                        {(props.search == "true") ?
                            <>
                                <NavbarText><span className="text">Search</span></NavbarText>
                                <NavbarText className="ml-2"><Input type="text" className="form-control form-control-sm" value={props.value}
                                    onChange={(event) => props.searchValue(event.target.value)} /></NavbarText>
                            </>
                            : ''}
                    </Collapse>
                </Navbar>
                <div>
                    {props.children}
                </div>
            </div>
        </>
    );
}
export default Container;