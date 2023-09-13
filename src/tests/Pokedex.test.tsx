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

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPoke).toBeInTheDocument();
    const pokeName = screen.getByTestId(/pokemon-name/i);
    expect(pokeName).toHaveTextContent(/Pikachu/);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Charmander/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Caterpie/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Ekans/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Alakazam/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Mew/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Rapidash/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Snorlax/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Dragonair/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Pikachu/i);
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

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const filtersBtns = screen.getAllByTestId('pokemon-type-button');
    const typesOfPoke = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokeNames = filtersBtns.map((type) => type.textContent);
    expect(pokeNames).toEqual(typesOfPoke);
  });

  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo e O botão All precisa estar sempre visível', async () => {
    const { user } = renderWithRouter(<App />);
    const psyBtn = screen.getByRole('button', { name: /psychic/i });
    await user.click(psyBtn);
    expect(psyBtn).toBeInTheDocument();
    const pokeName = screen.getByTestId(/pokemon-name/i);
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Mew/i);
    await user.click(nextPoke);
    expect(pokeName).toHaveTextContent(/Alakazam/i);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    await user.click(allBtn);
    expect(allBtn).toBeInTheDocument();
    const pokeFire = screen.getByRole('button', { name: /fire/i });
    await user.click(pokeFire);
    expect(pokeFire).toBeInTheDocument();
    const pokeName = screen.getByTestId(/pokemon-name/i);
    expect(pokeName).toHaveTextContent(/Charmander/i);
    await user.click(allBtn);
    expect(pokeName).toHaveTextContent(/Pikachu/i);
  });
});
