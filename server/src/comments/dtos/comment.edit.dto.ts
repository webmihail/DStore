import { PartialType } from '@nestjs/swagger';
import { CommentCreateDTO } from './comment.create.dto';

export class CommentEditDTO extends PartialType(CommentCreateDTO) {}
