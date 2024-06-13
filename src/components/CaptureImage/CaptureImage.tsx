import Webcam from 'react-webcam'
import React, { useRef, useState, useEffect } from 'react'

const CaptureImage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const [imageSrc, setImageSrc] = useState<string | null>()
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>()
  const [errors, setErrors] = useState<string>('')

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

  const capture = () => {
    setErrors('')
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageSrc(imageSrc)
    }
  }

  const handleSave = async () => {
    if (!imageSrc) return
    setErrors('')
    const response = await fetch('api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageSrc })
    })
    if (response.ok) {
      console.log('Image uploaded successfully')
      console.log(await response.json())
    } else {
      setErrors(
        "Oops! We couldn't find your face. Try adjusting the lighting or moving closer to the camera"
      )
    }
  }
  console.log(errors)

  return (
    <div>
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt='Your Picture' />
          <div>{errors}</div>
          <button
            className='bg-blue-500 hover:bg-blue-700 disabled:opacity-50
 text-white font-bold py-2 px-4 rounded'
            onClick={handleSave}
            disabled={errors.length > 0}
          >
            Generate Music!
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => setImageSrc('')}
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
    </div>
  )
}

export default CaptureImage
