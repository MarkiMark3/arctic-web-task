import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { GetSnippetsQueryDto } from './dto/get-snippets-query.dto';
import { NotFoundException } from '@nestjs/common';

type SnippetFilter = {
  $text?: { $search: string };
  tags?: string;
};

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: CreateSnippetDto): Promise<Snippet> {
    return this.snippetModel.create(dto);
  }

  async findAll(query: GetSnippetsQueryDto): Promise<Snippet[]> {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const { q, tag } = query;

    const filter: SnippetFilter = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (tag) {
      filter.tags = tag;
    }

    return this.snippetModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }
  async update(id: string, dto: UpdateSnippetDto) {
    return this.snippetModel.findByIdAndUpdate(
      id,
      { $set: dto },
      {
        returnDocument: 'after',
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.snippetModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Snippet not found');
    }

    return { message: 'Deleted successfully' };
  }
}
