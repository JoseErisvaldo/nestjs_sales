import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { NotFoundException } from '@nestjs/common';
import { UserResponseDto } from './dto/user.response.dto copy';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  const mockUsers = [
    { id: '1', name: 'John', email: 'john@test.com', password: '1234' },
    { id: '2', name: 'Jane', email: 'jane@test.com', password: '4321' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
            findCountEstablishments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it.each(mockUsers)(
      'should create user %p and return UserResponseDto',
      async (dto) => {
        jest.spyOn(repository, 'create').mockReturnValue(dto as any);
        jest.spyOn(repository, 'save').mockResolvedValue(dto as any);

        const result = await service.create(dto);

        expect(repository.create).toHaveBeenCalledWith(dto);
        expect(repository.save).toHaveBeenCalledWith(dto);
        expect(result).toBeInstanceOf(UserResponseDto);
        expect(result.name).toBe(dto.name);
      },
    );

    it('should throw error if save fails', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new Error('DB error'));
      await expect(service.create(mockUsers[0])).rejects.toThrow('DB error');
    });
  });

  describe('findAll', () => {
    it('should return array of UserResponseDto', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockUsers as any);

      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(mockUsers.length);
      result.forEach((r) => expect(r).toBeInstanceOf(UserResponseDto));
    });

    it('should throw NotFoundException if no users found', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      jest
        .spyOn(repository, 'findOneById')
        .mockResolvedValue(mockUsers[0] as any);

      const result = await service.findOne('1');
      expect(repository.findOneById).toHaveBeenCalledWith('1');
      expect(result).toBeInstanceOf(UserResponseDto);
      expect(result.name).toBe('John');
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOneById').mockResolvedValue(null);
      await expect(service.findOne('non-existing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.update('1', { name: 'Updated' } as any);
      expect(repository.update).toHaveBeenCalledWith('1', { name: 'Updated' });
      expect(result.affected).toBe(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);
      await expect(
        service.update('non-existing', { name: 'Fail' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete user successfully', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: 'User with id 1 deleted successfully',
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);
      await expect(service.remove('non-existing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findCountUsers', () => {
    it('should return correct count', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(5);
      const result = await service.findCountUsers();
      expect(repository.count).toHaveBeenCalled();
      expect(result).toBe(5);
    });
  });

  describe('findCountEstaUsers', () => {
    it('should return correct count of establishments', async () => {
      const mockResult = [{ userId: '1', totalEstablishments: 2 }];
      jest
        .spyOn(repository, 'findCountEstablishments')
        .mockResolvedValue(mockResult as any);

      const result = await service.findCountEstaUsers();
      expect(repository.findCountEstablishments).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });
});
