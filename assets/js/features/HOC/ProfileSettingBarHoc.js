//higher order component to add same functionality to each page

import { motion } from "framer-motion";
import React from "react";

const ProfileSettingBarHoc = (Component) => {
    return function HOC() {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { duration: 0.5, type: "tween" },
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.5, type: "tween", ease: "ease" },
                }}
            >
                <Component />
            </motion.div>
        );
    };
};

export default ProfileSettingBarHoc;
