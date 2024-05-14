import useGeneral from "@hooks/general";

const HomePage = () => {
  useGeneral();

  return <div data-testid="title">HomePage</div>;
};

export default HomePage;
