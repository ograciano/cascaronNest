import { Logger } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDBExceptions = (service: string, error: any) => {
  const logger = new Logger(service);
  if (error.code === '23505') throw new BadRequestException(error.detail);

  logger.error(error);

  throw new InternalServerErrorException('Unexpected error, check server logs');
};
