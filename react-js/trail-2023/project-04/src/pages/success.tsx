import Link from "next/link";
import { SuccessContainer, ImageContainer } from "@/styles/pages/success";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>Uhuul <strong>Felipe Pichl</strong>, sua <strong>Camiseta</strong> já está a caminho de sua casa</p>
    
      <Link href='/'>
        Voltar ao catálago
      </Link>
    
    </SuccessContainer>
  )
}