import React, {useState} from 'react'
import '../../App.css'

const Dropdown = ({search, setSearch, options}) => {

    const [isDown, setIsDown] = useState(false);

    const handleDown = (param, option, filter = 'No seleccionado') => {
        setSearch({param: param, opt: option, filter});
        setIsDown(!isDown);
    }
    
    return ( 
    <div style={{marginRight: '10px'}}>
        <div className='drop-header' >
            <button style={{minWidth: '25vh'}} onClick={()=>{setIsDown(!isDown)}}>{search.param}</button>
        </div>
        {isDown ? (<div className='openDrop' style={{minWidth: '25vh'}}>
            <button className='btnOption' onClick={()=>(handleDown('Ninguna', 1))}>Ninguna</button>
            <button className='btnOption' onClick={()=>(handleDown('Raza', 2))}>Raza</button>
            <button className='btnOption' onClick={()=>(handleDown('Categoria', 3))}>Categoria</button>
        </div>) : <div className='closedDrop'></div>}
    </div> 
    );
}
 
export default Dropdown;