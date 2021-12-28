import { PartialType } from '@nestjs/swagger';
import { BanCreateDTO } from './ban.create.dto';

export class BanEditDTO extends PartialType(BanCreateDTO) {}
