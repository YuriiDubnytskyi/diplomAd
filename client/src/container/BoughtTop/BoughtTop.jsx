import React, { useState, useEffect } from "react";
import "./BoughtTop.scss";
import { useSelector } from "react-redux";
import { Card } from "antd";

const BoughtTop = () => {
    const data = useSelector((state) => state.analitic.productsTop);

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        let arr = data.map((el) => {
            let a = [];
            for (const [key, value] of Object.entries(el.byBrand)) {
                a.push({ name: key, count: value });
            }
            return { products: a.sort((a, b) => b.count - a.count), name: el.subTitle };
        });
        setTopProducts(arr);
    }, [data]);

    return (
        <>
            <div className="top-bought__conatiner">
                {topProducts
                    ? topProducts.map((el) => {
                          return (
                              <Card title={el.name} style={{ width: 300 }}>
                                  {el.products.map((el) => (
                                      <p>
                                          {el.name}--{el.count}
                                      </p>
                                  ))}
                              </Card>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

BoughtTop.whyDidYouRender = true;
export default BoughtTop;
