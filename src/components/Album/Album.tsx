// import { useEffect, useState } from 'react'
import { Album as AlbumTypes } from '../types'
const Album: React.FC<{ albums: AlbumTypes[] }> = ({ albums }) => {
  return (
    <div>
      {albums?.map(album => (
        <iframe
          src={`https://open.spotify.com/embed/album/${album.album.id}`}
          width='300'
          height='380'
          allow='encrypted-media'
        ></iframe>
      ))}
    </div>
  )
}
export default Album
