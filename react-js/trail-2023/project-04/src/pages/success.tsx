import Link from "next/link";
import { SuccessContainer, ImageContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    props: {}
  }
}