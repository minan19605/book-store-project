"use client"

import React, {useState, useEffect} from "react";

interface StatisticsHeaderProps {
    headings: string[];
    containerClassName?: string;
}

const StatisticsHeader:React.FC<StatisticsHeaderProps> = ({headings, containerClassName}) => {
    const activeColor = '#2bd97c';
    const defaultColor = '#6b757b';
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((preIdx) => (preIdx + 1) % headings.length)
        }, 2000);

        return () => clearInterval(intervalId)
    },[headings])

    return (
        <div className={`statistics__content--header ${containerClassName || ''}`}>
            {headings.map((text:string, index:number) =>{
                return (
                    <div key={index} 
                    className="statistics__heading"
                    style={{
                        color: index === activeIndex ? activeColor: defaultColor,
                        transition: 'color 0.5s ease-in-out',
                    }}>
                        {text}
                    </div>
                )
            })}
        </div>
    )
}

export default StatisticsHeader;