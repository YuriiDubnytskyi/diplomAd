import React from "react";
import "./UserInfoForm.scss";

const UserInfoForm = ({ name, surname, email, emailVerify, age, phone, gender }) => {
    return (
        <>
            <p className="info_item">Name -- {name}</p>
            <p className="info_item">Surname -- {surname}</p>
            <p className="info_item">Email -- {email}</p>
            <p className="info_item">EmailVerify -- {emailVerify ? "yes" : "no"}</p>
            <p className="info_item">Age -- {age}</p>
            <p className="info_item">Phone -- {phone}</p>
            <p className="info_item">Gender -- {gender}</p>
        </>
    );
};

UserInfoForm.whyDidYouRender = true;
export default UserInfoForm;
