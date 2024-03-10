import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {'ID'}</DialogTitle>

        <DialogDescription>Detalhes do Pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell className="flex justify-end">Felipe Pichl</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Telefone</TableCell>
              <TableCell className="flex justify-end">555599009999</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>E-mail</TableCell>
              <TableCell className="flex justify-end">
                felipe.pichl@example.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Realizado há</TableCell>
              <TableCell className="flex justify-end">há 3 minutos</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pizza pepperoni Família</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 50,00</TableCell>
              <TableCell className="text-right">R$ 100,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pizza mussarela Família</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 39,00</TableCell>
              <TableCell className="text-right">R$ 78,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right font-medium">R$ 109,00</TableCell>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
