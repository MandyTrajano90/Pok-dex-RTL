import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    await user.click(detailsLink);
    expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pok/i)).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i })).toBeInTheDocument();
    expect(screen.getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    const imgMaps = screen.queryAllByAltText('Pikachu location');
    expect(imgMaps).toHaveLength(2);
    const firstMap = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    const secondMap = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imgMaps[0]).toHaveAttribute('src', firstMap);
    expect(imgMaps[1]).toHaveAttribute('src', secondMap);
  });
  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });
    const favPoke = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    await user.click(favPoke);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    const favLink = screen.getByRole('link', { name: /Favorite Pok/i });
    await user.click(favLink);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    await user.click(detailsLink);
    await user.click(favLink);
    expect(star).not.toBeInTheDocument();
  });
});
