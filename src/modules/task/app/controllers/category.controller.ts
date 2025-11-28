import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetAllCategoriesResponse } from './responses/categories/get-all-categories.response.dto';
import { CreateCategoryDto } from '../dtos/categories/create-category.dto';
import { CreateNewCategoryResponse } from './responses/categories/create-new-category.response.dto';
import { buildFailedResponse } from 'src/common/tools/swagger';
import { CategoryIsAlreadyExsists } from '../exceptions/categories/category-is-already-exsists.exception';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ type: GetAllCategoriesResponse })
  @Get()
  public async getAllCategories(@Req() req: Request): Promise<SuccessResponse> {
    const categories = await this.categoryService.getAllCategories(req.userId);

    return {
      statusCode: 200,
      data: categories,
    };
  }

  @ApiCreatedResponse({ type: CreateNewCategoryResponse })
  @ApiConflictResponse({
    example: buildFailedResponse(new CategoryIsAlreadyExsists()),
  })
  @Post('new')
  public async createNewCategory(
    @Req() req: Request,
    @Body() dto: CreateCategoryDto,
  ): Promise<SuccessResponse> {
    const newCategory = await this.categoryService.createNewCategory(
      req.userId,
      dto,
    );

    return {
      statusCode: 201,
      data: newCategory,
    };
  }
}
