import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helpers/helpers.js";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { createToaster } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  updateCategoryStatus,
  // getAllCategories,
} from "../../features/product/productApiSlice.js";

const Category = () => {
  const cols = [
    {
      name: "Category Icon",
      selector: (row) => <i className={row.icon}></i>,
    },
    {
      name: "Category Logo",
      selector: (row) => (
        <img
          src={row.photo}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            margin: "10px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parent Category",
      selector: (row) => row.parentCategory?.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Sub Category",
      selector: (row) => (
        <ul>
          {row.subCategory.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
      ),
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
            data-target="#CategoryEdit"
            onClick={() => handleEditCategory(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleCategoryDelete(row._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { category, error, message, loader } = useSelector(
    (state) => state.product
  );

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
    parent: "",
    icon: "",
  });

  const [search, setSearch] = useState("");
  const [categoryLogo, setCategoryLogo] = useState(null);
  const [categoryLogoPreview, setCategoryLogoPreview] = useState(null);
  const [categoryEditLogoPreview, setCategoryEditLogoPreview] = useState(null);
  const [categoryEdit, setCategoryEdit] = useState({
    name: "",
    parent: "",
    icon: "",
  });

  console.log(categoryEdit);

  const [DataId, setDataId] = useState(null);

  // handle category logo preview

  const handleCategoryLogoPreview = (e) => {
    setCategoryLogo(e.target.files[0]);
    setCategoryLogoPreview(URL.createObjectURL(e.target.files[0]));
  };
  // handle category edit logo preview

  const handleCategoryEditLogoPreview = (e) => {
    setCategoryLogo(e.target.files[0]);
    setCategoryEditLogoPreview(URL.createObjectURL(e.target.files[0]));
  };

  //  handle category creation

  const handleCategoryCreate = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("icon", input.icon);
    form_data.append("parentCategory", input.parent);
    form_data.append("categoryLogo", categoryLogo);

    dispatch(createCategory(form_data));

    resetForm();
    setCategoryLogoPreview(null);
  };

  // handle brand delete

  const handleCategoryDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteCategory(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle edit Category input change

  const handleEditCategoryInputChange = (e) => {
    setCategoryEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle Edit Category

  const handleEditCategory = (id) => {
    const singleCategory = category.find((item) => item._id === id);

    setDataId(id);
    setCategoryEditLogoPreview(singleCategory.photo);
    setCategoryEdit({
      name: singleCategory.name,
      icon: singleCategory.icon,
      parent: singleCategory.parentCategory?._id
        ? singleCategory.parentCategory?._id
        : "",
    });
  };

  //  handle category update

  const handleEditUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryEdit.name);

    if (categoryEdit.parent) {
      formData.append("parentCategory", categoryEdit.parent);
    }

    formData.append("icon", categoryEdit.icon);

    if (categoryLogo) {
      // categoryEdit;
      formData.append("categoryLogo", categoryLogo);
    }
    setCategoryEditLogoPreview(null);
    setCategoryLogo(null);
    dispatch(updateCategory({ formData, DataId }));
    setCategoryEdit({
      name: "",
      parent: "",
      icon: "",
    });
  };

  // handle Status Update

  const handleStatusUpdate = (status, id) => {
    dispatch(updateCategoryStatus({ status, id }));
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

  // useEffect(() => {
  //   dispatch(getAllCategories());
  // }, [dispatch, category]);

  // search handler

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <>
      <>
        {/* <!-- Page Header --> */}

        <PageHeader title="Category" />

        {/* <!-- /Page Header --> */}

        {/* Modal And Table */}
        <ModalPopUp target="CategoryModalPopUp">
          {/* <form onSubmit={handleBrandCreate}> */}
          <form onSubmit={handleCategoryCreate}>
            <div className="my-3">
              <label htmlFor="">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Parent Category Name</label>
              <select
                id=""
                name="parent"
                value={input.parent}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">-Select-</option>
                {category?.map((pCat, index) => {
                  return (
                    <option value={pCat._id} key={index}>
                      {pCat.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="my-3">
              <label htmlFor="">Category Icon</label>
              <input
                type="text"
                className="form-control"
                name="icon"
                value={input.icon}
                onChange={handleInputChange}
              />
            </div>

            <div className="my">
              <img
                style={{ maxWidth: "100%" }}
                src={categoryLogoPreview}
                alt=""
              />
            </div>

            <div className="my-3">
              <label htmlFor="">Category Photo</label>
              <input
                type="file"
                className="form-control"
                name="categoryLogo"
                onChange={(e) => handleCategoryLogoPreview(e)}
              />
            </div>

            <div className="my-3">
              <button className="btn btn-primary btn-block" type="submit">
                {loader
                  ? "Category Data Creating . . . ."
                  : "Add New Category "}
              </button>
            </div>
          </form>
        </ModalPopUp>

        {/* Category Edit Modal */}
        <ModalPopUp target="CategoryEdit">
          <form onSubmit={handleEditUpdate}>
            <div className="my-3">
              <label htmlFor="">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={categoryEdit?.name}
                onChange={handleEditCategoryInputChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="">Category Icon</label>
              <input
                type="text"
                className="form-control"
                name="icon"
                value={categoryEdit?.icon}
                onChange={handleEditCategoryInputChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="">Parent Category Name</label>

              <select
                onChange={handleEditCategoryInputChange}
                className="form-control my-3"
                name="parent"
                value={categoryEdit.parent}
              >
                <option value="">...</option>
                {category?.map((item, index) => {
                  return (
                    <option
                      value={item._id}
                      selected={
                        item.parentCategory?._id === categoryEdit.parent
                          ? true
                          : false
                      }
                      key={index}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="my">
              <img
                style={{ maxWidth: "100%" }}
                src={categoryEditLogoPreview}
                alt=""
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Category Photo</label>
              <input
                type="file"
                className="form-control"
                name="categoryLogo"
                onChange={(e) => handleCategoryEditLogoPreview(e)}
              />
            </div>
            <div className="my-3">
              <button className="btn btn-primary btn-block" type="submit">
                {loader ? "Category Data Updating . . . ." : "Update Category "}
              </button>
            </div>
          </form>
        </ModalPopUp>

        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-primary"
              data-target="#CategoryModalPopUp"
              data-toggle="modal"
            >
              Add New Category
            </button>
            <br />
            <br />
            <div className="shadow-sm">
              <DataTable
                title="All Category Data"
                columns={cols}
                data={category ? category : []}
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
    </>
  );
};

export default Category;
