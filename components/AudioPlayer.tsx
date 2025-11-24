'use client'; 

import React from 'react';

import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';
import { FiPlay, FiPause } from 'react-icons/fi';
import styles from './AudioPlayer.module.css';

import type { CSSProperties } from 'react';

type SliderStyle = CSSProperties & { ['--val']?: string };

type Props = {
  value: number; //0-100 slider percent
  current: string;  // "01:07"
  total: string; // "03:24"
  playing?: boolean;
  onToggle?: () => void;
  onBack10?: () => void;
  onFwd10?: () => void;
  onSeek?: (v: number) => void;
};

export default function AudioPlayer({
  value, current, total, playing,
  onToggle, onBack10, onFwd10, onSeek
}: Props) {
  
  return (
    <div className={styles.bar}>
      {/* Play control */}
      <div className={styles.controls}>
        <button className={styles.iconBtn} onClick={onBack10} aria-label='Back 10s'>
          <TbRewindBackward10 size={24}/>
        </button>
        <button className={styles.playBtn} onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <FiPause className={styles.innerIcon} size={24} /> : <FiPlay className={styles.innerIcon} size={24} style={{ marginLeft: 3 }} />}
        </button>
        <button className={styles.iconBtn} onClick={onFwd10} aria-label="Forward 10s">
          <TbRewindForward10 size={24} />
        </button>
      </div>

      {/* progress */}
      <div className={styles.progressWrap}>
        <span className={styles.time}>{current}</span>
        <input type="range" className={styles.slider} min={0} max={100} value={value}
          onChange={(e) => onSeek?.(Number(e.target.value))}
          style={{ ['--val']: `${value}%` } as SliderStyle}
          aria-label='Playback position'/>
        <span className={styles.time}>{total}</span>
      </div>
    </div>
  );
}