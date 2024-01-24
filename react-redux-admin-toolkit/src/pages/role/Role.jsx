import { useEffect, useState } from "react";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { createToaster } from "../../utils/toastify.js";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
} from "../../features/user/userApiSlice.js";
import { timeAgo } from "../../helpers/helpers.js";
import swal from "sweetalert";
// import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();

  const { permission, role, error, message } =
    useSelector(getAllPermissionData);

  const [selected, setSelected] = useState([]);

  const { input, handleInputChange, resetForm } = useFormFields({ name: "" });

  const [roleEdit, setRoleEdit] = useState({});

  // handle checkbox change

  const handleCheckBoxChange = (e) => {
    const val = e.target.value;
    const updateList = [...selected];

    if (selected.includes(val)) {
      updateList.splice(selected.indexOf(val), 1);
    } else {
      updateList.push(val);
    }

    setSelected(updateList);
  };

  // handle form submission

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );

    resetForm();
    setSelected([]);
  };

  // handle delete role

  const handleDeleteRole = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteRole(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle status update

  const handleStatusUpdate = (status, id) => {
    dispatch(updateRoleStatus({ status, id }));
  };

  
  //  handle edit role

  const handleEditRole = (id) => {
    const editData = role.find((data) => data._id === id);

    setRoleEdit(editData);
    setSelected(editData.permissions);
  };

  // handle Edit Role Input Change

  const handleEditRoleInputChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle Update Role

  const handleUpdateRole = (e) => {
    e.preventDefault();

    dispatch(
      updateRole({
        id: roleEdit._id,
        name: roleEdit.name,
        permissions: selected,
      })
    );
  };

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

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      {/* <!-- Page Header --> */}

      <PageHeader title="Role" />

      {/* <!-- /Page Header --> */}

      {/* Modal And Table */}
      <ModalPopUp target="RoleModalPopUp">
        <form onSubmit={handleFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>

            {permission?.map((item, index) => {
              return (
                <label
                  key={index}
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected.includes(item.name)}
                    onChange={handleCheckBoxChange}
                  />
                  {item.name}
                </label>
              );
            })}
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Add New Role
            </button>
          </div>
        </form>
      </ModalPopUp>

      <ModalPopUp target="roleEdit">
        <form onSubmit={handleUpdateRole}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={roleEdit.name}
              onChange={handleEditRoleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>

            {permission?.map((item, index) => {
              return (
                <label
                  key={index}
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected?.includes(item.name)}
                    onChange={handleCheckBoxChange}
                  />
                  {item.name}
                </label>
              );
            })}
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
            data-target="#RoleModalPopUp"
            data-toggle="modal"
          >
            Add New Role
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
                {role && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((per, index) => {
                                  return <li key={index}>{per}</li>;
                                })}
                              </ul>
                            </td>
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
                                    handleStatusUpdate(item.status, item._id)
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
                                data-target="#roleEdit"
                                onClick={() => handleEditRole(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteRole(item._id)}
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

export default Role;
