import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function PopularServices() {
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
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
          <div className="img-card">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"></img>
            <div className="pop-service-text">
              <p className="legend">Build your brand</p>
              <h3>Logo Design</h3>
            </div>
          </div>

          <div className="img-card">
            <img
              alt="WordPress"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png"
            ></img>
            <div className="pop-service-text">
              <p className="legend">Customize you site</p>
              <h3>WordPress</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="Voice Over"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png"
            ></img>
            <div className="pop-service-text">
              <p className="legend">Share your message</p>
              <h3>Voice Over</h3>
            </div>
          </div>

          <div className="img-card">
            <img
              alt="Video Explainer"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png"
            ></img>
            <div className="pop-service-text">
              <p className="legend">Engage your audience</p>
              <h3>Video Explainer</h3>
            </div>
          </div>

          <div className="img-card">
            <img
              alt="Social Media"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Reach more customers</p>
              <h3>Social Media</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="SEO"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Unlock growth online</p>
              <h3>Seo</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="Illustration"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Color your dreams</p>
              <h3>Ilustraion</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="Translation"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Go global</p>
              <h3>Translation</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="Data Entry"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Learn your business</p>
              <h3>Data Entry</h3>
            </div>
          </div>
          <div className="img-card">
            <img
              alt="Book Covers"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png"
            ></img>

            <div className="pop-service-text">
              <p className="legend">Showcase your story</p>
              <h3>Book Covers</h3>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}
