import React, { useState, useEffect, useRef } from 'react'
import { WaveFile } from 'wavefile'

import {
    IoPlayCircleOutline,
    IoPauseCircleOutline,
    IoDownloadOutline,
} from 'react-icons/io5'
import AudioVisualizer from './AudioVisualizer'

const Audio = ({ samples, sampleRate }) => {
    const [playing, setPlaying] = useState(false)
    const audioContextRef = useRef(null)
    const sourceRef = useRef(null)

    useEffect(() => {
        audioContextRef.current = new AudioContext()
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    const playAudio = () => {
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume()
        }

        const audioBuffer = audioContextRef.current.createBuffer(1, samples.length, sampleRate)
        const channelData = audioBuffer.getChannelData(0)
        channelData.set(samples)

        sourceRef.current = audioContextRef.current.createBufferSource()
        sourceRef.current.buffer = audioBuffer
        sourceRef.current.connect(audioContextRef.current.destination)
        sourceRef.current.start()
        sourceRef.current.onended = () => {
            setPlaying(false);
            sourceRef.current = null; // Nullify the reference to allow garbage collection and future reinitialization
        }
    }

    const togglePlayPause = () => {
        if (!audioContextRef.current) return;

        if (!playing) {
            if (!sourceRef.current) {
                playAudio();
            } else {
                audioContextRef.current.resume();
            }
        } else {
            audioContextRef.current.suspend();
        }

        setPlaying(!playing);
    }

    const saveAsWav = () => {
        let wav = new WaveFile()
        const data = new Int16Array(samples.map((n) => n * 32767))

        wav.fromScratch(1, 22050, '16', data)

        const blob = new Blob([wav.toBuffer()], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)

        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'output.wav'

        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)

        URL.revokeObjectURL(url)
    }

    return (
        <div className='flex content-center items-center gap-3'>
            <button
                onClick={togglePlayPause}
                className='bg-primary p-1 rounded-md flex items-center justify-center duration-100 hover:bg-accent'
                aria-label={playing ? 'Pause audio' : 'Play audio'}
            >
                {playing ? <IoPauseCircleOutline className='text-primary-text text-4xl' />
                         : <IoPlayCircleOutline className='text-primary-text text-4xl' />}
            </button>

            <AudioVisualizer samples={samples} />

            <button
                onClick={saveAsWav}
                className='bg-primary p-1 rounded-md flex items-center justify-center duration-100 hover:bg-accent'
                aria-label='Download audio'
            >
                <IoDownloadOutline className='text-primary-text text-4xl' />
            </button>
        </div>
    )
}

export default Audio
