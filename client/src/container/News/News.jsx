import React from "react";
import "./News.scss";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "./../../components/NewsItem/NewsItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteNews } from "./../../store/actions/actionNews";
import { useHistory } from "react-router-dom";

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
    return (
        <div>
            <div className="news__list">
                {news.news
                    ? news.news.map((el) => (
                          <NewsItem
                              key={el._id}
                              title={el.title}
                              description={el.shortDescription}
                              img={el.imageMain}
                              loading={news.deleteNewsLoading}
                              del={() => deleteItem(el._id)}
                              more={() => moreInfo(el._id)}
                          />
                      ))
                    : null}
            </div>

            <AddNewBtn link="addnews" />
        </div>
    );
};

News.whyDidYouRender = true;
export default React.memo(News);
