import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { UpdatePrendaDto } from './dto/update-prenda.dto';
import { Prenda } from './entities/prenda.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PrendasService {
  constructor(
    @InjectModel(Prenda.name) private readonly prendaModel: Model<Prenda>,
    private readonly configService: ConfigService,
  ) {}

  async create(createPrendaDto: CreatePrendaDto) {
    
    const prenda: CreatePrendaDto = {
      name: createPrendaDto.name.trimStart(),
      price: createPrendaDto.price,
      quantity: createPrendaDto.quantity,
      types: createPrendaDto.types
    }

   const prendaCreated = await this.prendaModel.create(prenda);
   return prendaCreated;
  }

  async findAll(desde: string = '0') {
    const prendas = await this.prendaModel.find({}).skip(Number(desde)).limit(5).sort({ created: 1 });
    const countsPrendas = await this.prendaModel.countDocuments({});
    return {
      prendas,
      countsPrendas
    };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`${id} no es a valid mongo id`);
    }
    const prenda = await this.prendaModel.findById(id);
    if (!prenda) {
      throw new BadRequestException(`La prenda con el id ${id} no existe`);
    }
    return prenda;
  }

  async  update(id: string, updatePrendaDto: UpdatePrendaDto) {
    const prendaUpdate = await this.prendaModel.findByIdAndUpdate(id, updatePrendaDto, {
      new: true,
    });
    if (!prendaUpdate) {
      throw new BadRequestException(`El producto con el id ${id} no existe`);
    }
    return prendaUpdate;
  }

  async remove(id: string) {
    const prendaDeleted = await this.prendaModel.findByIdAndRemove(id);
    if (!prendaDeleted) {
      throw new BadRequestException(`La prenda con el id ${id} no existe`);
    }
    return prendaDeleted;
  }
}
