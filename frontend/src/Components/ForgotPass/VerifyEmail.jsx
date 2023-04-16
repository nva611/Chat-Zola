import axios from '../../Hooks/axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const VerifyEmail = ({ setShow, setActive, setEmail, setCodes }) => {
    const [emails, setEmails] = useState();
    const [exist, setExist] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    const handleCheck = async () => {
        try {
            const { data } = await axios.post('/auth/send-confirmation-code?mode=forget', {
                email: emails,
            });
            toast.success('Đã gửi mã cho bạn');
            if (data.success === true) {
                setActive(2);
                setCodes(data.result);
                setExist(false);
            } else setExist(true);
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
        setEmails(e.target.value);
        setExist(false);
    };

    return (
        <div className="verifyEmail">
            <div className="verifyEmail-title">
                <i onClick={handleClose} className="fa-regular fa-arrow-right-to-arc"></i>
                <span>Xác thực Email</span>
            </div>
            <div className="verifyEmail-input">
                <span>Email</span>
                <input type="email" defaultValue={emails} onChange={handleChange} />
            </div>
            {exist && (
                <div className="verifyEmail-fail">
                    <i className="fa-solid fa-circle-xmark"></i>
                    <span>Email chưa được đăng ký</span>
                </div>
            )}
            <button onClick={handleCheck}>
                Xác thực
                <i className="fa-regular fa-arrow-right-to-arc"></i>
            </button>
        </div>
    );
};

export default VerifyEmail;
