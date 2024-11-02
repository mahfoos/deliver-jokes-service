import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../entities/joke.entity';
import { CreateJokeDto } from '../dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>,
  ) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const joke = this.jokesRepository.create(createJokeDto);
    return await this.jokesRepository.save(joke);
  }

  async findAll(): Promise<Joke[]> {
    return await this.jokesRepository.find({ where: { isActive: true } });
  }

  async findByType(type: string): Promise<Joke[]> {
    return await this.jokesRepository.find({
      where: { type, isActive: true },
    });
  }

  async getRandomJoke(type?: string): Promise<Joke> {
    const query = this.jokesRepository
      .createQueryBuilder('joke')
      .where('joke.isActive = :isActive', { isActive: true });

    if (type) {
      query.andWhere('joke.type = :type', { type });
    }

    const jokes = await query.getMany();
    if (jokes.length === 0) {
      throw new NotFoundException(
        type ? `No jokes found for type ${type}` : 'No jokes found',
      );
    }

    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  async getJokeTypes(): Promise<string[]> {
    const types = await this.jokesRepository
      .createQueryBuilder('joke')
      .select('DISTINCT joke.type', 'type')
      .where('joke.isActive = :isActive', { isActive: true })
      .getRawMany();

    return types.map((t) => t.type);
  }
}
