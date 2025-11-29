'use client'; 

import React, {useState,useEffect, useRef} from 'react'

import { Book } from './ForYouSelected';
import AudioPlayer from './AudioPlayer';
import { useAuth } from '@/components/AuthContext';

import styles from './AudioBar.module.css'
import { addBookToFinished } from './DbOperation';

function fmt(t:number) {
  const m = Math.floor(t /60);
  const s = Math.floor(t % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2,'0')}`
}

export default function AudioBar({bookData}:{bookData:Book}) {

  const { currentUser} = useAuth()

  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = bookData.audioLink;



  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;

    audio.src = audioSrc;
    audio.load()

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrent(audio.currentTime || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false) ;
    // const onEnded = () => { setPlaying(false); setCurrent(audio.duration || 0)}

    const onEnded = async () => {

      setPlaying(false);
      setCurrent(audio.duration || 0);
      if(currentUser) {
        const userId = currentUser.uid
        await addBookToFinished(userId, bookData.id)
      }
    }

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioSrc, bookData.id, currentUser])

  const togglePlay = () => {
    const audio = audioRef.current;
    if(!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  const back10 = () => {
    const audio = audioRef.current;
    if(!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const fwd10 = () => {
    const audio = audioRef.current;
    if(!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10)
  }

  const onSeek = (value: number) => {
    const audio = audioRef.current!;
    if (!audio || duration === 0) return;
    audio.currentTime = (value / 100) * duration;
  };

  const percent = duration ? (current / duration) * 100 : 0;

  return (
    <div className={styles["audio_bar"]}>
        <div className={styles["book__wrapper"]}>
            <figure className={styles["book__img--wrapper"]}>
                <img src={bookData.imageLink} className={styles["book__img"]} />
            </figure>
            <div className={styles["book__info"]}>
                <div className="book__title">
                    {bookData.title}
                </div>
                <div className={styles["book_author"]}>
                    {bookData.author}
                </div>
            </div>
        </div>
        {/* hidden audio element */}
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        <AudioPlayer 
          value={percent}
          current={fmt(current)}
          total={fmt(duration)}
          playing={playing}
          onToggle={() => togglePlay()}
          onBack10={() => back10()}
          onFwd10={() => fwd10()}
          onSeek={onSeek}
        />
        
    </div>
  )
}
