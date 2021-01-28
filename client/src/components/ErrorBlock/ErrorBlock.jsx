import React from "react";
import "./ErrorBlock.scss";
import { Alert } from "antd";

const ErrorBlock = ({ mess, isError, type }) => {
    return (
        <div className={`error__block error-block--${type}`}>
            {isError ? <Alert message="Error" description={mess} type="error" showIcon /> : null}
        </div>
    );
};

ErrorBlock.whyDidYouRender = true;
export default React.memo(ErrorBlock);
