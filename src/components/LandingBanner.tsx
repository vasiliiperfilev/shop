import { Link } from 'react-router-dom';

const LandingBanner = () => {
  return (
    <div>
      <h1>New Autumn-Winter 2022 collection</h1>
      <h2>Now available for preorder, shipping September, 2022.</h2>
      <Link to="/shop">
        <button>SHOP NOW</button>
      </Link>
    </div>
  );
};

export default LandingBanner;
