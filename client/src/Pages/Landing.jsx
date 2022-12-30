import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddUser from "../Components/AddUser";
import Header from "../Components/Header";
import Users from "../Components/Users";

const Landing = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <h1 className="text-center">All Users</h1>
        <div className="text-center mb-2">
          <Button onClick={() => setShow(true)}>New User</Button>
          <AddUser show={show} setShow={setShow} />
        </div>
        <Users />
      </div>
    </div>
  );
};

export default Landing;
