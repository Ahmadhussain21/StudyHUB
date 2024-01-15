import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const timeLine=[
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success of the company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success of the company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success of the company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success of the company"
    }
];

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%] flex flex-col gap-5'>
            {
                timeLine.map((element,index)=>{
                    return (
                        <div className='flex flex-row gap-6' key={index}>
                        
                        </div>
                            
                    )
                })
            }

            </div>
        </div>

    </div>
    
  )
}

export default TimelineSection