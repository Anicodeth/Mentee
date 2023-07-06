import Hero from "../components/hero.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer.js";
import { PrimaryButton } from "../components/buttons.js";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// things to improve on this page to make it professional are the following

const getTestimonials = (image_src, name, num_of_stars, testimonial_text) => {
  let stars = [];

  for (let i = 0; i < num_of_stars; i++) {
    stars.push(<img className="w-7" alt="" src="images/star.png"></img>);
  }

  // TODO: add default image
  image_src = null;
  return (
    <div className="flex justify-center align-center gap-10 mt-10">
      <div className="flex flex-col justify-center align-center gap-4 p-10 bg-gray-100 rounded-2xl mb-10 shadow shadow-2xl">
        {image_src ? (
          <img
            className="w-40 rounded-full m-auto"
            alt=""
            src={image_src}
          ></img>
        ) : (
          <div className="w-full text-center">
            <FontAwesomeIcon icon={faUser} className="text-5xl" />
          </div>
        )}
        <p className="font-semibold text-gray-700 m-auto">{name}</p>
        <p className="text-gray-700 m-auto text-gray-500 w-56">
          {testimonial_text}
        </p>

        <div className="flex justify-center align-center gap-2">{stars}</div>
      </div>
    </div>
  );
};

const getExperts = (image_src, name, position) => {
  return (
    <div className="flex justify-center align-center gap-10 mt-10">
      <div className="flex flex-col justify-center align-center gap-4 p-10 bg-gray-100 rounded-2xl mb-10 shadow shadow-2xl">
        <img className="w-40 rounded-full m-auto" alt="" src={image_src}></img>
        <p className="font-semibold text-gray-700 m-auto">{name}</p>
        <p className="font-medium text-gray-700 m-auto text-gray-500 flex justify-center w-40 text-center">
          {position}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const [homePageData, setHomePageData] = useState({});
  const [featureCards, setFeatureCards] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [socialLogos, setSocialLogos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setHomePageData(data);
        setFeatureCards(data.featureCards);
        setTestimonials(data.testimonials);
        setSocialLogos(data.socialLogos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home bg-gray-200">
      <Hero
        headline={homePageData.headline}
        subheadline={homePageData.subheadline}
        getStartedButton={homePageData.getStartedButton}
        heroImage={homePageData.heroImage}
      />
      <div className="social-logos flex-column justify-center align-center ">
        <div className="flex justify-center text-2xl text-gray-800 font-bold">
          Get Us On
        </div>
        <ul className="flex pt-10 gap-12 w-full justify-center align-center ">
          {socialLogos.map((logo) => {
            return (
              <li>
                <a href={logo.link}>
                  <img className="w-12" alt="" src={logo.image}></img>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="experts mt-28">
        <div className="flex flex-col justify-center align-center gap-4">
          <h2 className="text-2xl text-gray-800 font-bold m-auto">Experts</h2>
          <p className="font-semibold text-gray-700 m-auto">
            Meet our team of experts and mentors
          </p>

          <div className="flex justify-center  gap-4 flex-wrap">
            {testimonials.map((expert) => {
              return getExperts(
                expert.image_src,
                expert.name,
                expert.position,
                expert.num_of_stars
              );
            })}
          </div>
        </div>
      </div>

      {featureCards.map((card) => {
        return (
          <div
            className={`flex flex-col-reverse  align-center items-center md:flex ${
              featureCards.indexOf(card) % 2 === 1
                ? "md:flex-row"
                : "md:flex-row-reverse"
            } p-4 m-10 gap-10 mt-20 justify-center mb-20 lg:w-8/12 m-auto`}
          >
            <div className="side-note md:px-0 px-10 items-center flex flex-col justify-center gap-10">
              <h2 className="text-2xl text-gray-800 font-bold">{card.title}</h2>
              <p className="text-lg text-gray-800 font-light">
                {card.description}
              </p>

              <div>
                <Link to="/login">
                  <PrimaryButton text={"Try Now"} />
                </Link>
              </div>
            </div>
            <img className="w-96" alt="" src={card.image_src}></img>
          </div>
        );
      })}

      <div className="testimonials">
        <div className="flex flex-col justify-center align-center gap-4">
          <h2 className="text-2xl text-gray-800 font-bold m-auto">
            Testimonials
          </h2>
          <p className="font-semibold text-gray-700 m-auto">
            What do our clients say about us?
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {testimonials.map((testimonial) => {
              return getTestimonials(
                testimonial.image_src,
                testimonial.name,
                testimonial.num_of_stars,
                testimonial.testimonial_text
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="get-started-section bg-white flex flex-col-reverse 
      items-center shadow-2xl w-fit px-4 pb-4 w-8/12 rounded mt-20 md:flex-row md:justify-evenly mx-4 lg:w-9/12 lg:mx-auto"
      >
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1 className="md:text-3xl text-2xl text-gray-800 font-semibold text-gray-700">
            Get started with Mentee today
          </h1>
          <p className="text-lg text-gray-700 text-light">
            Discover the benefits of Mentee.com's live online learning and
            mentorship platform. Engage with expert mentors in real-time,
            receive personalized guidance, network with professionals, develop
            skills, and learn from the comfort of your own space. Unleash your
            potential today!
          </p>
          <Link to="/login">
            {" "}
            <PrimaryButton text={"Sign up now"} />
          </Link>
        </div>
        <img
          alt=""
          src="images/graph_1.png"
          className="w-96 relative bottom-10"
        ></img>
      </div>
      <Footer />
    </div>
  );
}
