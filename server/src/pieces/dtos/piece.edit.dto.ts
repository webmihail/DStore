import { PartialType } from '@nestjs/swagger';
import { PieceCreateDTO } from './piece.create.dto';

export class PieceEditDTO extends PartialType(PieceCreateDTO) {}
