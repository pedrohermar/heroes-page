import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedSearchPage = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedSearchPage
}))

describe('Pruebas en <SearchPage />', () => { 

    beforeEach(() => jest.clearAllMocks())

    test('debe mostrarse correctamente con valores por defecto', () => { 

        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()
    })

    test('debe mostrar al heroe y el input con el valor del queryString', () => { 

        const hero = "batman"

        render(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <SearchPage />
            </MemoryRouter>
        )
        
        const input = screen.getByRole('textbox')
        expect( input.value ).toBe(hero)

        const img = screen.getByRole('img')
        expect( img.src ).toContain(hero)

        const alertDanger = screen.getByLabelText('alert-danger')
        expect( alertDanger.style.display ).toBe('none')

     })

     test('debe mostrar un error si no se encuentra el hero', () => { 

        const hero = "joker"

        render(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <SearchPage />
            </MemoryRouter>
        )

        const alertDanger = screen.getByLabelText('alert-danger')
        expect( alertDanger ).toBeTruthy()

      })

      test('debe llamar el navigate a la nueva pantalla', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change( input, { target: { name: 'searchText', value: 'superman'}} )
        
        const form = screen.getByRole('form')
        fireEvent.submit( form )

        expect( mockedSearchPage ).toHaveBeenCalledWith('?q=superman')
      })
 })