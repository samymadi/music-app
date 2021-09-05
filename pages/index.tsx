import type { NextPage } from 'next'

//Components Imports 
import Layout from '../component/Layout'
import SearchBarInput from '../component/SearchBarInput/SearchBarInput';
import Album from '../component/Album/Album';
import axios from 'axios'


//Styles 
import styles from '../styles/Home.module.css';
import MyApp from './_app';
import { PropsWithChildren } from 'react';

const {container,search_bar,album_section} = styles


interface Props {
  albums : any[]
}

const Home: NextPage = ({albums}) => {



  return (

    <Layout className={container}  title='Music App | Home' >
        <header>
          <SearchBarInput className={search_bar} ></SearchBarInput>
        </header>

        <section className={album_section}>
         {albums.map((album:any)=>
         <Album key={album.id} album={album} />
         )}
        </section>
        <footer></footer>
    </Layout>
    
  )
}

export default Home





export const getStaticProps  = async()=>{


  const albums = await axios.get('https://api.deezer.com/search/album/?q=b&index=0&limit=100&')
  .then(res=>{
    if(res.status == 200)
      return res.data.data.map((element:any)=>({
        id:element.id,
        title:element.title,
        artist:element.artist.name,
        songs:element.nb_tracks,
        link : element.link,
        cover:element.cover_medium
        
      }))
      else throw res;
  })
  .catch(err=>console.error(err));



  return {
    props:{
        albums
    }
  }
}
