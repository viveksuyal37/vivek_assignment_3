import React, { useContext, useState } from "react";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Card, Modal } from "antd";
import "./UserCard.css";
import axios from "axios";
import LoaderContext from "../Context/LoaderContext";

const { Meta } = Card;

const UserCard = (props) => {
  const { user, update } = props;
  const [isLoading, setLoading] = useContext(LoaderContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [website, setWebsite] = useState(user.website);
  const [msg, setMsg] = useState(null);

  //for removing card of a user from frontend.
  const [display, setDisplay] = useState(true);
  const [like, setLike] = useState(false);
  // for modal

  const [edit, setEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(null);

  const handleCancel = () => {
    setEdit(false);
  };

  const showModal = () => {
    setEdit(true);
  };

  const handleOk = (success) => {
    // dont submit if we have some error msg from backend to show
    if (success) {
      setModalText("Details saved you will be redirected after two seconds.");
      setConfirmLoading(true);
      setTimeout(() => {
        setEdit(false);
        setModalText(null);
        setConfirmLoading(false);
      }, 2000);
    }
  };

  const updateUser = async (id, name, email, phone, website) => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/v1/user/${id}`, {
        name,
        email,
        phone,
        website,
      })
      .then((res) => {
        setLoading(false);
        setMsg(null);
        update(res.data.users);
        handleOk(true);
      })
      .catch((err) => {
        setLoading(false);
        setMsg(err.response.data.message);
        handleOk(false);
      });
  };

  return (
    <Card
      className={display ? "" : "display-none"}
      style={{ width: 280, margin: 15, borderRadius: 5 }}
      cover={
        <img
          className="card-cover-img"
          alt="Avatar"
          src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
        />
      }
      actions={[
        like ? (
          <HeartFilled
            onClick={() => {
              setLike(!like);
            }}
            style={{ fontSize: "20px", color: "red" }}
          />
        ) : (
          <HeartOutlined
            onClick={() => {
              setLike(!like);
            }}
            style={{ fontSize: "20px", color: "red" }}
          />
        ),
        <EditOutlined
          onClick={showModal}
          style={{ fontSize: "20px" }}
          key="edit"
        />,
        <DeleteFilled
          style={{ fontSize: "20px" }}
          onClick={() => {
            setDisplay(false);
          }}
          title="delete"
        />,
      ]}
    >
      <Meta title={user.name} />

      <div className="card-content">
        <div className="row">
          <MailOutlined />
          <p>{user.email}</p>
        </div>
        <div className="row">
          <PhoneOutlined />
          <p>{user.phone}</p>
        </div>
        <div className="row">
          <GlobalOutlined />
          <p>{user.website}</p>
        </div>
      </div>

      {/* //MOdal starts from here */}
      <Modal
        title="Edit user info"
        open={edit}
        onOk={() => {
          updateUser(user._id, name, email, phone, website);
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* show submitted msg after user click ok */}
        {modalText ? (
          <p>{modalText}</p>
        ) : (
          <form action="" className="edit-form">
            {msg ? (
              <p className="error-msg">{msg}</p>
            ) : (
              <p className="error-msg"></p>
            )}
            <div>
              <label htmlFor="name">
                Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="phone">
                Phone <span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="website">
                Website <span>*</span>
              </label>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
            </div>
          </form>
        )}
      </Modal>
    </Card>
  );
};

export default UserCard;
