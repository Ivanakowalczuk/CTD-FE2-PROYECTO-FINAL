import { useState } from "react";

//hooks toogle para cambiar el estado de false a true, puede ser reutilible en varios componentes

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