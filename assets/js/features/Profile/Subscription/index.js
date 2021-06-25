import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const SubscriptionComponent = () => {
    return (
        <TabContent>
            <Content>
                <TitleContent>Subscription</TitleContent>
            </Content>
        </TabContent>
    );
};

const Subscription = ProfileSettingBarHoc(SubscriptionComponent);

export default Subscription;
