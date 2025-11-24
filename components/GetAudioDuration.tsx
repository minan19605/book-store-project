'use client';

import React, {useEffect, useState} from 'react'

export function fmt(t:number) {
  const m = Math.floor(t /60);
  const s = Math.floor(t % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2,'0')}`
}

export default function GetAudioDuration({audioUrl}: {audioUrl:string}) {
    const [duration, setDuration] = useState(0)
    useEffect(() => {
        const audio = new Audio(audioUrl)
        let isCancelled = false;

        // Load metadata
        const handleLoadedMetadata = () => {
            if(!isCancelled && audio.duration !== Infinity && !isNaN(audio.duration)){
                setDuration(audio.duration)
            }
        }

        const handleError = () => {
            if(!isCancelled) {
                console.log("Error loading audio metadata for: ", audioUrl)
            }
        }

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);

        // cleanup:
        return ()  => {
            isCancelled = true;
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('error', handleError);
        }
    }, [audioUrl])



  return (<div className='text-sm font-light text-[#6b757b]'>{fmt(duration)}</div>);
}
