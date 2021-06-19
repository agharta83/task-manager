import React, {useState} from "react";
import {Favorite, Payment as PaymentIcon, Person, Settings as SettingsIcon, Subscriptions} from '@material-ui/icons';
import {Container, Content, Item, TabContainer, TabContent, TitleContainer} from "../../Theme/StyledComponents/Profile";
import ProfileSettingBarHoc from "../HOC/ProfileSettingBarHoc";
import Personal from "./Personal";
import Subscription from "./Subscription";
import Privacy from "./Privacy";
import Payment from "./Payment";
import Settings from "./Settings";
import {Route, Switch, Redirect} from "react-router";
import {HashRouter} from "react-router-dom";

const tabsItem = [
    {
        link: 'personal',
        icon: <Person/>,
        id: 'personal',
        content: <Personal/>,
    },
    {
        link: 'payment',
        icon: <PaymentIcon/>,
        id: 'payment',
        content: <Payment/>,
    },
    {
        link: 'subscription',
        icon: <Subscriptions/>,
        id: 'subscriptions',
        content: <Subscription/>,
    },
    {
        link: 'privacy',
        icon: <Favorite/>,
        id: 'privacy',
        content: <Privacy/>,
    },
    {
        link: 'settings',
        icon: <SettingsIcon/>,
        id: 'settings',
        content: <Settings/>,
    },
];

const ProfileComponent = () => {
    const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
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
                        >
                            {tabItem.icon}
                        </Item>
                    ))}
                </TabContainer>
            </HashRouter>

            <TabContent>
                <Switch>
                    {tabsItem.map(tabItem => (
                        <Route key={tabItem.id} path={`/${tabItem.link}`}>
                            {tabItem.content}
                        </Route>
                    ))}
                    {/*<Route render={() => <Redirect to={tabsItem[0] ? tabsItem[0].link : "/profile"} />} />*/}
                </Switch>
                {/*{tabsItem.map((tabItem, index) => (*/}
                {/*    <Content*/}
                {/*        id={tabItem.id}*/}
                {/*        key={index}*/}

                {/*    >*/}
                {/*        {tabItem.content}*/}
                {/*    </Content>*/}
                {/*))}*/}
            </TabContent>
        </Container>
    )
};

const Profile = ProfileSettingBarHoc(ProfileComponent);

export default Profile;
