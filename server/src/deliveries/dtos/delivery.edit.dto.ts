import { PartialType } from '@nestjs/swagger';
import { DeliveryCreateDTO } from './delivery.create.dto';

export class DeliveryEditDTO extends PartialType(DeliveryCreateDTO) {}
