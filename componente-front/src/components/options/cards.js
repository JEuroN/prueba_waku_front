import React from 'react'
import '../../App.css'

const Cards = ({gatos}) => {

    const newWindow = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    }

    const card = gatos.map((gato, index)=>{
        const {post_id, post_url, post_breed, post_category, post_origin} = gato;
        return (
            <div onClick={()=>{newWindow(post_url)}} key={post_id} className='column' style={{backgroundImage: `url(${post_url})`}}>
                {post_breed !== null ? (
                    <div className='column'>
                        <p className='p-row'>Raza: {post_breed}<br />Pais: {post_origin}</p>
                    </div>
                    ) : null}
                {post_category !== null ? (
                        <p className='p-row'>Categoria: {post_category}</p>
                ) : null}
            </div>
        )
    })

    return ( 
        <div className='card-container'>
            {card.length > 0 ? (card) : (<div className='loader'></div>)}
        </div>
     );
}
 
export default Cards;