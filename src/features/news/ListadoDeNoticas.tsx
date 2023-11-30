import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { obtenerListadoDeNoticias} from "./noticiasSlice";
import {  
     ContenedorNoticias, 
       ListaNoticias, 
      TituloNoticias, 
  } from "./styled";
import TarjetaDeNoticia from "./component/TarjetaDeNoticia";

     
const ListadoDeNoticias = () => {
  const dispatch = useAppDispatch();
  const { listaDeNoticias } = useAppSelector((state) => state.noticias);
  console.log(listaDeNoticias)

  useEffect(() => {
    dispatch(obtenerListadoDeNoticias());

  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
      {listaDeNoticias?.map((noticia) => (
            <TarjetaDeNoticia key={noticia.id} noticia={noticia} />
        ))}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default ListadoDeNoticias;