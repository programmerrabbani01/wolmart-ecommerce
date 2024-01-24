import { Link } from "react-router-dom";
import logoWhite from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/auth/authApiSlice.js";
// import { sweetAlertStandard } from "../../utils/sweetAlert.js";
import { createToaster } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/auth/authSlice.js";

const Register = () => {
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.email ||
      !input.password ||
      !input.confirmPassword
    ) {
      // sweetAlertStandard(
      //   { title: "😡", msg: "All Fields Are Required" },
      //   "error"
      // );
      createToaster("🦄 All Fields Are Required", "error");
    } else if (input.password !== input.confirmPassword) {
      createToaster("😔 Password Not Match", "warn");
      // sweetAlertStandard({ title: "😔", msg: "Password Not Match" }, "error");
    } else {
      dispatch(
        createUser({
          name: input.name,
          email: input.email,
          password: input.password,
        })
      );
      setInput({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // sweetAlertStandard(
      //   { title: "😃", msg: "Registration Successful" },
      //   "success"
      // );
    }
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

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="social-login">
                    <span>Register with</span>
                    <a href="#" className="facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#" className="google">
                      <i className="fa fa-google"></i>
                    </a>
                  </div>

                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
