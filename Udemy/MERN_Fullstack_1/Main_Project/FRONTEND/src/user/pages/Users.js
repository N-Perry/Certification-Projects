import React from "react";
import UsersList from "../components/UsersList.js";

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarzie',
      image: 'https://media.istockphoto.com/photos/happy-man-picture-id639805094?k=20&m=639805094&s=612x612&w=0&h=-C95CIVw46jHTBVvrhxXxVfFiihpdUmdHk_BEA9_cLQ=',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
