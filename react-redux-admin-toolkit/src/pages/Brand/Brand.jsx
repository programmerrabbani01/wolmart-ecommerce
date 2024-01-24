import ModalPopUp from "../../components/ModalPopUp/ModalPopUp.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helpers/helpers.js";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  createBrand,
  deleteBrand,
  updateBrand,
  updateBrandStatus,
} from "../../features/product/productApiSlice.js";
import { createToaster } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";

const Brand = () => {
  const cols = [
    {
      name: "Brand Logo",
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
      name: "Brand Name",
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
            data-target="#BrandEdit"
            onClick={() => handleEditBrand(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleBrandDelete(row._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { brand, error, message, loader } = useSelector(
    (state) => state.product
  );

  const { input, setInput, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  const [brandLogo, setBrandLogo] = useState(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState(null);
  const [search, setSearch] = useState("");
  const [DataId, setDataId] = useState(null);
  const [brandEdit, setBrandEdit] = useState({});

  // handle logo preview

  const handleLogoPreview = (e) => {
    setBrandLogo(e.target.files[0]);
    setBrandLogoPreview(URL.createObjectURL(e.target.files[0]));
  };

  //  handle brand creation

  const handleBrandCreate = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("brandLogo", brandLogo);

    dispatch(createBrand(form_data));

    resetForm();
    setBrandLogoPreview(null);
  };

  // handle brand delete

  const handleBrandDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteBrand(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle Status Update

  const handleStatusUpdate = (status, id) => {
    dispatch(updateBrandStatus({ status, id }));
  };

  // handle edit brand input change

  const handleEditBrandInputChange = (e) => {
    setBrandEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle Edit Brand

  const handleEditBrand = (id) => {
    const editData = brand.find((data) => data._id === id);
    console.log(editData);
    setDataId(id);
    setBrandEdit(editData);
    setBrandLogoPreview(editData.photo);
  };

  // handle brand update

  const handleBrandUpdate = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", brandEdit.name);
    console.log(brandEdit.name);

    form_data.append("brandLogo", brandLogo);

    dispatch(updateBrand({ form_data, DataId }));

    setInput({
      name: "",
    });

    setBrandLogoPreview(null);
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

  // search handler

  const handleSearch = (value) => {
    setSearch(value);
  };

  //

  return (
    <>
      {/* <!-- Page Header --> */}

      <PageHeader title="Brand" />

      {/* <!-- /Page Header --> */}

      {/* Modal And Table */}
      <ModalPopUp target="BrandModalPopUp">
        <form onSubmit={handleBrandCreate}>
          <div className="my-3">
            <label htmlFor="">Brand Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my">
            <img style={{ maxWidth: "100%" }} src={brandLogoPreview} alt="" />
          </div>

          <div className="my-3">
            <label htmlFor="">Brand Photo</label>
            <input
              type="file"
              className="form-control"
              name="brandLogo"
              onChange={(e) => handleLogoPreview(e)}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              {loader ? "Brand Data Creating . . . ." : "Add New Brand "}
            </button>
          </div>
        </form>
      </ModalPopUp>

      {/* Brand Edit Modal */}
      <ModalPopUp target="BrandEdit">
        <form onSubmit={handleBrandUpdate}>
          <div className="my-3">
            <label htmlFor="">Brand Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={brandEdit?.name}
              onChange={handleEditBrandInputChange}
            />
          </div>
          <div className="my">
            <img style={{ maxWidth: "100%" }} src={brandLogoPreview} alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="">Brand Photo</label>
            <input
              type="file"
              className="form-control"
              name="brandLogo"
              onChange={(e) => handleLogoPreview(e)}
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              {loader ? "Brand Data Updating . . . ." : "Update Brand "}
            </button>
          </div>
        </form>
      </ModalPopUp>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            data-target="#BrandModalPopUp"
            data-toggle="modal"
          >
            Add New Brand
          </button>
          <br />
          <br />
          <div className="shadow-sm">
            <DataTable
              title="All Brands Data"
              columns={cols}
              data={brand ? brand : []}
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

export default Brand;
