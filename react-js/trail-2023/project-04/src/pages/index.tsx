import { useState } from "react"
import { GetServerSideProps } from "next"
import Image from "next/image"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe"

import { HomeContainer, Product } from "@/styles/pages/home"

import shirt1 from '@/assets/camisetas/1.png'
import shirt2 from '@/assets/camisetas/2.png'
import shirt3 from '@/assets/camisetas/3.png'
import Stripe from "stripe"

interface HomeProducts {
  products: {
    id:string,
    name:string,
    description:string,
    imageUrl:string,
    price:number,
  }[]
}

export default function Home({ products } : HomeProducts) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
       products.map(product => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
       ))
      }
      
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    if (!price.unit_amount) {
      return null
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    }
  })

  console.log(products)

  return {
    props: { products },
  }
}
