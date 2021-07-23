import { Pos } from "types/position";
import RegionsType from "types/regions";

export default (continent: RegionsType) =>
  (onSuccess: (data: Pos[]) => void) =>
  (onFailure: (error: Record<string, any>) => void) => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL as string;
    fetch(`${REACT_APP_API_URL}region/${continent}`).then((res) =>
      res
        .json()
        .then((data) => {
          onSuccess(data);
        })
        .catch((err) => onFailure(err))
    );
  };
