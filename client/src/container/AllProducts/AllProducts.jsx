import React from "react";
import { useSelector } from "react-redux";
import { Collapse, List } from "antd";

const { Panel } = Collapse;

const AllProducts = () => {
    const data = useSelector((state) => state.admin.products);
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
    `;
    return (
        <div>
            <Collapse>
                {data
                    ? data.map((main, i) => (
                          <Panel header={main.productTitle} key={i}>
                              <Collapse defaultActiveKey={i}>
                                  {main.subTitle
                                      ? main.subTitle.map((sub, i) => (
                                            <Panel header={sub.productSubTitle} key={i}>
                                                {sub.product ? (
                                                    <List
                                                        size="small"
                                                        bordered
                                                        dataSource={sub.product}
                                                        renderItem={(item) => <List.Item>{item.name}</List.Item>}
                                                    />
                                                ) : null}
                                            </Panel>
                                        ))
                                      : null}
                              </Collapse>
                          </Panel>
                      ))
                    : null}
            </Collapse>
        </div>
    );
};

export default AllProducts;
