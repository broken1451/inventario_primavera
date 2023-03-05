import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrendasModule } from './prendas/prendas.module';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { VentasModule } from './ventas/ventas.module';

@Module({
  imports: [
    AuthModule,
    PrendasModule,
    AccesoriosModule,
    VentasModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
