import React from "react";
import { ResponsivePie } from "@nivo/pie";

const UsersChart = ({ dataUser }) => {
    return (
        <ResponsivePie
            data={[
                {
                    id: "Верифіковані",
                    label: "Верифіковані",
                    value: dataUser.verify,
                },
                {
                    id: "Не верифіковані",
                    label: "Не верифіковані",
                    value: dataUser.notVerify,
                },
            ]}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

UsersChart.whyDidYouRender = true;
export default React.memo(UsersChart);
