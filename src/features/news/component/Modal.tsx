import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
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
import { SuscribeImage, CloseButton as Close } from "../../../assets";
import BotonParaSuscribir from "./BotonSuscribir";

//El modal recibe las props de la noticia y el toggle 

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
        <CloseButton aria-label="close-modal" onClick={() => toggle()}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={src} alt={alt} />
        <ContenedorTexto>
          <TituloModal>{titulo}</TituloModal>
          <DescripcionModal>{descripcion}</DescripcionModal>
          <BotonParaSuscribir noticia={noticia}/>
         </ContenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  
  );
};

export default Modal;