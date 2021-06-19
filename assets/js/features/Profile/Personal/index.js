import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const PersonalComponent = () => {
    return (
        <TabContent>
            <TitleContent>Privacy</TitleContent>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
