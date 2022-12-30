import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { editUser } from "../API/endpoints";
import { checkForNull } from "../helpers/functions";

const EditUser = ({ show, setShow, previousCredentials }) => {
  const [userCredentials, setUserCredentials] = useState(previousCredentials);

  const { mutateAsync } = useMutation((payload) => editUser(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleOnChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (
      JSON.stringify(userCredentials) !== JSON.stringify(previousCredentials)
    ) {
      await mutateAsync(userCredentials);
      //   console.log({ _id, userCredentials });
    } else {
      alert("Change something before submitting.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Full Name"
                name="name"
                value={userCredentials?.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={userCredentials?.age}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Interest</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Interest"
                name="interest"
                value={userCredentials?.interest}
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
            disabled={checkForNull(userCredentials)}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
