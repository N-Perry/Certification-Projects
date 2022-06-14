import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Modal from "../UIElements/Modal";
import ErrorModal from "../UIElements/ErrorModal";
import Button from "../FormElements/Button";


import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = event => {
    event.stopPropagation();
    props.fade();
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = event => {
    event.stopPropagation();
    setShowConfirmModal(false);
    props.fade();
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    console.log(JSON.stringify({id: auth.userId}));
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/delete`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      auth.logout();
      navigate("/auth");
    } catch (err) {}
  };

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this account? please note that it
          can't be undone thereafter.
        </p>
      </Modal>
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={auth.logout} > {/* got rid of <button onClick={auth.logout}>LOGOUT</button>, things seem to work? */}
            LOGOUT
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={showDeleteWarningHandler} > 
            delete account
          </button>
        </li>
      )}
    </ul>
    </>
  );
};

export default NavLinks;
