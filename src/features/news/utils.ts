//Aquí se realiza los métodos para simular los minutos transcurridos que se utiliza en fakeRest.ts

export const  simularMinutosTranscurridos: (
    decrementMiliseconds: number
  ) => number = (decrementMiliseconds) => {
    const convertirMilisegundosEnMinutos = 1 / 60000;
    const ahora = new Date().getMinutes();
  
    const result = Math.abs(
      Math.floor(ahora - decrementMiliseconds * convertirMilisegundosEnMinutos)
    );
    return result;
  };


//Aquí se realiza el cambio a mayúsula de la primera letra de cada palabra. Se utiliza en el componente TarjetaNoticia y ahora es reutilizable en otros componentes si fuera necesario
  export const convertirPrimerLetraAMayusculas = (text: string) => {
        return text.split(" ").map((palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
      })
      .join(" ");

  };

  
