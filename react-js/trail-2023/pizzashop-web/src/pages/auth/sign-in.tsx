import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  return (
    <>
      <Helmet title="Sign" />
      <div className="p-8">
        <div className="w[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do prceiro!
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu Email</Label>
              <Input id="email" type="email" />
            </div>

            <Button className="w-full">Acessa painel</Button>
          </form>
        </div>
      </div>
    </>
  )
}
