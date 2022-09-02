import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { SeedService } from './seed.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { User } from '../auth/entities/users.entity';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  executedSeed() {
    return this.seedService.runSeed();
  }
}
