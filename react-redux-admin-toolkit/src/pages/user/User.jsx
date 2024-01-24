import { useEffect } from "react";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";

import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { generateRandomPassword, timeAgo } from "../../helpers/helpers.js";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUserStatus,
} from "../../features/user/userApiSlice.js";
import { setMessageEmpty } from "../../features/user/userSlice.js";
import { createToaster } from "../../utils/toastify.js";
import swal from "sweetalert";

const User = () => {
  const dispatch = useDispatch();

  const { user, role, error, message } = useSelector((state) => state.user);

  const { input, setInput, handleInputChange, resetForm } = useFormFields({
    name: "",
    email: "",
    password: "",
  });

  // handle Random Password

  const handleRandomPassword = (e) => {
    e.preventDefault();
    const rnd_pass = generateRandomPassword(16);
    setInput((prevState) => ({
      ...prevState,
      password: rnd_pass,
    }));
  };

  // create user

  const handleUserFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(input));
    resetForm();
  };

  // handle Status Update

  const handleUserStatusUpdate = (status, id) => {
    dispatch(updateUserStatus({ status, id }));
  };

  // handle Delete User

  const handleDeleteUser = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteUser(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  useEffect(() => {
    new DataTable(".table");
  });

  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);
  return (
    <>
      {/* <!-- Page Header --> */}
      <PageHeader title="User" />
      {/* <!-- /Page Header --> */}

      {/* Modal And Table */}
      <ModalPopUp target="userModalPopUp">
        <form onSubmit={handleUserFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <a
              className="badge badge-info text-light"
              onClick={handleRandomPassword}
            >
              Random Password
            </a>
          </div>

          <div className="my-3">
            <select
              name="role"
              value={input.role}
              className="form-control"
              onChange={handleInputChange}
            >
              <option value="">-Select-</option>
              {role?.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Add New User
            </button>
          </div>
        </form>
      </ModalPopUp>

      <ModalPopUp target="userEdit">
        <form>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>
            <label
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <input type="checkbox" value={""} />
              Admin
            </label>
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Update Role
            </button>
          </div>
        </form>
      </ModalPopUp>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            data-target="#userModalPopUp"
            data-toggle="modal"
          >
            Add New User
          </button>
          <br />
          <br />

          {/* <!-- Recent Orders --> */}
          <div className="card card-table">
            {/* <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div> */}
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...user].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role?.name}</td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleUserStatusUpdate(
                                      item.status,
                                      item._id
                                    )
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                className="btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#userEdit"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteUser(item._id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/* <!-- /Recent Orders --> */}
        </div>
      </div>
    </>
  );
};

export default User;
