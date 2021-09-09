import React from 'react'
import axios from 'axios';

import {convertToMinute} from '../../utils/utilsFunctions';

import {  GetStaticPropsContext, NextPage } from 'next'



import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import AlbumIcon from '@material-ui/icons/Album';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {
     IconButton,
     Tooltip,
     Zoom,
     List,
     ListItem,
     ListItemText,
     Divider,
     ListItemIcon,  
     Typography} from '@material-ui/core';

//style
import styles from '../../styles/artist.module.css';


//Components imports
import Layout from '../../component/Layout';
import Link from 'next/link';


const {container,artist_details,artist_content_details,data_container,tracks_section,list_container} = styles

const useStyles  = makeStyles((theme:Theme)=>createStyles({
    listContainr:{
        height:'250px',
        overflowY:"scroll",
        width:'90%',
        margin :'0 auto'
        
    
    },
    root:{
            color:"white",
            flex:'1'
    },
    itemContainer:{
        display:'flex',
        color:'white',
    },
}))
 
const Artist : NextPage<{artist:any | null,tracks:any | null}>  = ({artist,tracks}) => {


  console.log(convertToMinute(15));

     const  {id,name,link,cover,nb_album,nb_fan} = artist

     const classes = useStyles();
       
     return    <Layout title='Music App | Daft Punk'>
                <div className={container}>
                   <section className={artist_details}>

                     <img src={cover} alt={name} />
                     <div className={artist_content_details}>  
                            <h1>{name}</h1>
                          
                            <div className={data_container}>
                                    <GroupIcon style={{color : 'white'}} ></GroupIcon>   
                                 
                                 <p> {nb_fan} fans </p>
                            </div>

                            <div className={data_container}>
                                
                                    <AlbumIcon style={{color : 'white'}} ></AlbumIcon>   
                        
                                 <p>{nb_album} albums</p>
                            </div>

                            <Link href={`https://www.google.com/search?q=${name}`}>
                                <a target='_blank'>
                                    <Tooltip  title={`Search in google ${name}`} placement="bottom" arrow TransitionComponent={Zoom}>   
                                    
                                            <div className={data_container}>
                                                            <LanguageIcon style={{color : 'white'}} ></LanguageIcon>  
                                                            <p>About {name} </p>
                                            </div>
                                    
                                    </Tooltip>
                                </a>
                            </Link> 
                               
                               
                           
                           
                           
                     </div>
                   </section>

                   <section className={tracks_section}>
                        <h3>Top 5 tracks</h3>
                        <List className={`${classes.listContainr} ${list_container}`}>
                            {tracks && tracks.map(({id,title,duration,link:track_link}:{id:number,title:string,duration:number,link:string})=>
                                       ( 
                                           
                                                <ListItem className={classes.itemContainer} divider key={id}>
                                                    <ListItemIcon>
                                                        <IconButton>
                                                            <Link href={track_link}>
                                                                <a target='_blank'>
                                                                    <PlayCircleFilledIcon style={{color:'white'}} ></PlayCircleFilledIcon>
                                                                </a>
                                                            </Link>
                                                        </IconButton>  
                                                    </ListItemIcon>            
                                                    <ListItemText  className={classes.root}>
                                                        {title}
                                                    </ListItemText> 
                                                    <ListItemText style={{color:'lightgray'}}>
                                                        <Typography style={{fontSize:'14px',fontFamily:"Cabin"}} component="p">
                                                                {convertToMinute(duration)}
                                                        </Typography>
                                                    </ListItemText>     
                                                </ListItem>
                        
                                         )
                                    )
                            }   
                        </List>
                    </section> 
                   
                    
                </div>
        </Layout>

}
        
    

export default Artist;






export const getStaticPaths = async ()=>{


    const res = await axios.get('https://api.deezer.com/search/album/?q=b&index=0&limit=100') 
    let paths;
        if(res.status == 200)

         {
             paths = res.data.data.map((element:any)=>(
                {params:{artist_id:element.artist.id.toString()}}
            ))
         }
        else throw new Error(res.status + 'Error fetch data url : https://api.deezer.com/search/album/?q=b&index=0&limit=100' );
   
    return {
        paths,
        fallback:false
    }
}





export const getStaticProps = async( context : GetStaticPropsContext<{artist_id:string}>)=>{

    let artist
    let tracks
    const response = await axios.get('https://api.deezer.com/artist/'+context.params?.artist_id)

    if(response.status === 200)
       {
        const {id,name,link,picture_medium,nb_album,nb_fan} = response.data;
        artist = {
            id,
            name,
            link,
            cover : picture_medium,
            nb_album,
            nb_fan
        };
            const res = await axios.get('https://api.deezer.com/artist/27/top');
            if(res.status === 200){
                console.log(res.data);
                    tracks = res.data.data.map((track:any)=>({
                        id:track.id,
                        title:track.title,
                        duration:track.duration,
                        link:track.link
                    })
                        

                    )
            }
                else  throw new Error(`${res.status} Error Error fetch data url: https://api.deezer.com/artist/27/top `);


        }else throw new Error(`${response.status} Error fetch data url: https://api.deezer.com/artist/27`);

           
    return {    
        props:{
            artist,
            tracks
        }
    }
}