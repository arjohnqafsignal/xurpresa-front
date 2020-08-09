import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Logo from './assets/logo.png';

interface Props {}

export function Header(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [dropdownOpen, setOpen] = useState(false);

  const toggleDropDown = () => setOpen(!dropdownOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/">
          <img src={Logo} alt="Xurpresa Logo" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">How It Works</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
          {isAuthenticated ? (
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
              <DropdownToggle caret>{user.name}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Account</DropdownItem>
                <Link to="/agent-profile">
                  <DropdownItem>My Profile</DropdownItem>
                </Link>
                <Link to="/agent-password">
                  <DropdownItem>Change Password</DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/signin">Sign In</Link>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
