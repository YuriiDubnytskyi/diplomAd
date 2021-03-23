import React from "react";
import "./News.scss";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "./../../components/NewsItem/NewsItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteNews } from "./../../store/actions/actionNews";
import { useHistory, Link } from "react-router-dom";
import { Popconfirm, Table, Space } from "antd";

const News = () => {
    const news = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteItem = (id) => {
        dispatch(deleteNews(id));
    };

    const moreInfo = (id) => {
        history.push("/newsID/" + id);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Short Description",
            dataIndex: "shortDescription",
            key: "shortDescription",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                news.news.length >= 1 ? (
                    <Space size="large">
                        <Link to={`/newsID/${record._id}`}>More</Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record._id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];

    return (
        <div>
            <div className="news__list">
                {news.news ? (
                    <Table columns={columns} dataSource={news.news} />
                ) : // ? news.news.map((el) => (
                //       <NewsItem
                //           key={el._id}
                //           title={el.title}
                //           description={el.shortDescription}
                //           img={el.imageMain}
                //           loading={news.deleteNewsLoading}
                //           del={() => deleteItem(el._id)}
                //           more={() => moreInfo(el._id)}
                //       />
                //   ))
                // : null}
                null}
            </div>

            <AddNewBtn link="addnews" />
        </div>
    );
};

News.whyDidYouRender = true;
export default React.memo(News);
