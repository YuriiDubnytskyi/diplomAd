import React, { useState } from "react";
import AddNewsForm from "./../../components/AddNewsForm/AddNewsForm";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewNews, addNewsFail } from "./../../store/actions/actionNews";
import axios from "axios";
import "./AddNews.scss";

const AddNews = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.news);

    const onReset = () => {
        form.resetFields();
    };
    const [imagesArray, setImagesArray] = useState([]);

    const setImage = async (imagesArray) => {
        try {
            let data = "";
            data = new FormData();
            data.append("file", imagesArray[0].originFileObj);
            data.append("upload_preset", "diploma");
            data.append("folder", `/news`);
            const res = await axios.post("https://api.cloudinary.com/v1_1/yu7799/image/upload", data);
            return res.data.url;
        } catch (error) {
            dispatch(addNewsFail(error));
        }
    };

    const onFinish = async (values) => {
        console.log("Success:", values);
        if (imagesArray.length === 0) {
            dispatch(addNewsFail("Please Add Photos"));
            return;
        }
        const imgSrc = await setImage(imagesArray);
        dispatch(
            addNewNews({
                title: values.title,
                shortDescription: values.shortDescription,
                imageMain: imgSrc,
                fullDescription: values.fullDescription,
            })
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="addnews__block">
            <AddNewsForm
                form={form}
                loading={data.addNewsLoading}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onReset={onReset}
                setImagesArray={setImagesArray}
            />
            <ErrorBlock mess={data.addNewsErr} isError={data.addNewsIsErr} type="news" />
        </div>
    );
};

AddNews.whyDidYouRender = true;
export default React.memo(AddNews);
