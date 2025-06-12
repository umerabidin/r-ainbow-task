import { Body, Controller, Get, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }
}
