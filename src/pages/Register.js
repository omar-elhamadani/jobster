import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");

      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
          <button
            type="button"
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={() => {
              dispatch(
                loginUser({ email: "testUser@test.com", password: "secret" })
              );
            }}
          >
            {isLoading ? "loading..." : "demo"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
