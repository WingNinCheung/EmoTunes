// import { useEffect, useState } from 'react'
import { Album as AlbumTypes, Emotion } from '../types'
import { BeatLoader } from 'react-spinners'
const Album: React.FC<{
  albums: AlbumTypes[]
  emotions: Emotion
  isLoading: boolean
}> = ({ albums, emotions, isLoading }) => {
  const emotionArray = emotions ? Object.entries(emotions) : []
  if (emotionArray.length) emotionArray.sort((a, b) => b[1] - a[1])

  return (
    <div>
      {emotionArray.length > 0 && (
        <p className='text-center text-lg'>
          It looks like you are feeling {emotionArray[0][1].toFixed()}%{' '}
          {emotionArray[0][0]} and {emotionArray[1][1].toFixed()}%{' '}
          {emotionArray[1][0]}
        </p>
      )}
      {albums.length > 0 ? (
        albums.map(album => (
          <iframe
            src={`https://open.spotify.com/embed/album/${album.album.id}`}
            width='300'
            height='380'
            allow='encrypted-media'
          ></iframe>
        ))
      ) : isLoading ? (
        <>
          <BeatLoader color='#36d7b7' />
        </>
      ) : null}
    </div>
  )
}
export default Album
