import { FC } from "react";
import { useAppSelector } from "../../../app/hooks/useDispatch";
import { INoticiasNormalizadas } from "../types";
import {
   CloseButton,
  ContenedorModal,
  ContenedorTexto,
  DescripcionModal,
  ImagenModal,
  TarjetaModal,
  TituloModal,
} from "../styled";
import {  CloseButton as Close, SuscribeImage } from "../../../assets";
import BotonSuscripcion from "./BotonSuscripcion";

//Aquí realizo el modal en un componente que recibe las props de la noticia y el toggle 

interface IProps {
  noticia: INoticiasNormalizadas;
  toggle: () => void;
}

const Modal: FC<IProps> = ({ noticia, toggle }) => {
  const dataModel= {
    tituloModal: "Suscríbete a nuestro Newsletter",
    imagenModal: SuscribeImage,
    descripcionModal:
      "Suscríbete a nuestro newsletter y recibe noticias de nuestros characters favoritos.",
  };

  const {  idListaPremium} = useAppSelector((state) => state.noticias);
  const esPremium = idListaPremium.some((id) => id === noticia.id);

  const src = esPremium ? noticia.imagen : dataModel.imagenModal;
  const alt = esPremium ? "news-image" : "mr-burns-excelent";
  const titulo = esPremium ? noticia.titulo : dataModel.tituloModal;
  const descripcion = esPremium ? noticia.descripcion : dataModel.descripcionModal;

  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton aria-label="close-modal" onClick={toggle}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={src} alt={alt} />
        <ContenedorTexto>
          <TituloModal>{titulo}</TituloModal>
          <DescripcionModal>{descripcion}</DescripcionModal>
          <BotonSuscripcion noticia={noticia}/>
         </ContenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  
  );
};

export default Modal;