import Loader from 'react-loader-spinner';

const Spinner = (): JSX.Element => (
  <Loader
    className="spinner"
    type="BallTriangle"
    color="#7f0000"
    height={80}
    width={80}
  />
);

export default Spinner;
