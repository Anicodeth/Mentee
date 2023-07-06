import NavigationHeader from "./navigation_header";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./buttons";

export default function Hero(props) {
  return (
    <div className="hero flex flex-col h-screen">
      <NavigationHeader />
      <div className="hero-content flex flex-col p-20 justify-center align-end gap-20 md:flex-row md:gap-10">
        <div className="headline-content h-full  m-auto mt-20">
          <h1 className="headline text-5xl mb-10">{props.headline}</h1>
          <h2 className="subheadline text-2xl mb-10 ">{props.subheadline}</h2>
          <Link to="/login">
            {" "}
            <PrimaryButton text={props.getStartedButton} />
          </Link>
        </div>
        <div className="hero-image w-100">
          <img src={`${props.heroImage}`} alt="hero" className="" />
        </div>
      </div>
    </div>
  );
}
