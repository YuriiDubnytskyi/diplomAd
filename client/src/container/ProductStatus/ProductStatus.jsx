import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ResponsivePie } from "@nivo/pie";
import "./ProductStatus.scss";
import { getBoughtByDate } from "./../../store/actions/actionAnalitic";
import { DatePicker, Button } from "antd";

const { RangePicker } = DatePicker;

const ProductStatus = () => {
    const dataProduct = useSelector((state) => state.analitic.productsStatus);
    const dataProductByTime = useSelector((state) => state.analitic.boughtDate);

    const [data, setData] = useState([]);
    const [dataByTime, setDataByTime] = useState([]);

    useEffect(() => {
        const arr = [];
        dataProduct.forEach((el) => {
            arr.push({
                id: el._id,
                label: el._id,
                value: el.count,
            });
        });
        setData(arr);
    }, []);

    useEffect(() => {
        const arr = [];
        dataProductByTime.forEach((el) => {
            arr.push({
                id: el._id,
                label: el._id,
                value: el.count,
            });
        });
        setDataByTime(arr);
    }, [dataProductByTime]);

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const setTime = (e) => {
        setStartTime(e[0]._d.toISOString());
        setEndTime(e[1]._d.toISOString());
    };
    const dispatch = useDispatch();

    const getStatusTime = () => {
        dispatch(getBoughtByDate(startTime, endTime));
    };

    return (
        <div>
            <div style={{ height: 400 }} className="status__chart">
                <div className="status__chart-info__box info__box">
                    <h2 className="info__box-title">Інформація</h2>
                    <p className="info__box-text">Аналітика щодо статусу покупок.</p>
                </div>
                <div className="status__chart-analitic">
                    <ResponsivePie
                        data={data}
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
                </div>
            </div>
            <div style={{ height: 400 }} className="statusTime__chart">
                <div className="statusTime">
                    <RangePicker onChange={setTime} />
                    <Button onClick={getStatusTime}>Search</Button>
                </div>
                <div className="statusTime__chart-analitic">
                    {dataByTime.length !== 0 ? (
                        <ResponsivePie
                            data={dataByTime}
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
                    ) : null}
                </div>
            </div>
        </div>
    );
};

ProductStatus.whyDidYouRender = true;
export default React.memo(ProductStatus);
