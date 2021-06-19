import React from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {TitleContent} from "../../../Theme/StyledComponents/Profile";

const PaymentComponent = () => {
    return (
        <TitleContent>Payment</TitleContent>
    );
};

const Payment = ProfileSettingBarHoc(PaymentComponent);

export default Payment;
