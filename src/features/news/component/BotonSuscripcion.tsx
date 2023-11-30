import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useDispatch";
import { adquirirSuscripcionPremium } from "../noticiasSlice";
import { INoticiasNormalizadas } from "../types";
import { BotonSuscribir } from "../styled";


//Aquí realizo el botón de suscripción como componente

const BotonSuscripcion: FC<{ noticia: INoticiasNormalizadas }> = ({ noticia }) => {
  const dispatch = useAppDispatch();
  const { idListaPremium } = useAppSelector((state) => state.noticias);

  const suscribir = () => {
    dispatch(adquirirSuscripcionPremium(noticia.id));
    setTimeout(() => {
      alert("¡Suscrito!");
    }, 1000);
  };

  return (
    <>
      {!idListaPremium.some((id) => id === noticia.id) && (
        <BotonSuscribir aria-label="suscribe-button" onClick={suscribir}>
          Suscríbete
        </BotonSuscribir>
      )}
    </>
  );
};

export default BotonSuscripcion;