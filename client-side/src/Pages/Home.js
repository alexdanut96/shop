import Announcement from "../Components/Announcement";
import Facilities from "../Components/Facilities";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewArrivals from "../Components/NewArrivals";
import Presentation from "../Components/Presentation";
import TopSellers from "../Components/TopSellers";
import Categories from "../Components/Categories";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Presentation />
      <Categories />
      <NewArrivals />
      <Facilities />
      <TopSellers />
      <Footer />
    </div>
  );
};

export default Home;
