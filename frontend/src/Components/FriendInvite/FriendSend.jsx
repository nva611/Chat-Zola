import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../Hooks/axios';

const FriendSend = ({ setIds }) => {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState();
    const [active, setActive] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/user/get-list-invitations-sent/${user._id}`);
            setList(data);
        };
        fetchData();
    }, [list]);
    const handleClick = (id) => {
        setIds(id);
        setActive(id);
    };
    const handleUnsend = async (id) => {
        try {
            await axios.post('/user/unsend-friend-request', {
                receiverId: id,
                senderId: user._id,
            });
            setIds(null);
            toast.success('Hủy lời mời thành công');
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="friendInvite-List">
            {list?.map((item) => (
                <div
                    key={item._id}
                    className={active === item._id ? 'myFriend-item active-box' : 'myFriend-item'}
                    onClick={() => handleClick(item._id)}
                >
                    <div className="myFriend-info">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>{item.name}</span>
                        {/* {item.gender === 'male' ? (
                            <i className="fa-regular fa-mars"></i>
                        ) : (
                            <i className="fa-regular fa-venus"></i>
                        )} */}
                    </div>
                    <div className="myFriend-icon">
                        <i onClick={() => handleUnsend(item._id)} className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendSend;
