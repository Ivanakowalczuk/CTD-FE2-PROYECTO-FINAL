import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { obtenerlistaNoticiasAPI } from "./noticiasApi"; 
import { INoticiasNormalizadas } from "./types";
import { AppDispatch} from "../../app/store";


interface NoticiasState {
  listaDeNoticias: INoticiasNormalizadas[] | null;
  idListaPremium: number[];
  pending: boolean;
  error: string | null
  }

const initialState: NoticiasState = {
  listaDeNoticias: null,
  idListaPremium: [],
  pending: false,
  error: null
  };

export const obtenerNoticiasAsync= createAsyncThunk("noticias/obtenerNoticias", async () => {
  try {
    const listaDeNoticias = await obtenerlistaNoticiasAPI();
    return  listaDeNoticias;
    
  } catch (error) {
    throw error;
  }

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
      idListaPremium: initialState. idListaPremium,
    }),
  },
  extraReducers: (builder) => {
    builder
    .addCase(obtenerNoticiasAsync.pending, (state) => {
      state.pending = true;
    })
    .addCase( obtenerNoticiasAsync.fulfilled, (state, action) => {
          const idListaPremium = action.payload
        .filter((noticia) => noticia.esPremium)
        .map((noticia) => noticia.id);
      return { ...state, listaDeNoticias: action.payload, idListaPremium};
    })

    .addCase(obtenerNoticiasAsync.rejected, (state, action) => {
      state.pending = false;
      state.error = "Hubo un error al obtener las noticias.";
      console.error("Error:", action.error);
    });
   
  },
});


export const obtenerListadoDeNoticias= () => (dispatch: AppDispatch) => {
  return dispatch( obtenerNoticiasAsync());
};

export const { adquirirSuscripcionPremium, limpiarListaDePremium } = noticiasSlice.actions;

export const noticiasReducer = noticiasSlice.reducer;