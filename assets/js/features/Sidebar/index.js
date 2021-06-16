import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {logoutUser} from "../Auth/authThunk";
import {useHistory} from "react-router";
//All the svg files
import logo from "../../img/logo.svg";
import Home from "../../img/home-solid.svg";
import Team from "../../img/social.svg";
import Calender from "../../img/sceduled.svg";
import Projects from "../../img/starred.svg";
import Documents from "../../img/draft.svg";
import PowerOff from "../../img/power-off-solid.svg";

// StyledComponent
import {Container, SidebarContainer, Button, Logo, SlickBar, Item, Text, Profile, Details, Name, Logout} from "../../StyledComponents/Sidebar";
import apiAuth from "../../helpers/apiAuth";


const Sidebar = () => {
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = () => setClick(!click);

    const [profileClick, setProfileClick] = useState(false);
    const handleProfileClick = () => setProfileClick(!profileClick);

    const handleClickLogout = () => {
        logoutUser();
    }

    return (
        <Container>
            <Button clicked={click} onClick={() => handleClick()}>
                Click
            </Button>
            <SidebarContainer>
                <Logo>
                    <img src={logo} alt="logo" />
                </Logo>
                <SlickBar clicked={click}>
                    <Item
                        onClick={() => setClick(false)}
                        exact
                        activeClassName="active"
                        to="/home"
                    >
                        <img src={Home} alt="Home" />
                        <Text clicked={click}>Home</Text>
                    </Item>
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/team"
                    >
                        <img src={Team} alt="Team" />
                        <Text clicked={click}>Team</Text>
                    </Item>
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/calender"
                    >
                        <img src={Calender} alt="Calender" />
                        <Text clicked={click}>Calender</Text>
                    </Item>
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/documents"
                    >
                        <img src={Documents} alt="Documents" />
                        <Text clicked={click}>Documents</Text>
                    </Item>
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/projects"
                    >
                        <img src={Projects} alt="Projects" />
                        <Text clicked={click}>Projects</Text>
                    </Item>
                </SlickBar>

                <Profile clicked={profileClick}>
                    <img
                        onClick={() => handleProfileClick()}
                        src="https://picsum.photos/200"
                        alt="Profile"
                    />
                    <Details clicked={profileClick}>
                        <Name>
                            <h4>Jhon&nbsp;Doe</h4>
                            <a href="/#">view&nbsp;profile</a>
                        </Name>

                        <Logout>
                            <img src={PowerOff} alt="logout" onClick={handleClickLogout}/>
                        </Logout>
                    </Details>
                </Profile>
            </SidebarContainer>
        </Container>
    );
};

export default Sidebar;
