import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import NavLinks from "./NavLinks";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const [faded, setFaded] = useState(false);

  const fadeHandler = () => {
    setFaded((prevFadeStatus) => !prevFadeStatus);
  };

  console.log(props.children);

  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside
        className={`side-drawer ${faded && "faded"}`}
        onClick={props.onClick}
      >
        <nav className="main-navigation__drawer-nav">
          <NavLinks fade={fadeHandler} />
        </nav>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
