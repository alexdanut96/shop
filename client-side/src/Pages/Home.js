import Announcement from "../Components/Announcement";
import Facilities from "../Components/Facilities";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewArrivals from "../Components/NewArrivals";
import Presentation from "../Components/Presentation";
import TopSellers from "../Components/TopSellers";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Presentation />
      <NewArrivals />
      <Facilities />
      <TopSellers />
      <Footer />
    </div>
  );
};

export default Home;
