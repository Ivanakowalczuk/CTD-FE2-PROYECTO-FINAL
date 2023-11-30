import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { obtenerlistaNoticiasAPI } from "./noticiasApi"; 
import { INoticiasNormalizadas } from "./types";
import { AppDispatch } from "../../app/store";

interface NoticiasState {
  listaDeNoticias: INoticiasNormalizadas[] | null;
  idListaPremium: number[];
}

const initialState: NoticiasState = {
  listaDeNoticias: null,
  idListaPremium: [],
};

export const obtenerNoticiasAsync= createAsyncThunk("noticias/obtenerNoticias", async () => {
  const listaDeNoticias = await obtenerlistaNoticiasAPI();
  return  listaDeNoticias;
});

const noticiasSlice = createSlice({
  name: "noticias",
  initialState,
  reducers: {
    adquirirSuscripcionPremium: (state, action: PayloadAction<number>) => ({
      ...state,
      idListaPremium: [...state. idListaPremium, action.payload],
    }),
   limpiarListaDePremium: (state) => ({
      ...state,
      premiumIdList: initialState. idListaPremium,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase( obtenerNoticiasAsync.fulfilled, (state, action) => {
      const idListaPremium = action.payload
        .filter((noticia) => noticia.esPremium)
        .map((noticia) => noticia.id);
      return { ...state, listaDeNoticias: action.payload, idListaPremium};
    });
  },
});



export const obtenerListadoDeNoticias= () => (dispatch: AppDispatch) => {
  return dispatch( obtenerNoticiasAsync());
};

export const { adquirirSuscripcionPremium, limpiarListaDePremium } = noticiasSlice.actions;

export default noticiasSlice.reducer;