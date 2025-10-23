import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    console.log('Connected To Database Successfully');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Closed Connection Successfully with Database');
  }
}
