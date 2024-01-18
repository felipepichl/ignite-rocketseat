import { useRouter } from 'next/router'
import { 
  ImageContainer, 
  ProductContainer, 
  ProductDetails 
} from '@/styles/pages/products'

export default function Product() {
  const { query } = useRouter()
  
  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste obcaecati quo rem similique fugiat aliquid repudiandae, minus id magni provident quas natus nam, minima, ab nisi rerum repellendus! Illo, qui!</p>


        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}