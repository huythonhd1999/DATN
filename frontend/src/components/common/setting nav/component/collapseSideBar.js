//import useState hook to create menu collapse state
import { Link } from "react-router-dom";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import {
    FiHome,
    FiLogOut,
    FiShoppingCart,
    FiFileText,
    FiBriefcase,
    FiSettings,
} from "react-icons/fi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./collapseSideBar.css";

const CollapseSideBar = () => {
    //create a custom function that will change menucollapse state from false to true and true to false
    return (
        <div id="collapseNavBar">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={true}>
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
                            <Link to="/settings" />
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

export default CollapseSideBar;
