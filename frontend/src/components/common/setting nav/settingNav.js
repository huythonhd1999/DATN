import React, { Component } from "react";
import CollapseSideBar from "../../common/setting nav/component/collapseSideBar";
import SettingSideBar from "../../common/setting nav/component/settingsSideBar";
import "./settingNav.css"

class SettingNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="c-settings-nav">
                <div className="c-settings-nav-main-collapse">
                    <CollapseSideBar />
                </div>
                <div className="c-settings-nav-settings">
                    <SettingSideBar />
                </div>
            </div>
        );
    }
}
export default SettingNav;
