import React, { useState, useEffect } from "react";
import "./ChangeProduct.scss";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Form, Steps, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeProductInfo } from "./../../store/actions/actionManager";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChangeProductInfoForm from "./../../components/ChangeProductInfoForm/ChangeProductInfoForm";
import AddProductProperties from "./../../components/AddProductProperties/AddProductProperties";
import AdminImageLoader from "./../../components/AdminImageLoader/AdminImageLoader";
import ChangeProperties from "./../../components/ChangeProperties/ChangeProperties";
import API from "./../../API/API";

const { Step } = Steps;

const AddProduct = () => {
    const { id } = useParams();
    const data = useSelector((state) => state.manager);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        data.fullProducts.forEach((main) =>
            main.subTitle.forEach((subMain) =>
                subMain.product.forEach((product) => {
                    if (product._id === id) {
                        setInfo({
                            name: product.name,
                            price: product.price,
                            shortInfo: product.shortInfo,
                            info: product.productDetail[0].info,
                            imgFolder: info.name,
                            producer: product.productDetail[0].producer,
                        });
                        setLoading(false);
                        product.productDetail[0].properties === null
                            ? setUpdateProperty([])
                            : setUpdateProperty(product.productDetail[0].properties);
                    }
                })
            )
        );
    }, []);
    //--------
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [imagesArray, setImagesArray] = useState([]);
    const [step, setStep] = useState(0);
    const [properties, setProperties] = useState([]);
    const [info, setInfo] = useState("");
    const [idListProduct, setIdListProduct] = useState(id);
    const [imgSrc, setImgSrc] = useState([]);
    const [skip, setSkip] = useState(false);
    const [updateProperty, setUpdateProperty] = useState([]);
    const [propertiesFinaly, setPropertiesFinaly] = useState([]);

    const onReset = () => {
        form.resetFields();
    };

    const onFinishPropertyUp = (values) => {
        let arr = [];
        for (let i = 0; ; i++) {
            if (values["property" + i] === undefined) {
                break;
            } else {
                arr.push({
                    property: values["property" + i],
                    value: values["value" + i],
                });
            }
        }
        console.log(arr);
        setUpdateProperty(arr);
    };

    const onFinishProperty = (values) => {
        setProperties(values.properties);
    };

    const onFinishPropertyFinaly = () => {
        setPropertiesFinaly([...updateProperty, ...properties]);
        setStep(step + 1);
    };
    const onFinishInfo = (values) => {
        setInfo(values);
        setStep(step + 1);
    };
    const skipImage = () => {
        setStep(step + 1);
        setSkip(true);
    };
    const setImage = async () => {
        let arr = [];
        let data;
        //const result = await API.delete("/manager/deleteByTag/" + "Nokia").then((res) => console.log(res));

        // imagesArray.forEach(async (el) => {
        //     data = new FormData();
        //     data.append("file", el.originFileObj);
        //     data.append("upload_preset", "diploma");
        //     data.append("folder", `/product/${info.name}`);
        //     data.append("tags", `${info.name}`);
        //     await axios.post("https://api.cloudinary.com/v1_1/yu7799/image/upload", data).then((res) => {
        //         console.log(res);
        //         arr.push(res.data.url);
        //         if (arr.length === imagesArray.length) {
        //             setImgSrc(arr);
        //             setStep(step + 1);
        //         }
        //     });
        // });
    };

    const onFinish = () => {
        dispatch(
            changeProductInfo(
                {
                    idListProduct,
                    name: info.name,
                    price: info.price,
                    shortInfo: info.shortInfo,
                    image: imgSrc,
                    skip,
                    info: info.info,
                    imgFolder: info.name,
                    producer: info.producer,
                    propertiesFinaly,
                },
                idListProduct
            )
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    //-------------
    const renderSwitch = (step) => {
        switch (step) {
            case 0:
                return (
                    <ChangeProductInfoForm
                        form={form}
                        onFinish={onFinishInfo}
                        onFinishFailed={onFinishFailed}
                        onReset={onReset}
                        info={info}
                    />
                );
            case 1:
                return (
                    <>
                        <ChangeProperties onFinishProperty={onFinishPropertyUp} dataProperty={updateProperty} />
                        <AddProductProperties onFinishProperty={onFinishProperty} />
                        <Button onClick={onFinishPropertyFinaly}>Submit Finaly</Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <AdminImageLoader setImagesArray={setImagesArray} />
                        {/* <Button onClick={setImage}>Submit</Button> */}
                        <Button onClick={skipImage}>Skip</Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button onClick={onFinish} loading={data.changeProductLoading}>
                            Submit
                        </Button>
                    </>
                );
            default:
                return "foo";
        }
    };

    const steps = [
        {
            title: "Change Info",
        },
        {
            title: "Change Properties",
        },
        {
            title: "Change Images",
        },
        {
            title: "Change Product",
        },
    ];

    return (
        <div className="changeproduct__block">
            <div className="changeproduct__container">
                <div>
                    <Steps current={step}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                <div>{renderSwitch(step)}</div>
            </div>
            <ErrorBlock mess={data.changeProductErrMess} isError={data.changeProductErr} type="large" />
        </div>
    );
};

AddProduct.whyDidYouRender = true;
export default AddProduct;
