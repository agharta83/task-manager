import React, {useState} from "react";
import {logoutUser} from "../Auth/authThunk";
import {useHistory} from "react-router";
// //All the svg files
import logo from "../../img/logo.svg";
import PowerOff from "../../img/power-off-solid.svg";

// StyledComponent
import {Container, SidebarContainer, Button, Logo, SlickBar, Item, Text, Profile, Details, Name, Logout} from "../../Theme/StyledComponents/Sidebar";
import {AccountTree, CalendarToday, Description, Group, Home} from "@material-ui/icons";

const tabsItem = [
    {
        title: 'Home',
        link: '/home',
        icon: <Home />,
    },
    {
        title: 'Team',
        link: '/team',
        icon: <Group />,
    },
    {
        title: 'Calender',
        link: '/calender',
        icon: <CalendarToday />,
    },
    {
        title: 'Documents',
        link: '/documents',
        icon: <Description />,
    },
    {
        title: 'Projects',
        link: '/projects',
        icon: <AccountTree />,
    },

];

const Sidebar = () => {
    const [click, setClick] = useState(false);
    const history = useHistory();
    const handleClick = () => setClick(!click);

    const [profileClick, setProfileClick] = useState(false);
    const handleProfileClick = () => setProfileClick(!profileClick);

    const handleClickLogout = () => {
        logoutUser();
        history.push('/auth');
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
                    {tabsItem.map((tabItem, index) => (
                        <Item
                        onClick={() => setClick(false)}
                        exact
                        activeClassName="active"
                        to={tabItem.link}
                        key={index}
                    >
                            {tabItem.icon}
                        <Text clicked={click}>{tabItem.title}</Text>
                    </Item>
                    ))}
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
                            <a href="/profile">view&nbsp;profile</a>
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
