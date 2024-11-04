import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { value_count} from '../../data'
import moment from 'moment/moment'


function Feed({ category }) {
     const [data, setData] = useState([])  // Initialize with an empty array

     const fetchData = async () => {
          const videoList_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
          
          try {
               const response = await fetch(videoList_URL);
               const result = await response.json();
               setData(result.items || []);  // Ensure 'items' is an array
          } catch (error) {
               console.error('Error fetching the data:', error);
          }
     }

     useEffect(() => {
          fetchData()
     }, [category])

     return (
          <div className='feed'>
               {data.length > 0 ? data.map((item, index) => (
                    <Link key={index} to={`/video/${item.snippet.categoryId}/${item.id}`} className='card'>
                         <img src={item.snippet.thumbnails.medium.url} alt="thumbnail1" />
                         <h2>{item.snippet.title}</h2>
                         <h3>{item.snippet.channelTitle}</h3>
                         <p>{value_count(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
               )) : (
                    <p>Loading...</p>  // Show a loading message if data is empty
               )}
          </div>
     )
}

export default Feed
