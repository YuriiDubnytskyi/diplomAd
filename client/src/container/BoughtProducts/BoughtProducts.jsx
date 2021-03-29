import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ResponsiveCalendar } from "@nivo/calendar";
import "./BoughtProducts.scss";
import { getDataByDate } from "./../../store/actions/actionAnalitic";
import { DatePicker, Button, Descriptions, Badge } from "antd";

const { RangePicker } = DatePicker;

const BoughtProducts = () => {
    const dataBoughtByTime = useSelector((state) => state.analitic.productsBought);

    const [dataByTime, setDataByTime] = useState([]);

    useEffect(() => {
        const arr = [];
        dataBoughtByTime.forEach((el) => {
            arr.push({
                day: `${new Date(`${el.saleDate}`).getFullYear()}-${
                    new Date(`${el.saleDate}`).getMonth() + 1 > 9
                        ? new Date(`${el.saleDate}`).getMonth() + 1
                        : `0${new Date(`${el.saleDate}`).getMonth() + 1}`
                }-${
                    new Date(`${el.saleDate}`).getDate() > 9
                        ? new Date(`${el.saleDate}`).getDate()
                        : `0${new Date(`${el.saleDate}`).getDate()}`
                }`,
                totalSaleAmount: el.totalSaleAmount,
                dataBrand: [el.byBrand],
                value: el.totalSold,
            });
        });

        const arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr.length === 0) {
                break;
            }
            if (i + 1 < arr.length && arr[i].day === arr[i + 1].day) {
                arr2.push({
                    day: arr[i].day,
                    totalSaleAmount: arr[i].totalSaleAmount + arr[i + 1].totalSaleAmount,
                    dataBrand: arr[i].dataBrand.concat(arr[i + 1].dataBrand),
                    value: arr[i].value + arr[i + 1].value,
                });
                i += 1;
            } else {
                arr2.push(arr[i]);
            }
        }
        setDataByTime(arr2);
    }, [dataBoughtByTime]);

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const setTime = (e) => {
        setStartTime(e[0]._d.toISOString());
        setEndTime(e[1]._d.toISOString());
    };
    const dispatch = useDispatch();

    const getStatusTime = () => {
        setDataByTime([]);
        dispatch(getDataByDate(startTime, endTime));
    };
    const [dataDay, setDataDay] = useState("");

    const onSetDay = (e, d) => {
        let arr = [];
        e.data.dataBrand.map((el) => {
            for (const [key, value] of Object.entries(el)) {
                arr.push(`${key}: ${value}`);
            }
        });
        e.data.boughtPro = [...arr];
        setDataDay(e.data);
    };

    return (
        <div>
            <div className="statusTime__chart">
                <div className="statusTime">
                    <RangePicker onChange={setTime} />
                    <Button onClick={getStatusTime}>Search</Button>
                </div>
            </div>
            <div style={{ height: 400 }}>
                {dataByTime.length !== 0 ? (
                    <ResponsiveCalendar
                        data={dataByTime}
                        from={`${new Date(`${startTime}`).getFullYear()}-${
                            new Date(`${startTime}`).getMonth() + 1 > 9
                                ? new Date(`${startTime}`).getMonth() + 1
                                : `0${new Date(`${startTime}`).getMonth() + 1}`
                        }-${
                            new Date(`${startTime}`).getDate() > 9
                                ? new Date(`${startTime}`).getDate()
                                : `0${new Date(`${startTime}`).getDate()}`
                        }`}
                        to={`${new Date(`${endTime}`).getFullYear()}-${
                            new Date(`${endTime}`).getMonth() + 1 > 9
                                ? new Date(`${endTime}`).getMonth() + 1
                                : `0${new Date(`${endTime}`).getMonth() + 1}`
                        }-${
                            new Date(`${endTime}`).getDate() > 9
                                ? new Date(`${endTime}`).getDate()
                                : `0${new Date(`${endTime}`).getDate()}`
                        }`}
                        emptyColor="#eeeeee"
                        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                        minValue="auto"
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        yearSpacing={40}
                        yearLegendOffset={14}
                        monthBorderColor="#ffffff"
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                        onClick={onSetDay}
                        legends={[
                            {
                                anchor: "bottom-right",
                                direction: "row",
                                translateY: 36,
                                itemCount: 4,
                                itemWidth: 42,
                                itemHeight: 36,
                                itemsSpacing: 14,
                                itemDirection: "right-to-left",
                            },
                        ]}
                    />
                ) : null}
            </div>
            {dataDay !== "" ? (
                <div className="details__day">
                    <Descriptions title="Day Details" bordered={true}>
                        <Descriptions.Item label="Day">{dataDay.day}</Descriptions.Item>
                        <Descriptions.Item label="Total Sum">{dataDay.totalSaleAmount}</Descriptions.Item>
                        <Descriptions.Item label="Value">{dataDay.value}</Descriptions.Item>
                        <Descriptions.Item label="Sold Products Info">
                            {dataDay.boughtPro.map((el) => (
                                <p>{el}</p>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            ) : null}
        </div>
    );
};

export default React.memo(BoughtProducts);
