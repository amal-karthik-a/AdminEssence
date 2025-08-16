import React, { useState } from "react";
import './../styles/Home.css'

const Notification = ({visible}) => {
    const [visibleVar, setVisible] = useState(visible);
    return (
        <div className="coco-dashboard-customers-content">
            <div className="coco-dashboard-customers-header">
                <h2>Notification</h2>
            </div>
        </div>
    );
};

export default Notification;