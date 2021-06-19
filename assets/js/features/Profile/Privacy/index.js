import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const PrivacyComponent = () => {
    return (
        <TabContent>
            <TitleContent>Privacy</TitleContent>
        </TabContent>
    );
};

const Privacy = ProfileSettingBarHoc(PrivacyComponent);

export default Privacy;
