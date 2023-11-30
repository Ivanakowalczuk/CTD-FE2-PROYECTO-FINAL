import { data } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";

export const obtenerlistaNoticiasAPI: () => Promise<INoticiasNormalizadas[]> = async () => {
  return new Promise((resolve) => {
    console.log('data', data)
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};