import React, {useState, useEffect} from 'react'
import Random from './Random'
import Search from './Search'
import axios from 'axios';
import {url} from '../../setUrl'
import '../../App.css'
import logoutIcon from '../../Assets/logout.png'


const Dash = ({setTab}) => {

    const [view, setView] = useState(1);

    const [gatos, setGatos] = useState([]);

    const [amount, setAmount] = useState(0);
    
    const [name, setName] = useState(0);

    const filter = (array, catAmount) => {
        let newArray = array.filter((catPic, index)=>{
            return index >= catAmount && index < catAmount+4;
        })
        return newArray;
    }

    const [album, setAlbum] = useState([...filter(gatos)]);
    
    const handleAmount = (MoreOrLess, request) => {
        if(MoreOrLess) {
            if(gatos.length - amount !== 0)
            setAmount(amount+4);
            if(gatos.length - amount <= 8)
                getMoreCats(request);
        }else if(amount > 0){
            setAmount(amount-4);
        }
    }

    const searchGato = () => {
        let dir = url.localhost + '/dash';
        axios.get(dir, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            credentials: 'include',
            mode: 'cors'
    })
    .then((r)=>{
        setGatos([...gatos, ...r.data.msg]);
    })
    .catch((r)=>{
        console.log(r);
    })
    }

    const getMoreCats = (request) => {
        let dir = url.localhost + '/getGatos';
        axios.post(dir, {
            method: 'POST',
            data: request,
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            credentials: 'include',
            mode: 'cors'
        })
        .then((r)=>{
            console.log(r.data.msg);
            setGatos([...gatos, ...r.data.msg]);
        })
        .catch((r)=>{
            console.log(r);
        })
    }

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('SESSION'));
        setName(username.profileObj.givenName);
        searchGato();
    }, [])

    useEffect(()=>{
        setAlbum([...filter(gatos, amount)]);
    }, [amount, gatos])

    const logout = () => {
        localStorage.removeItem('SESSION');
        setTab(true);
    }

    const handleChangeView = (view) => {
        if(view===1)
            searchGato();
        setAmount(0);
        setView(view);
    }

    return ( 
        <div className='dash-container'>
            <header className='header' style={{width: '100%'}}>
                <h1 className='logo'>GatiMeow!</h1>
                <div style={{flex: '1' , display: 'flex', justifyContent: 'center'}}>
                    <button className={view === 1 ? 'active tab-button' : 'no-active tab-button'} onClick={()=>{handleChangeView(1)}}>Gatitos random</button>
                    <button className={view === 2 ? 'active tab-button' : 'no-active tab-button'} onClick={()=>{handleChangeView(2)}}>Buscar gatitos</button>
                </div>
                <div style={{flex: '1', display: 'flex', justifyContent: 'flex-end'}}>
                    <h2 className='logo'>Bienvenido {name}, miau!</h2>
                    <button className='logout tab-button' onClick={()=>{logout(true)}}><img src={logoutIcon} alt='logout'></img></button>
                </div>
            </header>
            {view === 1 ? (<Random gatos={gatos} album={album} handleAmount={handleAmount} />) : null}
            {view === 2 ? (<Search filter={filter} />) : null}
        </div>
     );
}
 
export default Dash;