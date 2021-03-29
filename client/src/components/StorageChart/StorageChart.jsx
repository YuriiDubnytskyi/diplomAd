import React, { useEffect, useState } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import "./StorageChart.scss";

const StorageChart = ({ allData }) => {
    return (
        <div style={{ height: 400 }}>
            <ResponsiveSunburst
                data={allData}
                margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="count"
                cornerRadius={2}
                borderWidth={1}
                borderColor="white"
                colors={{ scheme: "nivo" }}
                childColor={{ from: "color" }}
                animate={false}
                motionConfig="gentle"
                isInteractive={true}
                tooltip={function (e) {
                    return (
                        <div className="storage__pointer-box">
                            <p>Name - {e.data.name}</p>
                            <p>Value - {e.value}</p>
                            <p>Persent - {e.formattedValue}</p>
                        </div>
                    );
                }}
            />
        </div>
    );
};

StorageChart.whyDidYouRender = true;
export default React.memo(StorageChart);
