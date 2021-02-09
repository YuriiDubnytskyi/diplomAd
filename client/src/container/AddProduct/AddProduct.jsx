import React, { useState } from "react";
import "./AddProduct.scss";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Form, Steps, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProductInfo, addProductFail } from "./../../store/actions/actionManager";
import axios from "axios";
import AddProductInfoForm from "./../../components/AddProductInfoForm/AddProductInfoForm";
import AddProductProperties from "./../../components/AddProductProperties/AddProductProperties";
import AdminImageLoader from "./../../components/AdminImageLoader/AdminImageLoader";

const { Step } = Steps;

const AddProduct = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const data = useSelector((state) => state.manager);

    const [imagesArray, setImagesArray] = useState([]);
    const [step, setStep] = useState(0);
    const [properties, setProperties] = useState([]);
    const [info, setInfo] = useState([]);
    const [idSubProduct, setIdSubProduct] = useState(undefined);
    const [imgSrc, setImgSrc] = useState([]);

    const onReset = () => {
        form.resetFields();
    };

    const onFinishProperty = (values) => {
        setProperties(values);
        setStep(step + 1);
    };
    const onFinishInfo = (values) => {
        if (idSubProduct) {
            const isExist = data.fullProducts.some((el) =>
                el.subTitle.some((el) => el.product.some((el) => el.name === values.name))
            );
            console.log(isExist);
            if (isExist) {
                dispatch(addProductFail("Product with this name is already exist"));
            } else {
                setInfo(values);
                setStep(step + 1);
            }
        } else {
            dispatch(addProductFail("Please Select Sub Title"));
        }
    };
    const onChangeTree = (value) => {
        console.log(value);
        setIdSubProduct(value);
    };
    const setImage = () => {
        let arr = [];
        let data;
        imagesArray.forEach(async (el, i) => {
            data = new FormData();
            data.append("file", el.originFileObj);
            data.append("upload_preset", "diploma");
            data.append("folder", `/product/${info.name}`);
            data.append("tags", `${info.name}`);
            await axios.post("https://api.cloudinary.com/v1_1/yu7799/image/upload", data).then((res) => {
                console.log(res);
                arr.push(res.data.url);
                if (arr.length === imagesArray.length) {
                    setImgSrc(arr);
                    setStep(step + 1);
                }
            });
        });
    };

    const onFinish = () => {
        dispatch(
            createProductInfo(
                {
                    idSubProduct,
                    name: info.name,
                    price: info.price,
                    shortInfo: info.shortInfo,
                    image: imgSrc,
                    info: info.info,
                    imgFolder: info.name,
                    producer: info.producer,
                    properties,
                },
                idSubProduct
            )
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const renderSwitch = (step) => {
        switch (step) {
            case 0:
                return (
                    <AddProductInfoForm
                        form={form}
                        categoriesList={data.fullProducts}
                        onFinish={onFinishInfo}
                        onFinishFailed={onFinishFailed}
                        onReset={onReset}
                        onChangeTree={onChangeTree}
                        idSubProduct={idSubProduct}
                    />
                );
            case 1:
                return <AddProductProperties onFinishProperty={onFinishProperty} />;
            case 2:
                return (
                    <>
                        <AdminImageLoader setImagesArray={setImagesArray} />
                        <Button onClick={setImage}>Submit</Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button onClick={onFinish} loading={data.addProductLoading}>
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
            title: "Add Info",
        },
        {
            title: "Add Properties",
        },
        {
            title: "Add Images",
        },
        {
            title: "Add Product",
        },
    ];

    return (
        <div className="addproduct__block">
            <div className="addproduct__container">
                <div>
                    <Steps current={step}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                <div>{renderSwitch(step)}</div>
            </div>
            <ErrorBlock mess={data.addProductErrMess} isError={data.addProductErr} type="large" />
        </div>
    );
};

AddProduct.whyDidYouRender = true;
export default AddProduct;
