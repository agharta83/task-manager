import React, {useEffect, useRef, useState} from "react";
import {logoutUser} from "../Auth/authThunk";
import {useHistory} from "react-router";
// //All the svg files
import logo from "../../img/logo.svg";
import PowerOff from "../../img/power-off-solid.svg";

// StyledComponent
import {Container, SidebarContainer, Button, Logo, SlickBar, Item, Text, Profile, Details, Name, Logout} from "../../Theme/StyledComponents/Sidebar";
import {AccountTree, CalendarToday, Description, Group, Home} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {isEmptyObject, UPLOADS_PATH} from "../../helpers/utils";
import {Avatar as AvatarMUI} from "@material-ui/core";
import {personalInfosSelector} from "../Profile/ProfileSlice";
import {updatePersonalInfos} from "../Profile/profileThunk";

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
    const [profileClick, setProfileClick] = useState(false);
    const personalInfos = useSelector(personalInfosSelector);
    const [values, setValues] = useState(personalInfos);
    const history = useHistory();
    const valuesRef = useRef();

    useEffect(() => {
        if (!isEmptyObject(personalInfos)) {
            setValues(personalInfos);
        }
    }, [personalInfos]);

    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    const handleClick = () => setClick(!click);
    const handleProfileClick = () => setProfileClick(!profileClick)

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
                    <AvatarMUI alt="Profile" src={UPLOADS_PATH + values.imagePath} onClick={handleProfileClick} />
                    {/*<img*/}
                    {/*    onClick={handleProfileClick}*/}
                    {/*    src="https://picsum.photos/200"*/}
                    {/*    alt="Profile"*/}
                    {/*/>*/}
                    <Details clicked={profileClick}>
                        <Name>
                            <h4>{values.userName}</h4>
                            <Link to="/profile">view&nbsp;profile</Link>
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
