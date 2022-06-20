import React, { Component } from "react";
import SettingNav from "../../common/setting nav/settingNav";
import "./setting.css"

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="c-settings-page">
                <SettingNav/>
            </div>
        );
    }
}
export default Setting;
