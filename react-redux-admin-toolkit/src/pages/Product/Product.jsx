import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helpers/helpers.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createToaster } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import { Link } from "react-router-dom";

const Product = () => {
  const cols = [
    {
      name: "Product Logo",
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
      name: "Product Name",
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
              // onClick={() => handleStatusUpdate(row.status, row._id)}
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
            // onClick={() => handleEditBrand(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            // onClick={() => handleBrandDelete(row._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { product, error, message, loader } = useSelector(
    (state) => state.product
  );

  

  const [search, setSearch] = useState("");

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

  return (
    <>
      {/* <!-- Page Header --> */}

      <PageHeader title="All Products" />

      {/* <!-- /Page Header --> */}

      <div className="row">
        <div className="col-md-12">
          <Link to="/createProduct" className="btn btn-primary">
            Add New Product
          </Link>
          <br />
          <br />
          <div className="shadow-sm">
            <DataTable
              title="All Products Data"
              columns={cols}
              data={[
                {
                  name: "Rabbani",
                  photo:
                    "https://images.unsplash.com/photo-1630688231126-dd36840fce51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&w=1000&q=80",
                  slug: "rabbani",
                  createdAt: "2022-01-20T12:00:00.000Z",
                  status: true,
                },
              ]}
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

export default Product;
