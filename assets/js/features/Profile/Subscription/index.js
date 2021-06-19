import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const SubscriptionComponent = () => {
    return (
        <TabContent>
            <TitleContent>Subscription</TitleContent>
        </TabContent>
    );
};

const Subscription = ProfileSettingBarHoc(SubscriptionComponent);

export default Subscription;
