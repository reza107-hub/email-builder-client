import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="hero min-h-screen text-primary">
      <div className="hero-overlay"></div>
      <div className="hero-content text-center flex-col">
        <div>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Create Beautiful Email Templates",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Create Beautiful Email Templates easy to use",
              1000,
              "Create Beautiful Email Templates newsletters",
              1000,
            ]}
            wrapper="span"
            speed={50}
            className="text-3xl lg:text-8xl font-bold leading-tight block h-12 md:min-h-48"
            repeat={Infinity}
          />
        </div>
        <div>
          <p className="mb-8 mt-5 text-lg text-black font-semibold max-w-3xl">
            Design and customize professional email templates with our
            easy-to-use builder. Perfect for marketing campaigns, newsletters,
            and announcements.
          </p>
          <Link
            to={"/email-builder"}
            className="btn btn-outline font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-700 ease-in-out hover:scale-105  sm:btn-sm md:btn-md lg:btn-wide"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
