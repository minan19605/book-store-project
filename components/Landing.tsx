import React from 'react'
import Image from "next/image";

interface LandingProps {
  onOpen: () => void;
}

const Landing: React.FC<LandingProps> = ({onOpen}) => {
  return (
    <>
        <section id="landing">
          <div className="container">
            <div className="row">
              <div className="landing__wrapper">
                <div className="landing__content">
                  <div className="landing__content__title">
                    Gain more knowledge <br className="remove--tablet" />
                    in less time
                  </div>
                  <div className="landing__content__subtitle">
                    Great summaries for busy people,
                    <br className="remove--tablet" />
                    individuals who barely have time to read,
                    <br className="remove--tablet" />
                    and even people who don’t like to read.
                  </div>
                  <button className="btn home__cta--btn" onClick={onOpen}>Login</button>
                </div>
                <figure className="landing__image--mask">
                  <Image src="/assets/landing.png" width={400} height={380} alt="landing" />
                </figure>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Landing;