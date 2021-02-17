import React from "react";
import "./ArchiveProducts.scss";
import { useSelector } from "react-redux";
import SellingArchiveItem from "./../../components/SellingArchiveItem/SellingArchiveItem";

const ArchiveProducts = () => {
    const data = useSelector((state) => state.selling.archive);
    return (
        <>
            <div className="selling__conatiner">
                {data
                    ? data.map((el) => (
                          <SellingArchiveItem
                              name={el.user[0].name}
                              adress={el.adress}
                              product={el.product}
                              status={el.status}
                              isOld={el.isOld}
                          />
                      ))
                    : null}
            </div>
        </>
    );
};

ArchiveProducts.whyDidYouRender = true;
export default ArchiveProducts;
