import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn({ email }: SignInForm) {
    console.log(email)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Enviamos um link de autenticação para o seu email', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn({ email }),
      },
    })
  }

  return (
    <>
      <Helmet title="SignIn" />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-4 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="w[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do prceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full">
              Acessa painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
