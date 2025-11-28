import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetAllCategoriesResponse } from './responses/categories/get-all-categories.response.dto';
import { CreateCategoryDto } from '../dtos/categories/create-category.dto';
import { CreateNewCategoryResponse } from './responses/categories/create-new-category.response.dto';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { CategoryIsAlreadyExsists } from '../exceptions/categories/category-is-already-exsists.exception';
import { UpdateCategoryDto } from '../dtos/categories/update-category.dto';
import { UpdateCategoryResponse } from './responses/categories/update-category.response.dto';
import { CategoryNotFoundError } from '../exceptions/tasks/category-not-found.exception';
import { GetCategoryResponse } from './responses/categories/get-category.response.dto';

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

  @ApiOkResponse({ type: UpdateCategoryResponse })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new CategoryNotFoundError()),
  })
  @Put(':id')
  public async updateCategory(
    @Req() req: Request,
    @Body() dto: UpdateCategoryDto,
  ): Promise<SuccessResponse> {
    const updatedCategory = await this.categoryService.updateCategory(
      {
        id: req.params.id,
        userId: req.userId,
      },
      dto,
    );

    return {
      statusCode: 200,
      data: updatedCategory,
    };
  }

  @ApiOkResponse({ example: buildSuccessResponse({}) })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new CategoryNotFoundError()),
  })
  @Delete(':id')
  public async deleteCategory(@Req() req: Request): Promise<SuccessResponse> {
    await this.categoryService.deleteCategory(req.userId, req.params.id);

    return {
      statusCode: 200,
    };
  }

  @ApiOkResponse({ type: GetCategoryResponse })
  @Get(':id')
  public async getCategory(@Req() req: Request): Promise<SuccessResponse> {
    const category = await this.categoryService.getCategory(req.params.id);

    return {
      statusCode: 200,
      data: category,
    };
  }
}
