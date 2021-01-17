import React, { useState } from "react";
import TitlePager from "./../../components/TitlePager/TitlePager";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearBucket } from "./../../store/actions/actionBucket";
import { clearBucketUser } from "./../../store/actions/actionsUser";
import API from "./../../API/API";
import "./BuyProduct.scss";
import BillingForm from "./../../components/BillingForm/BillingForm";

const BuyProduct = () => {
    const user = useSelector((state) => state.user.user);
    const productsBucket = useSelector((state) => state.productBucket);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email] = useState(user.email);
    const [city, setCity] = useState("");
    const [novaPosta, setNovaPosta] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const onFinish = () => {
        if (name === "" || surname === "" || city === "" || novaPosta === "" || phone === "" || note === "") {
            setError("Please enter all information");
            return;
        }
        setError("");
        setLoading(true);
        API.post("/user/buyProducts", {
            options: {
                name,
                surname,
                email,
                city,
                novaPosta,
                phone,
                note,
            },
            products: productsBucket,
        }).then((data) => {
            if (data.data.success) {
                dispatch(clearBucket());
                dispatch(clearBucketUser());
                setLoading(false);
                setSuccess(true);
            }
        });
        history.push("/");
    };
    return (
        <>
            <TitlePager title="Billing Details" />
            <div className="billing_container">
                <BillingForm
                    surname={surname}
                    email={email}
                    city={city}
                    novaPosta={novaPosta}
                    phone={phone}
                    note={note}
                    error={error}
                    setName={(e) => setName(e.target.value)}
                    setSurname={(e) => setSurname(e.target.value)}
                    setCity={(e) => setCity(e.target.value)}
                    setNovaPosta={(e) => setNovaPosta(e.target.value)}
                    setPhone={(e) => setPhone(e.target.value)}
                    setNote={(e) => setNote(e.target.value)}
                    onFinish={onFinish}
                />
            </div>
        </>
    );
};

BuyProduct.whyDidYouRender = true;
export default React.memo(BuyProduct);
