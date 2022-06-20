//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle,
    FiShoppingCart,
    FiFileText,
    FiBriefcase,
    FiSettings,
} from "react-icons/fi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./navSideBar.css";

const NavSideBar = () => {
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div id="navSideBar">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>
                    <Menu iconShape="square">
                        <MenuItem
                            onClick={menuIconClick}
                            icon={
                                menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />
                            }
                        >
                            Menu
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square" popperArrow={true}>
                        <MenuItem icon={<FiHome />}>
                            DashBoard
                            <Link to="/dashboard" />
                        </MenuItem>
                        <MenuItem icon={<FiShoppingCart />}>
                            Sell
                            <Link to="/sell" />
                        </MenuItem>
                        <MenuItem icon={<FiFileText />}>
                            Receipts
                            <Link to="/receipts" />
                        </MenuItem>
                        <MenuItem icon={<FiBriefcase />}>
                            Petty Cash
                            <Link to="/expenses" />
                        </MenuItem>
                        <MenuItem icon={<FiSettings />}>
                            Settings
                            <Link to="/settings/shop" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem icon={<FiLogOut />}>
                            Logout
                            <Link to="/login" />
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    );
};

export default NavSideBar;
