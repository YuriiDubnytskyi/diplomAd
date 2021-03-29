import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";
import { Select } from "antd";
import { ResponsivePie } from "@nivo/pie";
import "./Storage.scss";
import StorageChart from "./../../components/StorageChart/StorageChart";

const { Option } = Select;

const Storage = () => {
    const dataAll = useSelector((state) => state.analitic.storage.all);
    const dataTitle = useSelector((state) => state.analitic.storage.byTitle);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState();
    const [loadingTitle, setLoadingTitle] = useState(true);
    const [allDataTitle, setAllDataTitle] = useState();
    const [allDataTitleBar, setAllDataTitleBar] = useState();

    useEffect(() => {
        let obj = { name: "nivo", children: [] };
        dataAll.forEach((el) => {
            let childObj = [];
            el.subTitle.forEach((elSub) => {
                childObj.push({ name: elSub.productSubTitle, count: elSub.product[0].count });
            });
            obj.children = [
                ...obj.children,
                {
                    name: el.productTitle,
                    children: childObj,
                },
            ];
        });
        setAllData(obj);
        setLoading(false);
    }, []);

    const handleChange = (value) => {
        setLoadingTitle(true);
        const data = [];
        const dataBar = [];
        dataTitle.forEach((el) => {
            if (el.list[0]._id === value) {
                data.push({ id: el.name, label: el.name, value: el.count });
                dataBar.push({ label: el.name, value: el.count });
            }
        });
        setAllDataTitle(data);
        setAllDataTitleBar(dataBar);
        setLoadingTitle(false);
    };

    return (
        <div className="storage__container">
            <div className="storage__main-chart">
                <div className="storage__container-info info__box">
                    <h2 className="info__box-title">Інформація</h2>
                    <p className="info__box-text">
                        Ви можете дізнатись скільки є товарів на складі, яке їх число і відсоток.
                        <br />
                        Також ви можете переглянути інформіцію про конкретну категорію товару.
                    </p>
                </div>
                <div className="storage__chart">{!loading ? <StorageChart allData={allData} /> : null}</div>
            </div>
            <div className="storage__submain-info">
                <p className="submain-info__text">Виберіть будь ласка категорію щоб побачити статистику.</p>
                {!loading ? (
                    <Select style={{ width: 220 }} onChange={handleChange}>
                        {allData.children.map((el) =>
                            el.children.map((el) => <Option value={el.name}>{el.name}</Option>)
                        )}
                    </Select>
                ) : null}
            </div>

            {!loading ? (
                <>
                    {!loadingTitle ? (
                        <>
                            <div style={{ height: 400 }}>
                                <ResponsivePie
                                    data={allDataTitle}
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
                                            anchor: "top-left",
                                            direction: "column",
                                            justify: false,
                                            translateX: 0,
                                            translateY: 0,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemsSpacing: 0,
                                            symbolSize: 20,
                                            itemDirection: "left-to-right",
                                        },
                                    ]}
                                />
                            </div>
                            <div style={allDataTitleBar.length > 15 ? { height: 600 } : { height: 300 }}>
                                <ResponsiveBar
                                    data={allDataTitleBar}
                                    keys={["value"]}
                                    enableGridX={true}
                                    indexBy="label"
                                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                                    padding={0.3}
                                    layout="horizontal"
                                    valueScale={{ type: "linear" }}
                                    indexScale={{ type: "band", round: true }}
                                    colors={{ scheme: "nivo" }}
                                    defs={[
                                        {
                                            id: "dots",
                                            type: "patternDots",
                                            background: "inherit",
                                            color: "#38bcb2",
                                            size: 4,
                                            padding: 1,
                                            stagger: true,
                                        },
                                        {
                                            id: "lines",
                                            type: "patternLines",
                                            background: "inherit",
                                            color: "#eed312",
                                            rotation: -45,
                                            lineWidth: 6,
                                            spacing: 10,
                                        },
                                    ]}
                                    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "count",
                                        legendPosition: "middle",
                                        legendOffset: 32,
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "",
                                        legendPosition: "middle",
                                        legendOffset: -40,
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                                    legends={[
                                        {
                                            dataFrom: "keys",
                                            anchor: "bottom-right",
                                            direction: "column",
                                            justify: false,
                                            translateX: 120,
                                            translateY: 0,
                                            itemsSpacing: 2,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemDirection: "left-to-right",
                                            itemOpacity: 0.85,
                                            symbolSize: 20,
                                            effects: [
                                                {
                                                    on: "hover",
                                                    style: {
                                                        itemOpacity: 1,
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                />
                            </div>
                        </>
                    ) : null}
                </>
            ) : null}
        </div>
    );
};

Storage.whyDidYouRender = true;
export default React.memo(Storage);
