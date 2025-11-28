import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetAllCategoriesResponse } from './responses/categories/get-all-categories.response.dto';

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
}
