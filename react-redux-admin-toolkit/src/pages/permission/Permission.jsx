import { useEffect, useState } from "react";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSlice.js";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { createToaster } from "../../utils/toastify.js";
import swal from "sweetalert";
import { timeAgo } from "../../helpers/helpers.js";

const Permission = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getAllPermissionData);

  const [input, setInput] = useState({
    name: "",
  });

  // handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submission

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createPermission(input));

    setInput({
      name: "",
    });
  };

  // handle delete permission

  const handleDeletePermission = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deletePermission(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle permission status update

  const handleStatusUpdate = (status, id) => {
    dispatch(updatePermissionStatus({ status, id }));
  };

  useEffect(() => {
    if (error && permission) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, permission]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      {/* <!-- Page Header --> */}

      <PageHeader title="Permission" />

      {/* <!-- /Page Header --> */}

      {/* Modal And Table */}
      <ModalPopUp target="PermissionModalPopUp">
        <form onSubmit={handleFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Permission Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Add New Permission
            </button>
          </div>
        </form>
      </ModalPopUp>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            data-target="#PermissionModalPopUp"
            data-toggle="modal"
          >
            Add New Permission
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
                {permission && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
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
                              {/* <button className="text-danger bg-transparent border-0"> */}
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeletePermission(item._id)}
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

export default Permission;
