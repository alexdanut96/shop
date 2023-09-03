import { useLoaderData, useNavigation } from "react-router-dom";

export const Demo = () => {
  const imgSrc = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
};

export const loadingData = async () => {
  const response = await fetch(
    "https://source.unsplash.com/random/?city,night"
  );
  const data = await response;
  return data.url;
};
