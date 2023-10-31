import { types } from "../../../src/auth/types/types"

describe('Pruebas en types.js', () => { 

    test('debe devolver los tipos correspondientes', () => {
        
        expect(types).toEqual({
            login: '[auth] Login',
            logout: '[auth] Logout'
        })

    })

 })