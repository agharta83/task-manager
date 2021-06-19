import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const SettingsComponent = () => {
    return (
        <TabContent>
            <TitleContent>Settings</TitleContent>
        </TabContent>
    );
};

const Settings = ProfileSettingBarHoc(SettingsComponent);

export default Settings;
