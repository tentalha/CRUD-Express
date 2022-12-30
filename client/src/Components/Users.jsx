import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, getAllUsers } from "../API/endpoints";
import EditUser from "./EditUser";
const Users = () => {
  const [show, setShow] = useState(false);
  const [databaseToEdit, setDatabaseToEdit] = useState(null);
  const { data, isLoading } = useQuery(["users"], () => getAllUsers());
  const queryCache = useQueryClient();

  const { mutateAsync, isLoading: deleteLoading } = useMutation(
    (id) => deleteUser(id),
    {
      onSuccess: () => {
        queryCache.invalidateQueries();
      },
    }
  );

  const allUsers = data?.data?.users || [];

  return (
    <div>
      {!isLoading ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Interest</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.age}</td>
                  <td>{user?.interest}</td>
                  <td>
                    <Button
                      className="mx-2"
                      onClick={() => {
                        console.log(`User edit with id=${user?._id}`);
                        setDatabaseToEdit(user);
                        setShow(true);
                      }}
                    >
                      <AiOutlineEdit />
                      Edit
                    </Button>
                    <Button
                      className="mx-2"
                      onClick={async () => await mutateAsync(user?._id)}
                      disabled={deleteLoading}
                    >
                      <AiOutlineDelete />
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h1>Loading...</h1>
      )}
      {show && (
        <EditUser
          show={show}
          setShow={setShow}
          previousCredentials={databaseToEdit}
        />
      )}
    </div>
  );
};

export default Users;
