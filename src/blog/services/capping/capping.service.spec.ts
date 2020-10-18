import { Test, TestingModule } from '@nestjs/testing';
import { CappingService } from './capping.service';

describe('CappingService', () => {
  let service: CappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CappingService],
    }).compile();

    service = module.get<CappingService>(CappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
