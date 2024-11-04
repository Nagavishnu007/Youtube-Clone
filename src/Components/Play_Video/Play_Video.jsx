import React, { useEffect, useState } from 'react';
import './Play_Video.css';
// import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
// import jack from '../../assets/jack.png';
//import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from '../../data';
import { value_count } from '../../data';
import moment from 'moment/moment';



function Play_Video({ videoId }) {
  

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData,setCommentData]=useState([])

  const fetchVideoData = async () => {
    const videoDetails_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(videoDetails_Url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setApiData(data.items[0]);
    }
  };

  const fetchOtherData = async () => {

    if (apiData && apiData.snippet) {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelData_url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      }
    }
    
    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  };


  useEffect(() => {
    fetchVideoData();
  }, [videoId]); // Ensure that this runs when videoId changes

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]); // Ensure this only runs when apiData is available

  
  return (
    <>
      <div className='play-video'>

        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>

        <div className='play-video-info'>
          <p>
            {apiData ? value_count(apiData.statistics.viewCount) : "16k"} &bull;{' '}
            {moment(apiData ? apiData.snippet.publishedAt : "").fromNow()}
          </p>

          <div>
            <span><img src={like} alt='like' />{apiData ? value_count(apiData.statistics.likeCount) : ""}</span>
            <span><img src={dislike} alt='dislike' /></span>
            <span><img src={share} alt='share' />share</span>
            <span><img src={save} alt='save' />save</span>
          </div>

        </div>

        <hr />

        <div className='publisher'>
          <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="jack" />
          <div>
            <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
            {/* <span>{channelData?value_count(channelData.statistics.subscriberCount):"1M"} Subscriber</span> */}
          </div>
          <button>Subscribe</button>
        </div>

        <div className='vid-description'>
          <p>{apiData ? apiData.snippet.description.slice(0, 238) : "Description here"}</p>
          <hr />
          <h4>{apiData ? value_count(apiData.statistics.commentCount) : 135} comments</h4>

          {commentData && commentData.length > 0 ? (
                 commentData.map((item, index) => (
                 <div key={index} className='comment'>
                  <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user_profile" />
                <div>
               <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div className='comment-action'>
          <img src={like} alt="like" />
          <span>{value_count(item.snippet.topLevelComment.snippet.likeCount)}</span>
          <img src={dislike} alt="dislike" />
        </div>
      </div>
    </div>
  ))
) : (
  <p>No comments available</p>
)}
        </div>



      </div>
    </>
  );
}

export default Play_Video;
