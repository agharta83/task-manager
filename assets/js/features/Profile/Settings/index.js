import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const SettingsComponent = () => {
    return (
        <TabContent>
            <Content>
                <TitleContent>Settings</TitleContent>
            </Content>
        </TabContent>
    );
};

const Settings = ProfileSettingBarHoc(SettingsComponent);

export default Settings;
