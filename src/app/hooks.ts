import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


//hooks toogle para cambiar el estado de false a true
type UseToggleType = {
  isOpen: boolean;
  toggle: () => void;
};

export const useToggle = (initialValue = false): UseToggleType => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((value) => !value);

  return { isOpen: value, toggle };
};

export default useToggle;