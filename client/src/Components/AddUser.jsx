import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { postUser } from "../API/endpoints";
import { checkForNull } from "../helpers/functions";

function AddUser({ show, setShow }) {
  const [user, setUser] = useState({ name: "", age: "", interest: "" });
  const queryCache = useQueryClient();

  const { isLoading, mutate } = useMutation(() => postUser(user), {
    onSuccess: (data) => {
      queryCache.invalidateQueries();
      setUser({ name: "", age: "", interest: "" });
      setShow(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = () => {
    const { name, age, interest } = user;
    if (name && age && interest) {
      mutate(user);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Full Name"
                name="name"
                value={user?.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={user?.age}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Interest</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Interest"
                name="interest"
                value={user?.interest}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleOnSubmit}
            disabled={!checkForNull(user) || isLoading}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
