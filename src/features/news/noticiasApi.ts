import { data } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";

export const obtenerlistaNoticiasAPI: () => Promise<INoticiasNormalizadas[]> = async () => {
  return new Promise((resolve) => {
      setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};