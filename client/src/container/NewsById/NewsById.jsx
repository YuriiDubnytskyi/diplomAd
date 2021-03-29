import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Image, PageHeader } from "antd";
import "./NewsById.scss";

const NewsById = () => {
    const { id } = useParams();
    const news = useSelector((state) => state.news.news.filter((el) => el._id === id));

    return (
        <div className="main__news">
            <PageHeader ghost={false} onBack={() => window.history.back()} title="Назад"></PageHeader>
            <h2 className="main__news-title">{news[0].title}</h2>
            <div className="main__news-info">
                <Image src={news[0].imageMain} width={300} />
                <p className="main__news-description">{news[0].fullDescription}</p>
            </div>
        </div>
    );
};

NewsById.whyDidYouRender = true;
export default React.memo(NewsById);
