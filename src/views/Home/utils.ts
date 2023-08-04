import { getRandomBeerList } from "../../api";

import handle from "../../utils/error";

const fetchData = async () => {
  try {
    const { data } = await getRandomBeerList(10);
    return data;
  } catch (error) {
    handle(error);
  }
};

export { fetchData };
