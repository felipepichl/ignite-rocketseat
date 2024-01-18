import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe"

import { HomeContainer, Product } from "@/styles/pages/home"

import Stripe from "stripe"

interface HomeProducts {
  products: {
    id:string,
    name:string,
    description:string,
    imageUrl:string,
    price:string,
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
        <Link 
          href={`/product/${product.id}`}
          key={product.id}
        >
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt=""/>
          
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
       ))
      }
      
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  console.log(products)

  return {
    props: { products },
    revalidate: 60 * 60 * 2,
  }
}
