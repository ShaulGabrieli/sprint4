import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function PopularServices() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,

          // background: "red",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  return (
    <section className="main-container popular-services">
      <div className="main-container cards-container full ">
        <h2>Popular professional services</h2>
        <Slider {...settings}>
          <div
            className="img-card"
            // alt="Logo Design"
            // style={{
            //   backgroundImage: `url(${"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"})`,
            // }}
          >
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"></img>
            <p className="legend">Build your brand</p>
            <h3>Logo Design</h3>
          </div>
          <div className="img-card">
            <img
              alt="WordPress"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png"
            ></img>
            <p className="legend">Customize you site</p>
            <h3>WordPress</h3>
          </div>
          <div className="img-card">
            <img
              alt="Voice Over"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png"
            ></img>
            <p className="legend">Share your message</p>
            <h3>Voice Over</h3>
          </div>
          <div className="img-card">
            <img
              alt="Video Explainer"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png"
            ></img>
            <p className="legend">Engage your audience</p>
            <h3>Video Explainer</h3>
          </div>
          <div className="img-card">
            <img
              alt="Social Media"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png"
            ></img>
            <p className="legend">Reach more customers</p>
            <h3>Social Media</h3>
          </div>
          <div className="img-card">
            <img
              alt="SEO"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png"
            ></img>
            <p className="legend">Unlock growth online</p>
            <h3>Seo</h3>
          </div>
          <div className="img-card">
            <img
              alt="Illustration"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png"
            ></img>
            <p className="legend">Color your dreams</p>
            <h3>Ilustraion</h3>
          </div>
          <div className="img-card">
            <img
              alt="Translation"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png"
            ></img>
            <p className="legend">Go global</p>
            <h3>Translation</h3>
          </div>
          <div className="img-card">
            <img
              alt="Data Entry"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png"
            ></img>
            <p className="legend">Learn your business</p>
            <h3>Data Entry</h3>
          </div>
          <div className="img-card">
            <img
              alt="Book Covers"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png"
            ></img>
            <p className="legend">Showcase your story</p>
            <h3>Book Covers</h3>
          </div>
        </Slider>
      </div>
      {/* <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider> */}
      {/* <Carousel showIndicators={false} showThumbs={false}>
        <div className="img-card">
          <img
            alt="Logo Design"
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"
          ></img>{" "}
          <p className="legend">Legend 1</p>
        </div>
      </Carousel> */}
      <article className="services-carusel">
        {/* <Carousel autoPlay={true} showThumbs={false}>
          <div className="img-card">
            <img
              alt="Logo Design"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"
            ></img>{" "}
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img
              alt="WordPress"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png"
            ></img>
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img
              alt="Voice Over"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Video Explainer"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Social Media"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="SEO"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Illustration"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Translation"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Data Entry"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img
              alt="Book Covers"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png"
            ></img>
            <p className="legend">Legend 3</p>
          </div>
        </Carousel> */}
      </article>
    </section>
  );
}
