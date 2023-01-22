import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
export function PopularServices() {
  return (
    <section className="main-container popular-services">
      <h2>Popular professional services</h2>

      <Carousel>
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
      </Carousel>
    </section>
  );
}
