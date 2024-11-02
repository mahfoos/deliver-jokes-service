import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { Joke } from '../entities/joke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
