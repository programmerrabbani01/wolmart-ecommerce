import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice.js";

const useAuthUser = () => {
  const { user } = useSelector(getAuthData);

  return { user };
};

export default useAuthUser;
