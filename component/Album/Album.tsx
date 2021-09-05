import React from 'react'
import Link from 'next/link'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


// styles
import styles from './Album.module.css';



const {container,content,play_button } = styles;


interface Props {
    className?:string
    album:{
        id:number
        title:string,
        songs:number,
        link :string,
        cover:string,
        artist:string
    }
}

function Album(props: Props) {  

    const {title,songs,link,cover,artist} = props.album;
    return (
        <div className={container}>
                    <img src={cover}  alt={title} />
                    <Link href={link}>
                      <a  target='_blank' > <PlayCircleFilledIcon className={play_button} fontSize="large"/></a>
                    </Link>
                   
                    <div className={content}>
                            <h3>{title}</h3>
                            <p>Artist : {artist} </p>
                            <p>Songs: {songs}</p>
                            <p>Release :  1 jun 2000 </p>
                    </div>
        </div>
    )
}

export default Album
