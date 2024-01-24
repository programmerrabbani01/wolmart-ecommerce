import useAuthUser from "../../hooks/useAuthUser.jsx";

const PageHeader = ({ title }) => {
  const { user } = useAuthUser();

  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome {user?.name}!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">{title}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!-- /Page Header --> */}
    </>
  );
};

export default PageHeader;
