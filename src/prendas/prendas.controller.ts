import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrendasService } from './prendas.service';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { UpdatePrendaDto } from './dto/update-prenda.dto';

@Controller('prendas')
export class PrendasController {
  constructor(private readonly prendasService: PrendasService) {}

  @Post()
  create(@Body() createPrendaDto: CreatePrendaDto) {
    return this.prendasService.create(createPrendaDto);
  }

  @Get()
  findAll(@Query('desde') desde: string) {
    return this.prendasService.findAll(desde);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prendasService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updatePrendaDto: UpdatePrendaDto) {
    return this.prendasService.update(id, updatePrendaDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.prendasService.remove(id);
  }
}
