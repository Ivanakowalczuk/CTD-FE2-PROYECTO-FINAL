import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adquirirSuscripcionPremium } from "../noticiasSlice";
import { INoticiasNormalizadas } from "../types";
import { BotonSuscribir } from "../styled";


//realizo el botón de suscripción como componente
const BotonParaSuscribir: FC<{ noticia: INoticiasNormalizadas }> = ({ noticia }) => {
  const dispatch = useAppDispatch();
  const { idListaPremium } = useAppSelector((state) => state.noticias);

  const onClickSubscribe = () => {
    dispatch(adquirirSuscripcionPremium(noticia.id));
    setTimeout(() => {
      alert("¡Suscrito!");
    }, 1000);
  };

  return (
    <>
      {!idListaPremium.some((id) => id === noticia.id) && (
        <BotonSuscribir aria-label="suscribe-button" onClick={onClickSubscribe}>
          Suscríbete
        </BotonSuscribir>
      )}
    </>
  );
};

export default BotonParaSuscribir;