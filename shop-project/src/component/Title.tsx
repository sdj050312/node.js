import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import title from "../productimgs/model.jpg";
import './Title.css';


const Title = () => {
  

  return (
    <>
      
        <div className="slider-container">
          <img src={title} alt="" />
        <div className="title-content">
          Super Cheap <span>Dog cap</span>
        </div>
        </div>
     
    </>
  );
};

export default Title;
