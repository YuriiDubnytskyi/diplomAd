import React from "react";
import "./SubCategories.scss";
import { useSelector } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";

const SubCategories = () => {
    const products = useSelector((state) => state.manager.fullProducts);

    const deleteSubCategories = (id) => {
        console.log("delete" + id);
    };

    return (
        <div>
            <div className="categories__list">
                {products.map((main) =>
                    main.subTitle
                        ? main.subTitle.map((el) => (
                              <ManagerItem
                                  key={el._id}
                                  loading="false"
                                  title={`${main.productTitle} - ${el.productSubTitle}`}
                                  del={() => deleteSubCategories(el._id)}
                              />
                          ))
                        : null
                )}
            </div>

            <AddNewBtn link="addsubcategorie" />
        </div>
    );
};

SubCategories.whyDidYouRender = true;
export default React.memo(SubCategories);
