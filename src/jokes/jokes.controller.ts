import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Joke } from './entities/joke.entity';

@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new joke' })
  @ApiResponse({
    status: 201,
    description: 'Joke created successfully',
    type: Joke,
  })
  create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

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
