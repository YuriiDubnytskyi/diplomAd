import React from "react";
import "./NewsItem.scss";
import ButtonItem from "./../ButtonItem/ButtonItem";
import { Image } from "antd";

const NewsItem = ({ title, description, img, loading, del, more }) => {
    return (
        <div className="news__item news-item">
            <div className="news-item-image">
                <Image alt="news-img" src={img} />
            </div>
            <div className="news-item-info item-info" onClick={more}>
                <h3 className="item-info-title">{title}</h3>
                <p className="item-info-description">{description}</p>
            </div>
            <ButtonItem type="Delete" onClick={del} loading={loading} />
        </div>
    );
};

NewsItem.whyDidYouRender = true;
export default React.memo(NewsItem);
