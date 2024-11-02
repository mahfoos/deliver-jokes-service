import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JokesService } from './jokes.service';
import { Joke } from '../entities/joke.entity';

@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('random')
  @ApiOperation({ summary: 'Get a random joke' })
  @ApiResponse({
    status: 200,
    description: 'Returns a random joke',
    type: Joke,
  })
  getRandomJoke(@Query('type') type?: string) {
    return this.jokesService.getRandomJoke(type);
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all joke types' })
  @ApiResponse({
    status: 200,
    description: 'Returns all joke types',
    type: [String],
  })
  getJokeTypes() {
    return this.jokesService.getJokeTypes();
  }
}
