import { FC } from "react";
import useToggle from "../../../app/hooks";
import { INoticiasNormalizadas } from "../types";
import { convertirPrimerLetraAMayusculas } from "../utils";
import { BotonLectura, DescripcionTarjetaNoticia, FechaTarjetaNoticia, ImagenTarjetaNoticia, TarjetaNoticia, TituloTarjetaNoticia } from "../styled";
import Modal from "./Modal";


interface IProps {
  noticia: INoticiasNormalizadas;
}
//realizo la tarjeta de la noticia en un componente 
const TarjetaDeNoticia: FC<IProps> = ({ noticia }) => {
  const { isOpen, toggle } = useToggle();
  const titulo = convertirPrimerLetraAMayusculas(noticia.titulo);
  const descripcionCorta = noticia.descripcion.substring(0, 100);

  return (
    <>
      <TarjetaNoticia>
        <ImagenTarjetaNoticia src={noticia.imagen} />
        <TituloTarjetaNoticia aria-label="modal-title">{titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>Hace {noticia.fecha} minutos</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia aria-label="description">{descripcionCorta}</DescripcionTarjetaNoticia>
        <BotonLectura aria-label="read-more" onClick={toggle}>
          Ver más
        </BotonLectura>
      </TarjetaNoticia>
      {isOpen && <Modal noticia={noticia} toggle={toggle} />}
    </>
  );
};

export default TarjetaDeNoticia;