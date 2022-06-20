import React, { Component } from "react";

import SettingNav from "../../../common/setting nav/settingNav";

class ProductOptions extends Component {
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
export default ProductOptions;
