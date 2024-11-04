import React from 'react'
import './Video.css'
import Play_Video from '../../Components/Play_Video/Play_Video'
import Recommended from '../../Components/recommended/recommended'
import { useParams } from 'react-router-dom'


function Video() {
      const {videoId,categoryId}=useParams()
  return (
    <>
     <div className='play-container'>

        <Play_Video videoId={videoId} />
        <Recommended categoryId={categoryId}/>
        
     </div>
    </>
  )
}

export default Video
