import Hero from "../components/hero.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "../components/buttons.js";

// things to improve on this page to make it professional are the following

const localLinks = ["Home", "Pricing", "About us", "Contact"];
const socialLinks = ["Facebook", "Twitter", "Instagram", "LinkedIn"];
const infoLinks = ["privacy policy", "Terms Of Service"];

const getTestimonials = (image_src, name, position, num_of_stars) => {
  let stars = [];

  for (let i = 0; i < num_of_stars; i++) {
    stars.push(<img className="w-7" alt="" src="images/star.png"></img>);
  }

  return (
    <div className="flex justify-center align-center gap-10 mt-10">
      <div className="flex flex-col justify-center align-center gap-4 p-10 bg-gray-100 rounded-2xl mb-10 shadow shadow-2xl">
        <img className="w-40 rounded-full m-auto" alt="" src={image_src}></img>
        <p className="font-semibold m-auto">{name}</p>
        <p className="font-semibold m-auto text-gray-500 flex justify-center w-40">
          {position}
        </p>

        <div className="flex justify-center align-center gap-2">{stars}</div>
      </div>
    </div>
  );
};

function getLink(text) {
  return <p className="cursor-pointer hover:text-black">{text}</p>;
}

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
        <div className="flex justify-center text-2xl font-bold">Get Us On</div>
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
              <h2 className="text-2xl font-bold">{card.title}</h2>
              <p className="">{card.description}</p>

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
          <h2 className="text-2xl font-bold m-auto">Testimonials</h2>
          <p className="font-semibold m-auto">
            Loorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="flex justify-center  gap-4 flex-wrap">
            {testimonials.map((testimonial) => {
              return getTestimonials(
                testimonial.image_src,
                testimonial.name,
                testimonial.position,
                testimonial.num_of_stars
              );
            })}
          </div>
        </div>
      </div>

      <div className="get-started-section bg-white flex flex-col-reverse items-center shadow-2xl w-fit px-10 pb-4 w-8/12 m-auto rounded mt-20 md:flex-row md:justify-evenly">
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Get started with Mentee today
          </h1>
          <p>Start digitalising your classes.</p>
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

      <div className="footer  flex mx-auto justify-evenly mt-28 align-end pb-10 text-gray-700">
        <div className="logo">
          <h1 className="text-3xl font-bold mb-4 cursor-pointer hover:text-black">
            Mentee
          </h1>
          {getLink(`2023 Mentee`)}
          {getLink("All rights reserved")}{" "}
        </div>

        <div className="links">{localLinks.map((link) => getLink(link))}</div>

        <div className="socials">
          {socialLinks.map((link) => getLink(link))}
        </div>

        <div className="info">{infoLinks.map((link) => getLink(link))}</div>
      </div>
    </div>
  );
}
