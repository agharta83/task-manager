import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";

const PaymentComponent = () => {
    return (
        <TabContent>
            <Content>
                <TitleContent>Payment</TitleContent>
            </Content>
        </TabContent>

    );
};

const Payment = ProfileSettingBarHoc(PaymentComponent);

export default Payment;
