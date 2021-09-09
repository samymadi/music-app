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
  albums : any[] | null
}

const Home: NextPage<Props> = ({albums}) => {



  return (

    <Layout className={container}  title='Music App | Home' >
        <header>
          <SearchBarInput className={search_bar} ></SearchBarInput>
        </header>

        <section className={album_section}>
         { albums && albums.map((album:any)=>
         <Album key={album.id} album={album} />
         )}
        </section>
        <footer></footer>
    </Layout>
    
  )
}

export default Home





export const getStaticProps  = async ()=>{




    const res = await axios.get('https://api.deezer.com/search/album/?q=b&index=0&limit=100')
    if(res.status === 200){
      const albums  = res.data.data.map((element:any)=>({
        id:element.id,
        title:element.title,
        artist:element.artist.name,
        artist_id:element.artist.id,
        songs:element.nb_tracks,
        link : element.link,
        cover:element.cover_medium
        
      }))

      return {
        props:{
            albums 
        }
      }
      
    }
      else throw Error('error fetch');
    
    
  }

  
