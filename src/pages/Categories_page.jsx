import { useParams } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();

  return <div>{category}</div>;
};

export default Categories;
