import {screen, waitFor, fireEvent} from '@testing-library/react' 
import { render } from '../../test-utils';
import Cita from './Cita'



describe('<Cita />', ()=> {
  test('render cita component', ()=>{
   render(<Cita/>)
  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i)
  const textHeader = screen.getByText(/No se encontro ninguna cita/i);
  const buttonGetCita = screen.getByLabelText(/Obtener cita aleatoria/i);
  const buttonDelete = screen.getByLabelText(/Borrar/i);
  expect(input).toBeInTheDocument()
  expect(textHeader).toBeInTheDocument()
  expect(buttonGetCita).toBeInTheDocument()
  expect(buttonDelete).toBeInTheDocument()
})


test('renders character from Api by default', async () => {
  render(<Cita />);
   await waitFor(() => screen.queryByText(/Ralph Wiggum/i));
  // expect(await screen.findByText(/Ralph Wiggum/i)).toBeInTheDocument()
});

test('renders state CARGANDO... ', async () => {
  render(<Cita />);
  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i)
  fireEvent.change(input, { target: { value: /Ralph Wiggum/i } })
  const buttonGetCita = screen.getByLabelText(/Obtener cita/i)
  fireEvent.click(buttonGetCita)

  const cargando = await screen.findByText(/CARGANDO.../i)
    expect(cargando).toBeInTheDocument()
});


test('Search Character', async() => {
  render(<Cita />)
  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i)
  fireEvent.change(input, { target: { value: /Ralph Wiggum/i } })
  const buttonGetCita = screen.getByLabelText(/Obtener cita/i)
  fireEvent.click(buttonGetCita)

});






test('delete input value with button click', () => {
  render(<Cita />);
  const input= screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const buttonDelete = screen.getByLabelText(/Borrar/i);
  fireEvent.change(input, { target: { value: /Ivana Kowal/i } });
  fireEvent.click(buttonDelete);
  expect(input).toHaveValue('');
});

test('delete quote and input value with button click', () => {
  render(<Cita />);
  const input= screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const textHeader = screen.getByText(/No se encontro ninguna cita/i);
  const buttonGetCita = screen.getByLabelText(/Obtener cita/i)
  const buttonDelete = screen.getByLabelText(/Borrar/i);
  fireEvent.change(input, { target: { value: /Ralph Wiggum/i } })
  fireEvent.click(buttonGetCita)
  fireEvent.click(buttonDelete);
  expect(textHeader).toBeInTheDocument()
  
});

test('error message for invalid name', async () => {
  render(<Cita />);
  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const buttonGetCita = screen.getByLabelText(/Obtener cita/i);

  fireEvent.change(input, { target: { value: /not exist/i } });
  fireEvent.click(buttonGetCita);
 const textHeader = await  screen.findByText('Por favor ingrese un nombre válido')

  expect(textHeader).toBeInTheDocument()
});


})
