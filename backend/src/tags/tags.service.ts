import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag } from "./tags.schema";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(
    createTagDto: CreateTagDto
  ): Promise<{ message: string; tag: Tag }> {
    try {
      const tag = new this.tagModel(createTagDto);
      await tag.save();

      return {
        message: "Tag created successfully",
        tag: tag,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          message: "Failed to create tag",
          error: (error as Error)?.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(): Promise<{ message: string; tags: Tag[] }> {
    try {
      const allTags = await this.tagModel.find();
      return {
        message: "Success",
        tags: allTags,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          message: "Failed to fetch tags",
          error: (error as Error)?.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
