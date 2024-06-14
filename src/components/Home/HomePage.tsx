import { useState } from 'react'
import CaptureImage from '../CaptureImage/CaptureImage'
import Album from '../Album/Album'
import { Album as AlbumTypes, Emotion } from '../types'

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [albums, setAlbums] = useState<AlbumTypes[]>([])
  const [emotions, setEmotions] = useState<Emotion>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='bg-emerald-50 min-h-screen flex flex-col items-center pt-5'>
      <h1 className='text-center text-5xl text-amber-500 font-bold mb-4'>
        EmoTunes
      </h1>
      <p className='text-center text-lg text-gray-700 mb-8'>
        Discover music that matches your emotions. Capture your mood and let the
        tunes flow.
      </p>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8'
        onClick={openModal}
      >
        Let's Begin by Taking a Picture
      </button>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-2/6 h-2/4 max-w-3xl max-h-[90vh] rounded-lg p-4 overflow-y-auto'>
            <div className='flex justify-end'>
              <button
                className='text-gray-500 hover:text-gray-700'
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <CaptureImage
              closeModal={closeModal}
              setAlbums={setAlbums}
              setEmotions={setEmotions}
              emotions={emotions}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      )}
      <p className='text-center text-sm text-gray-500 mt-6'>
        Note: Your captured images and emotions are processed in real-time and
        not stored.
      </p>
      <Album albums={albums} emotions={emotions} isLoading={isLoading} />
    </div>
  )
}

export default HomePage
