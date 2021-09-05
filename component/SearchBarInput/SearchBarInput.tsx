import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'

//Styles
import styles from './style.module.css';



const {container} = styles;

interface Props {
    className? :string
}

function SearchBarInput(props:Props) {

    const {className} = props;


    const handleClick = ():void=>{
        alert('oke');
    }

    return (
        <div className={`${container} ${className}`}>
            <input type="text" placeholder='Artist/Album ...'/>
            <IconButton onClick={handleClick} >
                <SearchIcon style={{color:"black"}}/>
            </IconButton>    
        </div>
    )
}

export default SearchBarInput
