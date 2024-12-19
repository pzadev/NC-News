import { useLocation } from "react-router";

const useQueryParams = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

export default useQueryParams;
