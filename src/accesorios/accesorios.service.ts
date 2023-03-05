import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Accesorio } from './entities/accesorio.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccesoriosService {

  constructor(
    @InjectModel(Accesorio.name) private readonly accesorioModel: Model<Accesorio>,
    private readonly configService: ConfigService,
  ) {}

  async create(createAccesorioDto: CreateAccesorioDto) {

    const accesorio: CreateAccesorioDto = {
      name: createAccesorioDto.name.trimStart(),
      price: createAccesorioDto.price,
      quantity: createAccesorioDto.quantity,
      types: createAccesorioDto.types
    }

   const accesorioCreated = await this.accesorioModel.create(accesorio);
   return accesorioCreated;
  }

  async findAll(desde: string = '0') {
    const accesorios = await this.accesorioModel.find({}).skip(Number(desde)).limit(5).sort({ created: 1 });
    const countsAccesorios = await this.accesorioModel.countDocuments({});
    return {
      accesorios,
      countsAccesorios
    };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`${id} no es a valid mongo id`);
    }
    const accesorio = await this.accesorioModel.findById(id);
    if (!accesorio) {
      throw new BadRequestException(`El accesorio con el id ${id} no existe`);
    }
    return accesorio;
  }

  async  update(id: string, updateAccesorioDto: UpdateAccesorioDto) {
    const accesorioUpdate = await this.accesorioModel.findByIdAndUpdate(id, updateAccesorioDto, {
      new: true,
    });
    if (!accesorioUpdate) {
      throw new BadRequestException(`El accesorio con el id ${id} no existe`);
    }
    return accesorioUpdate;
  }

  async remove(id: string) {
    const accesorioDeleted = await this.accesorioModel.findByIdAndRemove(id);
    if (!accesorioDeleted) {
      throw new BadRequestException(`El accesorio con el id ${id} no existe`);
    }
    return accesorioDeleted;
  }
}
