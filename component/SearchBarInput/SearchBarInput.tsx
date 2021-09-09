import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'

//Styles
import styles from './style.module.css';


//3 rd parts
import classNames from 'classnames';



const {container,input_visible,container_animate} = styles;

interface Props {
    className? :string
}



function SearchBarInput(props:Props) {

    const {className} = props;

    const [containerClass,setContainerClass] = useState<string>(classNames(container,className));
    const [inputClass,setInputClass] = useState<string>('');
    



    // -------------------------------------------Event Handlers------------------------------------

    const handleClick = ():void=>{
        setInputClass(input_visible)
        setTimeout(()=> setContainerClass(prev=>classNames(prev,container_animate)));
    }

    return (
        <div className={containerClass}>
            <input type="text" placeholder='Artist/Album ...' className={inputClass}/>
            <IconButton onClick={handleClick} >
                <SearchIcon style={{color:"black"}}/>
            </IconButton>    
        </div>
    )
}

export default SearchBarInput
