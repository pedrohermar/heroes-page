import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"

import { AuthContext } from "../../../src/auth"
import { NavBar } from "../../../src/ui"

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <NavBar />', () => { 

    const contextValue = {
        logged: true,
        user: {
            name: "Pedro",
            id: "123"
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('debe mostrar el nombre del usuario logeado', () => { 

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Pedro') ).toBeTruthy()

     })

     test('debe llamar el logout y navigate cuando se hace click en el botón', () => { 

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button')
        fireEvent.click( logoutBtn )

        expect( contextValue.logout ).toHaveBeenCalled()
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {replace: true})
      })

 })