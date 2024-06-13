import Webcam from 'react-webcam'
import React, { useRef, useState, useEffect } from 'react'
import Album from '../Album/Album'
import { BeatLoader } from 'react-spinners'
import { Emotion, Album as AlbumTypes } from '../types'

const CaptureImage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const [imageSrc, setImageSrc] = useState<string | null>()
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>()
  const [errors, setErrors] = useState<string>('')
  const [emotions, setEmotions] = useState<Emotion | null>()
  const [dominantEmotion, setDominantEmotion] = useState<string>('')
  const [albums, setAlbums] = useState<AlbumTypes[]>([])

  const emotionEntries = emotions ? Object.entries(emotions) : []
  if (emotionEntries.length) emotionEntries.sort((a, b) => b[1] - a[1])

  useEffect(() => {
    const getDevices = async () => {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput'
      )
      setDevices(videoDevices)
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId)
      }
    }
    getDevices()
  }, [])

  // cature user's image
  const capture = () => {
    setErrors('')
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageSrc(imageSrc)
    }
  }
  // get recommended albums based on the dominant emotion
  const getAlbums = async (highestEmotion: string) => {
    const data = await fetch(`api/albums/${highestEmotion}`)
    if (data.ok) {
      const response = await data.json()
      setAlbums(response)
    }
  }

  // find the dominant emotion
  const findDominantEmotion = async (emotions: Emotion) => {
    let highestEmotion = ''
    let highestValue = -Infinity
    for (const emo in emotions) {
      if (emotions[emo] > highestValue) {
        highestValue = emotions[emo]
        highestEmotion = emo
      }
    }
    setDominantEmotion(highestEmotion)
    await getAlbums(highestEmotion)
    return
  }


  const handleSave = async () => {
    if (!imageSrc) return
    setErrors('')

    // Send a POST request to the 'api/images' endpoint with the captured image
    const response = await fetch('api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageSrc })
    })
    if (response.ok) {
      console.log('Image uploaded successfully')
      const data = await response.json()
      setEmotions(data)
      findDominantEmotion(data)
    } else {
      setErrors(
        "Oops! We couldn't find your face. Try adjusting the lighting or moving closer to the camera"
      )
    }
  }

  return (
    <div>
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt='Your Picture' />
          <div>{errors}</div>
          <button
            className='bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded'
            onClick={handleSave}
            disabled={errors.length > 0}
          >
            Generate Music!
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              setImageSrc('')
              setEmotions(null)
            }}
          >
            Re-Capture
          </button>
        </div>
      ) : (
        <div>
          <label htmlFor='cameraSelect'>Choose your camera: </label>
          <select
            id='cameraSelect'
            onChange={e => setSelectedDeviceId(e.target.value)}
            value={selectedDeviceId || ''}
          >
            {devices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
          {selectedDeviceId && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={{ deviceId: selectedDeviceId }}
              width={320}
              height={240}
            />
          )}
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={capture}
          >
            Take a picture
          </button>
        </div>
      )}
      {dominantEmotion && emotionEntries.length > 0 && (
        <div>
          It looks like you are feeling {emotionEntries[0][1].toFixed()}%{' '}
          {emotionEntries[0][0]} and {emotionEntries[1][1].toFixed()}%{' '}
          {emotionEntries[1][0]}
          {albums.length > 0 ? (
            <Album albums={albums} />
          ) : (
            <BeatLoader color='#36d7b7' />
          )}
        </div>
      )}
    </div>
  )
}

export default CaptureImage
