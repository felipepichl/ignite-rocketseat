import Image from "next/image"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from "@/styles/pages/home"

import shirt1 from '@/assets/camisetas/1.png'
import shirt2 from '@/assets/camisetas/2.png'
import shirt3 from '@/assets/camisetas/3.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt=""/>
      
        <footer>
          <strong>Shirt 1</strong>
          <span>R$ 79,99</span>
        </footer>
      </Product>
      
      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt=""/>
      
        <footer>
          <strong>Shirt 2</strong>
          <span>R$ 79,99</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt=""/>
      
        <footer>
          <strong>Shirt 3</strong>
          <span>R$ 149,99</span>
        </footer>
      </Product>

      {/* <Product className="keen-sllider__slide">
        <Image src={shirt3} width={520} height={480} alt=""/>
      
        <footer>
          <strong>Shirt 3</strong>
          <span>R$ 149,99</span>
        </footer>
      </Product> */}
    </HomeContainer>
  )
}
