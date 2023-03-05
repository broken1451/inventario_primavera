import { Module } from '@nestjs/common';
import { PrendasService } from './prendas.service';
import { PrendasController } from './prendas.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Prenda, PrendaShema } from './entities/prenda.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PrendasController],
  providers: [PrendasService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Prenda.name, schema: PrendaShema, collection: 'prendas' },
    ]),
    AuthModule,
  ],
})
export class PrendasModule {}
