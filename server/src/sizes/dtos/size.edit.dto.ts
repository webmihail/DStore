import { PartialType } from '@nestjs/swagger';
import { SizeCreateDTO } from './size.create.dto';

export class SizeEditDTO extends PartialType(SizeCreateDTO) {}
