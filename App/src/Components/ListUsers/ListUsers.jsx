import React, { useEffect, useState } from "react";
import UserCard from "../Card/UserCard";
import axios from "axios";
import "./ListUsers.css";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ListUser-container">
      {users.map((item, indx) => {
        return <UserCard key={indx} user={item} update={setUsers} />;
      })}
    </div>
  );
};

export default ListUsers;
