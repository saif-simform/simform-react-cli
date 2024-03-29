import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "src/components/layout/Layout";

const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  /**
   * you can check if user is logged in or not
   * if you don't have user auth then hit GET request to server with token and get user logged in status
  *  const authenticated = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const [auth] = useAuthMutation();
  useEffect(() => {
    async function authOrNot() {
      try {
        await auth().unwrap();
        navigate("/");
      } catch (err) {}
    }

    if (!authenticated) {
      authOrNot();
    }
  }, [authenticated]);
  */

  //temp variable => change below variable to see login and sign up page
  // const authenticated = false;

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoutes;
