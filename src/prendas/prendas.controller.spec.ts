import { Test, TestingModule } from '@nestjs/testing';
import { PrendasController } from './prendas.controller';
import { PrendasService } from './prendas.service';

describe('PrendasController', () => {
  let controller: PrendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrendasController],
      providers: [PrendasService],
    }).compile();

    controller = module.get<PrendasController>(PrendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
