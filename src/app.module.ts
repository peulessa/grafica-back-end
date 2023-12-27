import { Module } from '@nestjs/common';
import { UserModule } from './modules/usuarios/user.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { VendasModule } from './modules/vendas/vendas.module';
import { ComprasModule } from './modules/compras/compras.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ClientesModule,
    FornecedoresModule,
    VendasModule,
    ComprasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
