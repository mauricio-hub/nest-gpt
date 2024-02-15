import { PartialType } from '@nestjs/mapped-types';
import { CreateSamAssistantDto } from './create-sam-assistant.dto';

export class UpdateSamAssistantDto extends PartialType(CreateSamAssistantDto) {}
