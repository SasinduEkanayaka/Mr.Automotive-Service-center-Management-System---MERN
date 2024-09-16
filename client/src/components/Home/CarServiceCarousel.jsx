import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import c1 from "./../../assets/img/carousel-1.png";
import c2 from "./../../assets/img/carousel-2.png";
import cbg1 from "./../../assets/img/carousel-bg-1.jpg";
import cbg2 from "./../../assets/img/carousel-bg-2.jpg";
import "./../../assets/css/CarServiceCarousel.css";

const CarServiceCarousel = () => {
  return (
    <div className="container-fluid p-0 mb-5 relative">
      <Carousel id="header-carousel" fade>
        <Carousel.Item className="carousel-item-custom">
          <div className="relative">
            <img className="w-100" src={cbg1} alt="First slide" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <Carousel.Caption className="d-flex align-items-center z-10 caption-custom">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-start">
                  <motion.div
                    className="col-10 col-lg-7 text-center text-lg-start"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h6 className="text-white text-uppercase mb-3">
                      // Car Servicing //
                    </h6>
                    <h1 className="display-3 text-white mb-4 pb-3">
                      Qualified Car Repair Service Center
                    </h1>
                    <a href="#" className="btn btn-primary py-3 px-5">
                      Learn More <i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </motion.div>
                  <motion.div
                    className="col-lg-5 d-none d-lg-flex"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <img className="img-fluid" src={c1} alt="Car" />
                  </motion.div>
                </div>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item className="carousel-item-custom">
          <div className="relative">
            <img className="w-100" src={cbg2} alt="Second slide" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <Carousel.Caption className="d-flex align-items-center z-10 caption-custom">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-start">
                  <motion.div
                    className="col-10 col-lg-7 text-center text-lg-start"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h6 className="text-white text-uppercase mb-3">
                      // Car Servicing //
                    </h6>
                    <h1 className="display-3 text-white mb-4 pb-3">
                      Qualified Car Wash Service Center
                    </h1>
                    <a href="#" className="btn btn-primary py-3 px-5">
                      Learn More <i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </motion.div>
                  <motion.div
                    className="col-lg-5 d-none d-lg-flex"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <img className="img-fluid" src={c2} alt="Car" />
                  </motion.div>
                </div>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>

      <button
        className="carousel-control-prev carousel-control-custom"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next carousel-control-custom"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarServiceCarousel;
