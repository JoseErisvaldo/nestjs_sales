import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentRepository } from './establishment.repository';
import { Establishment } from './entities/establishment.entity';
import { plainToInstance } from 'class-transformer';
import { EstablishmentResponseDto } from './dto/establishment-response.dto';

describe('EstablishmentService', () => {
  let service: EstablishmentService;
  let repository: EstablishmentRepository;

  const mockUser = {
    id: '50d5063f-8be4-44a8-a13b-fa7f6dcfdf1d',
    name: 'Naldo',
    email: 'naldo@example.com',
    password: 'hashedPassword',
    establishments: [],
    products: [],
    orders: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockEstablishment: Establishment = {
    id: 'c4f6a6d4-1f4e-4f6d-9c5d-42b9b5c9a111',
    name: 'naldoEmpresa',
    address: 'endereço Naldo',
    owner: mockUser,
    products: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentService,
        {
          provide: EstablishmentRepository,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((dto) => ({ ...mockEstablishment, ...dto })),
            save: jest.fn().mockResolvedValue(mockEstablishment),
            findAll: jest.fn().mockResolvedValue([mockEstablishment]),
            findOneById: jest.fn().mockResolvedValue(mockEstablishment),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar e retornar um establishment', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'naldoEmpresa',
        address: 'endereço Naldo',
        ownerId: '50d5063f-8be4-44a8-a13b-fa7f6dcfdf1d',
      };

      const result = await service.create(createDto);

      // Verifica se os métodos do repository foram chamados
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createDto.name,
          address: createDto.address,
        }),
      );

      ///-------------------/////-------------------
      // USE UM OU OUTRO DE ACORDO COM SUA NECESSIDADE

      //Use toBeInstanceOf se você só quer garantir que o retorno é do DTO certo.
      expect(result).toBeInstanceOf(EstablishmentResponseDto);
      // Ou use toEqual(plainToInstance(...)) se quiser garantir tipo + conteúdo, ou seja, que o service está retornando exatamente o que você espera.
      expect(result).toEqual(
        plainToInstance(
          Object.getPrototypeOf(result).constructor,
          mockEstablishment,
          { excludeExtraneousValues: true },
        ),
      );

      ///-------------------/////-------------------

      expect(result.name).toEqual(createDto.name);
      expect(result.address).toEqual(createDto.address);
      expect(result.ownerId).toEqual(createDto.ownerId);
    });

    it('deve lançar erro se save falhar', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new Error('DB error'));

      const createDto: CreateEstablishmentDto = {
        name: 'naldoEmpresa',
        address: 'endereço Naldo',
        ownerId: '50d5063f-8be4-44a8-a13b-fa7f6dcfdf1d',
      };

      await expect(service.create(createDto)).rejects.toThrow('DB error');
    });

    it('deve falhar se o dto não estiver de acordo', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'naldoEmpresa',
        address: 'endereço Naldo',
        ownerId: '50d5063f-8be4-44a8-a13b-fa7f6dcfdf1d',
      };

      const result = await service.create(createDto);

      // Monta um DTO errado (faltando `address`, por exemplo)
      const wrongMock = {
        ...mockEstablishment,
        address: undefined,
      };

      // Esse expect vai FALHAR porque o resultado real tem `address`,
      // mas o mock errado não tem
      expect(result).not.toEqual(
        plainToInstance(Object.getPrototypeOf(result).constructor, wrongMock, {
          excludeExtraneousValues: true,
        }),
      );
    });

    /* it('deve validar que o retorno bate 100% com o EstablishmentResponseDto', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'naldoEmpresa',
        address: 'endereço Naldo',
        ownerId: '50d5063f-8be4-44a8-a13b-fa7f6dcfdf1d',
      };

      const result = await service.create(createDto);

      // Converte o resultado para o DTO, descartando campos extras
      const dtoInstance = plainToInstance(EstablishmentResponseDto, result, {
        excludeExtraneousValues: true,
      });

      // Garante que é do tipo DTO
      expect(result).toBeInstanceOf(EstablishmentResponseDto);

      // Valida o conteúdo do DTO (campos obrigatórios e tipo)
      const errors = await validate(dtoInstance);
      expect(errors.length).toBe(0);

      // Opcional: verifica que não existe campo extra
      const dtoKeys = Object.keys(dtoInstance);
      const resultKeys = Object.keys(result);
      expect(resultKeys.sort()).toEqual(dtoKeys.sort());
    });*/
  });
});
