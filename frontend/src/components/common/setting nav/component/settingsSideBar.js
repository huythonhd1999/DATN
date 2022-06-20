//import useState hook to create menu collapse state
import React from "react";
import { Link } from "react-router-dom";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./settingsSideBar.css";

const SettingSideBar = () => {
    
    return (
        <div id="settingSideBar">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar >
                <SidebarHeader>
                    <Menu iconShape="square">
                        <MenuItem>
                            Setting
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square" popperArrow={true}>
                        <MenuItem >
                            Shop
                            <Link to="/settings/shop" />
                        </MenuItem>
                        <MenuItem >
                            Product Categories
                            <Link to="/settings/product-categories" />
                        </MenuItem>
                        <MenuItem>
                            Product Options
                            <Link to="/settings/product-options" />
                        </MenuItem>
                        <MenuItem >
                            Users
                            <Link to="/settings/users" />
                        </MenuItem>
                        <MenuItem >
                            Discount Rules
                            <Link to="/settings/discount-rules" />
                        </MenuItem>
                        <MenuItem >
                            Taxes
                            <Link to="/settings/taxes" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
};

export default SettingSideBar;
