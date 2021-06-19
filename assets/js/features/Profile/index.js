import React, {useState} from "react";
import MotionHoc from "../HOC/MotionHoc";
import {Favorite, Payment, Person, Settings, Subscriptions} from '@material-ui/icons';
import {
    Container,
    Content,
    Item,
    TabContainer,
    TabContent,
    TitleContainer,
    TitleContent
} from "../../StyledComponents/Profile";

const ProfileComponent = () => {
    const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
    return (
        <Container>
            <TitleContainer>profile setting</TitleContainer>
            <TabContainer>
                <Item
                    onClick={() => setClick(false)}
                    exact
                    activeClassName="active"
                    to="/personal"
                >
                    <Person />
                </Item>
                <Item
                    onClick={() => setClick(false)}
                    exact
                    activeClassName="active"
                    to="/payment"
                >
                    <Payment />
                </Item>
                <Item
                    onClick={() => setClick(false)}
                    exact
                    activeClassName="active"
                    to="/subscription"
                >
                    <Subscriptions />
                </Item>
                <Item
                    onClick={() => setClick(false)}
                    exact
                    activeClassName="active"
                    to="/privacy"
                >
                    <Favorite />
                </Item>
                <Item
                    onClick={() => setClick(false)}
                    exact
                    activeClassName="active"
                    to="/settings"
                >
                    <Settings />
                </Item>
            </TabContainer>
            <TabContent>
                <Content>
                    <TitleContent>Personal Info</TitleContent>
                </Content>

                <Content>
                    <TitleContent>Payment Info</TitleContent>
                </Content>

                <Content>
                    <TitleContent>Your Subscription</TitleContent>
                </Content>

                <Content>
                    <TitleContent>Privacy Settings</TitleContent>
                </Content>

                <Content>
                    <TitleContent>Account Settings</TitleContent>
                </Content>
            </TabContent>
        </Container>
    )
};

const Profile = MotionHoc(ProfileComponent);

export default Profile;
