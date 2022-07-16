import { useState, useEffect, createContext} from 'react'

const CategoriasContext = createContext()

const CategoriasProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])

    const obtenerCategorias = async () => {

        try{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

            const resultado = await fetch(url)

            const respuesta = await resultado.json()

            const {drinks} = respuesta

            setCategorias(drinks)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCategorias()
    },[])

    return(

        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )

}

export {
    CategoriasProvider
}

export default CategoriasContext