
import React from 'react'
import styles from './main.module.css'
import ForYouSelected from './ForYouSelected'

export default function ForYouMainPart() {
  return (
    <>
    <div className={styles["row"]}>
      <div className={styles["container"]}>
        <ForYouSelected />
      </div>
    </div>
    </>
  )
}
