import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/router/PrivateRoute"
import { MemoryRouter } from "react-router-dom"

describe('Pruebas en <PrivateRoute />', () => { 

    test('debe recuperar la última ruta que a la que accedió del localStorage', () => { 

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                name: 'Rocio',
                id: '456'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=spiderman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute> 
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta Privada') ).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=spiderman")

     })

 })