import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import useFormFields from "../../hooks/useFormFields.js";
import "./product.css";

const ProductCreate = () => {
  const dispatch = useDispatch();

  const { brand, tag, category, error, message, loader } = useSelector(
    (state) => state.product
  );

  // local state

  const [productType, setProductType] = useState("Simple Product");
  const [tags, setTags] = useState(null);
  const [catSelected, setCatSelected] = useState([]);
  const [productPhoto, setProductPhoto] = useState([]);

  console.log(productPhoto);

  // for form data state manage

  const { input, setInput, handleInputChange, resetForm } = useFormFields({
    name: "",
    shortDesc: "",
    longDesc: "",
    brand: "",
    regularPrice: "",
    salePrice: "",
    stock: 0,
    link: null,
  });

  // handle categories check selection change

  const handleCatChange = (e) => {
    const selectedCatList = [...catSelected];

    if (catSelected.includes(e.target.value)) {
      selectedCatList.splice(selectedCatList.indexOf(e.target.value), 1);
    } else {
      selectedCatList.push(e.target.value);
    }

    setCatSelected(selectedCatList);
  };

  // handle Product Photo Change

  const handleProductPhotoChange = (e) => {
    const uploadFiles = Array.from(e.target.files);
    setProductPhoto((prevState) => [...prevState, ...uploadFiles]);
  };

  // set tag options

  let tagOptions = [];

  tag?.forEach((item) => {
    return tagOptions.push({ value: item._id, label: item.name });
  });

  return (
    <>
      {/* <!-- Page Header --> */}

      <PageHeader title="Create New Product" />

      {/* <!-- /Page Header --> */}

      <div className="row">
        <div className="col-md-12">
          <Link to="/product" className="btn btn-primary">
            Back To All Products
          </Link>
          <br />
          <br />
          <div className="row">
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <h4 className="card-title">Create New Product</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Name
                      </label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          spellCheck="false"
                          data-ms-editor="true"
                          name="name"
                          value={input.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Type
                      </label>
                      <div className="col-lg-9">
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => setProductType(e.target.value)}
                        >
                          <option value="Simple Product">Simple Product</option>
                          <option value="Variable Product">
                            Variable Product
                          </option>
                          <option value="Group Product">Group Product</option>
                          <option value="External Product">
                            External Product
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* Form Fields By Type Start */}

                    {productType === "Simple Product" && (
                      <div className="bg-warning p-5 mb-3">
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-danger">
                            Regular Price
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="regularPrice"
                              value={input.regularPrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-danger">
                            Sale Price
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="salePrice"
                              value={input.salePrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-danger">
                            Stock
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="stock"
                              value={input.stock}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {productType === "Variable Product" && (
                      <>
                        <h1>Variable Product</h1>
                      </>
                    )}
                    {productType === "Group Product" && (
                      <>
                        <h1>Group Product</h1>
                      </>
                    )}
                    {productType === "External Product" && (
                      <div className="bg-secondary p-5 mb-3">
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-warning">
                            Regular Price
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="regularPrice"
                              value={input.regularPrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-warning">
                            Sale Price
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="salePrice"
                              value={input.salePrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-warning">
                            Product Link
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              spellCheck="false"
                              data-ms-editor="true"
                              name="link"
                              value={input.link}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Fields By Type End */}

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Short Description
                      </label>
                      <div className="col-lg-9">
                        <textarea
                          type="text"
                          id=""
                          className="form-control"
                          name="shortDesc"
                          value={input.shortDesc}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Long Description
                      </label>
                      <div className="col-lg-9">
                        <textarea
                          type="text"
                          id=""
                          className="form-control"
                          name="longDesc"
                          value={input.longDesc}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <h4 className="card-title">Product Data</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Photos
                      </label>
                      <div className="col-lg-9">
                        <div className="previewProduct">
                          <div className="previewProductItem">
                            <button>
                              <i className="fa fa-trash"></i>
                            </button>
                            <img
                              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                              alt=""
                            />
                          </div>
                        </div>

                        <input
                          type="file"
                          className="form-control"
                          spellCheck="false"
                          data-ms-editor="true"
                          multiple
                          onChange={handleProductPhotoChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Categories
                      </label>
                      <div className="col-lg-9">
                        {category?.map((item, index) => {
                          return (
                            <label key={index} className="d-block">
                              <input
                                type="checkbox"
                                value={item._id}
                                onChange={handleCatChange}
                                checked={
                                  catSelected?.includes(item._id) ? true : false
                                }
                              />
                              &nbsp; &nbsp;
                              {item.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Brand
                      </label>
                      <div className="col-lg-9">
                        <select
                          id=""
                          className="form-control"
                          name="brand"
                          value={input.brand}
                          onChange={handleInputChange}
                        >
                          {brand?.map((item, index) => {
                            return (
                              <option value={item._id} key={index}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Product Tags
                      </label>
                      <div className="col-lg-9">
                        <Select
                          value={tags}
                          onChange={(tags) => setTags(tags)}
                          options={tagOptions}
                          isMulti
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
