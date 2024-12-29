import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'



const Slider = ({img}) => {

    const data = img.map((item)=> ({
url: `http://localhost:3000/storage/${item.image}`

    }))
  return (
    
    <div>
        <SimpleImageSlider
        width={300}
        height={300}
        images={data}
        showBullets={true}
        showNavs={true}
      />
    </div>
  )
}

export default Slider
