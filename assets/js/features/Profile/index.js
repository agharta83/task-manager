import React, {useState} from "react";
import {Favorite, Payment as PaymentIcon, Person, Settings as SettingsIcon, Subscriptions} from '@material-ui/icons';
import {Container, Item, TabContainer, TitleContainer} from "../../Theme/StyledComponents/Profile";
import ProfileSettingBarHoc from "../HOC/ProfileSettingBarHoc";
import Personal from "./Personal";
import Subscription from "./Subscription";
import Privacy from "./Privacy";
import Payment from "./Payment";
import Settings from "./Settings";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";

const tabsItem = [
    {
        link: '/personal',
        icon: <Person/>,
        id: 'personal',
        content: <Personal/>,
        activeClassName: 'activeLink'
    },
    {
        link: '/payment',
        icon: <PaymentIcon/>,
        id: 'payment',
        content: <Payment/>,
        activeClassName: 'activeLink'
    },
    {
        link: '/subscription',
        icon: <Subscriptions/>,
        id: 'subscriptions',
        content: <Subscription/>,
        activeClassName: 'activeLink'
    },
    {
        link: '/privacy',
        icon: <Favorite/>,
        id: 'privacy',
        content: <Privacy/>,
        activeClassName: 'activeLink'
    },
    {
        link: '/settings',
        icon: <SettingsIcon/>,
        id: 'settings',
        content: <Settings/>,
        activeClassName: 'activeLink'
    },
];

const ProfileComponent = () => {
    const [click, setClick] = useState(false);

    return (
        <Container>
            <TitleContainer>profile setting</TitleContainer>
            <HashRouter>
                <TabContainer role="tablist">
                    {tabsItem.map((tabItem, index) => (
                        <Item
                            onClick={() => setClick(false)}
                            to={tabItem.link}
                            key={index}
                            activeClassName={tabItem.activeClassName}
                        >
                            {tabItem.icon}
                        </Item>
                    ))}
                </TabContainer>

                <Switch>
                    {tabsItem.map(tabItem => (
                        <Route key={tabItem.id} path={`${tabItem.link}`}>
                            {tabItem.content}
                        </Route>
                    ))}
                    <Route render={() => <Redirect to={tabsItem[0] ? tabsItem[0].link : "/profile"}/>}/>
                </Switch>
            </HashRouter>
        </Container>
    )
};

const Profile = ProfileSettingBarHoc(ProfileComponent);

export default Profile;
