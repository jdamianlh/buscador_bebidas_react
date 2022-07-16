import { useState, useEffect, createContext} from 'react'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {

    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(()=>{
        setCargando(true)
        const obtenerReceta = async()=>{
            if(!bebidaId) return
            try{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const resultado = await fetch(url)

                const respuesta = await resultado.json()

                const {drinks} = respuesta

                setReceta(drinks[0])
                setCargando(false)

            }catch(error){
                console.log(error)
            }
        }
        obtenerReceta()
    }, [bebidaId])

    const consultarBebida = async datos => {
        try{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            const respuesta = await fetch(url)

            const resultado = await respuesta.json()

            const {drinks} = resultado

            setBebidas(drinks)
        }catch(error){
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }
    const handleBebidaIdClick = id =>{
        setBebidaId(id)
    }

    return(

        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                cargando
            }}
        >
            {children}
        </BebidasContext.Provider>
    )

}

export {
    BebidasProvider
}

export default BebidasContext