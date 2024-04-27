import ImgUpload from "../components/ImgUpload";
import Prompt from "../components/Prompt";

const Home = () => {
  return (
    <div className="d-flex align-items-center home-container justify-content-between">
      <div className="d-flex align-items-center justify-content-center img-upload">
        <ImgUpload />
      </div>
      <Prompt />
    </div>
  );
};

export default Home;
