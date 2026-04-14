import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { GetSnippetsQueryDto } from './dto/get-snippets-query.dto';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly service: SnippetsService) {}

  @Post()
  create(@Body() dto: CreateSnippetDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: GetSnippetsQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSnippetDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
