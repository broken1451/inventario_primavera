import { Module } from '@nestjs/common';
import { AccesoriosService } from './accesorios.service';
import { AccesoriosController } from './accesorios.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Accesorio, AccesorioShema } from './entities/accesorio.entity';

@Module({
  controllers: [AccesoriosController],
  providers: [AccesoriosService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Accesorio.name,
        schema: AccesorioShema,
        collection: 'accesorios',
      },
    ]),
    AuthModule,
  ],
})
export class AccesoriosModule {}
