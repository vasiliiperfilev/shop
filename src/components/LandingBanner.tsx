import { Link } from 'react-router-dom';

const LandingBanner = () => {
  return (
    <div className="flex flex-col gap-4 mt-40">
      <h1 className="text-5xl font-bold">New Autumn-Winter 2022 collection</h1>
      <h2 className="text-xl">
        Now available for preorder, shipping September, 2022.
      </h2>
      <Link
        to="/shop"
        className="bg-btn-primary text-background w-fit px-10 py-2 relative group"
      >
        <span className="absolute h-full w-full left-0 top-0 group-hover:left-1 group-hover:top-1 transition-all ease-out duration-300 border border-btn-primary"></span>
        <span className=" text-background">SHOP NOW</span>
      </Link>
    </div>
  );
};

export default LandingBanner;
