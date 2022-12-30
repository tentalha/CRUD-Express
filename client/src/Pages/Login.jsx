import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login_employee } from "../API/endpoints";

function Login() {
  const { mutateAsync, isLoading, isError } = useMutation(
    (payload) => login_employee(payload),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/home");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await mutateAsync(employee);
  };

  return (
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {isError && (
            <Alert variant="danger">Email or Password is not correct.</Alert>
          )}
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={employee?.username}
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
            value={employee?.password}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}
          disabled={isLoading}
        >
          Sign-in
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={() => navigate("/register")}
          disabled={isLoading}
        >
          Not a member?
        </Button>
      </Form>
    </div>
  );
}

export default Login;
