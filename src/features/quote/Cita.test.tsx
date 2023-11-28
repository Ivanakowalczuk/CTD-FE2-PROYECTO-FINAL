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
  fireEvent.change(input, { target: { value: /Groundskeeper Willie/i } })
  const buttonGetCita = screen.getByLabelText(/Obtener cita/i)
  fireEvent.click(buttonGetCita)
  const quoteElement = await screen.findByText(/Groundskeeper Willie/i);
  expect(quoteElement).toBeInTheDocument();

});

test('delete input value with button click', () => {
  render(<Cita />);
  const input= screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const buttonDelete = screen.getByLabelText(/Borrar/i);
  fireEvent.change(input, { target: { value: /Ivana Kowa/i } });
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


test("Display error message if the value is a number", async () => {
  render(<Cita />);
  const input = screen.getByLabelText("Author Cita");
  fireEvent.change(input, { target: { value: "10" } });
  expect(input).toHaveDisplayValue("10");
  fireEvent.click(screen.getByLabelText("Obtener Cita"));
  const textHeader= await screen.findAllByText("Por favor ingrese un nombre válido")
  expect(textHeader).toBeInTheDocument
});


test("Display quote if a value is a correct name", async () => {
  render(<Cita />);
  const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const butttonSeartch = screen.getByLabelText(/Obtener Cita/i);
  fireEvent.change(inputSearch, { target: { value: 'Groun' } });   
  fireEvent.click(butttonSeartch);
  await waitFor(() => screen.findByText(/Back in Edinburg, we had a coal miners strike. All we wanted were hats with a wee light on top. Then one day the mine collapsed. No one made it out alive, not even Willie!/i));
});


})
