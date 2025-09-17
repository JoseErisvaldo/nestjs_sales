import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user.response.dto copy';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: '1',
    name: 'John',
    email: 'john@test.com',
    password: '1234',
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findCountUsers: jest.fn(),
            findCountEstaUsers: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create with correct dto', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockUser as UserResponseDto);

      const dto = { name: 'John', email: 'john@test.com', password: '1234' };
      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll and return array', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([mockUser] as UserResponseDto[]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findCountUsers', () => {
    it('should call usersService.findCountUsers and return number', async () => {
      jest.spyOn(service, 'findCountUsers').mockResolvedValue(5);

      const result = await controller.findCountUsers();

      expect(service.findCountUsers).toHaveBeenCalled();
      expect(result).toBe(5);
    });
  });

  describe('findCountEstaUsers', () => {
    it('should call usersService.findCountEstaUsers and return array', async () => {
      const mockResult = [{ userId: '1', totalEstablishments: 2 }];
      jest.spyOn(service, 'findCountEstaUsers').mockResolvedValue(mockResult);

      const result = await controller.findCountEstaUsers();

      expect(service.findCountEstaUsers).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with correct id', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockUser as UserResponseDto);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should call usersService.update with correct id and dto', async () => {
      const updateDto = { name: 'Jane' };
      jest.spyOn(service, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with correct id', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ message: 'User with id 1 deleted successfully' });

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: 'User with id 1 deleted successfully',
      });
    });
  });
});
