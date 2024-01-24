import { useEffect, useState } from "react";

import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import useFormFields from "../../hooks/useFormFields.js";
import { timeAgo } from "../../helpers/helpers.js";
import { createToaster } from "../../utils/toastify.js";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import {
  createTag,
  deleteTag,
  updateTag,
  updateTagStatus,
} from "../../features/product/productApiSlice.js";

const Tag = () => {
  const cols = [
    {
      name: "Tag Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Created At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div className="status-toggle">
            <input
              type="checkbox"
              id="status_1"
              className="check"
              checked={row.status ? true : false}
            />
            <label
              onClick={() => handleStatusUpdate(row.status, row._id)}
              htmlFor="status_1"
              className="checktoggle"
            >
              checkbox
            </label>
          </div>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-warning btn-sm"
            data-toggle="modal"
            data-target="#TagEdit"
            onClick={() => handleEditTag(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleTagDelete(row._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { tag, error, message, loader } = useSelector((state) => state.product);

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  const [search, setSearch] = useState("");
  const [tagEdit, setTagEdit] = useState({});

  // handle tag creation

  const handleTagCreate = (e) => {
    e.preventDefault();

    dispatch(
      createTag({
        name: input.name,
      })
    );

    resetForm();
  };

  // handle edit brand input change

  const handleEditTagInputChange = (e) => {
    setTagEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle Edit Brand

  const handleEditTag = (id) => {
    const editData = tag.find((data) => data._id === id);
    setTagEdit(editData);
  };

  // handle brand update

  const handleTagUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateTag({
        id: tagEdit._id,
        name: tagEdit.name,
      })
    );
  };

  // handle delete tag

  const handleTagDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteTag(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle tag status change

  const handleStatusUpdate = (status, id) => {
    dispatch(updateTagStatus({ status, id }));
  };

  // search handler

  const handleSearch = (value) => {
    setSearch(value);
  };

  // message handler
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

      <PageHeader title="Tag" />

      {/* <!-- /Page Header --> */}
      {/* Modal And Table */}
      <ModalPopUp target="TagModalPopUp">
        <form onSubmit={handleTagCreate}>
          <div className="my-3">
            <label htmlFor="">Tag Name</label>
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
              {loader ? "Tag Data Creating . . . ." : "Add New Tag "}
            </button>
          </div>
        </form>
      </ModalPopUp>

      {/* Brand Edit Modal */}
      <ModalPopUp target="TagEdit">
        <form onSubmit={handleTagUpdate}>
          <div className="my-3">
            <label htmlFor="">Tag Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={tagEdit?.name}
              onChange={handleEditTagInputChange}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Update Tag
            </button>
          </div>
        </form>
      </ModalPopUp>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            data-target="#TagModalPopUp"
            data-toggle="modal"
          >
            Add New Tag
          </button>
          <br />
          <br />
          <div className="shadow-sm">
            <DataTable
              title="All Brands Data"
              columns={cols}
              data={tag ? tag : []}
              selectableRows
              highlightOnHover
              pointerOnHover
              pagination
              fixedHeader
              subHeader
              subHeaderComponent={
                <input
                  type="search"
                  className="form-control"
                  style={{ width: "200px" }}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tag;
