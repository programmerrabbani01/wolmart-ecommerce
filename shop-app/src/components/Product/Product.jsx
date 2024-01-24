import shop1 from "../../assets/images/shop/1.jpg";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="product-wrap">
        <div className="product text-center">
          <figure className="product-media">
            <Link to={`/shop/1234`}>
              <img src={shop1} alt="Product" width="300" height="338" />
            </Link>
            <div className="product-action-horizontal">
              <Link
                to="#"
                className="btn-product-icon btn-cart w-icon-cart"
                title="Add to cart"
              ></Link>
              <Link
                to="#"
                className="btn-product-icon btn-wishlist w-icon-heart"
                title="Wishlist"
              ></Link>
              <Link
                to="#"
                className="btn-product-icon btn-compare w-icon-compare"
                title="Compare"
              ></Link>
              <Link
                to="#"
                className="btn-product-icon btn-quickview w-icon-search"
                title="Quick View"
              ></Link>
            </div>
          </figure>
          <div className="product-details">
            <div className="product-cat">
              <a href="shop-banner-sidebar.html">Electronics</a>
            </div>
            <h3 className="product-name">
              <a href="product-default.html">3D Television</a>
            </h3>
            <div className="ratings-container">
              <div className="ratings-full">
                <span className="ratings" style={{ width: "100%" }}></span>
                <span className="tooltiptext tooltip-top"></span>
              </div>
              <a href="product-default.html" className="rating-reviews">
                (3 reviews)
              </a>
            </div>
            <div className="product-pa-wrapper">
              <div className="product-price">$220.00 - $230.00</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
