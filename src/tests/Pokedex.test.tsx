import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const dataID = 'pokemon-name';
const nextPokemon = /próximo pokémon/i;

describe('Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeInTheDocument();
  });

  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByTestId(dataID)).toHaveTextContent(/pikachu/i);
    await user.click(screen.getByText(nextPokemon));
    expect(screen.getByTestId(dataID)).toHaveTextContent(/charmander/i);
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista', async () => {
    const { user } = renderWithRouter(<App />);
    await user.tripleClick(screen.getByText(nextPokemon));
    await user.tripleClick(screen.getByText(nextPokemon));
    await user.tripleClick(screen.getByText(nextPokemon));
    expect(screen.getByTestId(dataID)).toHaveTextContent(/pikachu/i);
  });

  test('Teste se a Pokédex tem os botões de filtro:', async () => {
    const { user } = renderWithRouter(<App />);
    const filtersBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filtersBtns).toHaveLength(7);
    expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
    const psyBtn = filtersBtns[4];
    await user.click(psyBtn);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
  });
});
