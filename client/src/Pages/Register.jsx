import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { register_employee } from "../API/endpoints";

function Register() {
  const { mutateAsync } = useMutation((payload) => register_employee(payload), {
    onSuccess: (data) => {
      console.log(data);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert(error?.response?.data?.message);
    },
  });

  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = employee;
    if (password === confirmPassword) {
      console.log(employee);
      await mutateAsync({ username, password });
    } else {
      alert("Passwords not matched.");
    }
  };

  return (
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={employee.username}
            onChange={handleOnChange}
          />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={employee.password}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="confirmPassword"
            value={employee.confirmPassword}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegister}>
          Sign-up
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={() => navigate("/login")}
        >
          Already a member?
        </Button>
      </Form>
    </div>
  );
}

export default Register;
