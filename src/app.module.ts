import { Module } from '@nestjs/common';
import { UserModule } from './modules/usuarios/user.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { VendasModule } from './modules/vendas/vendas.module';
import { ComprasModule } from './modules/compras/compras.module';
import * as ConfigEnv from '@nestjs/config';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    ClientesModule,
    FornecedoresModule,
    VendasModule,
    ComprasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
