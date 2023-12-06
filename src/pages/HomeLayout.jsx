import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {isPageLoading ? <Loading /> : <Outlet />}
      </section>
    </div>
  );
};
export default HomeLayout;
