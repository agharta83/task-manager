import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";

const DocumentsComponent = () => {
    return <h1>Documents</h1>;
};

const Documents = SideBarMotionHoc(DocumentsComponent);

export default Documents;
