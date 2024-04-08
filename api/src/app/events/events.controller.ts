import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

import { EventInputDto, EventUpdateDto } from '~/schema/events.schema';

import { EventService } from './events.service';

@Controller('events')
export class EventController {
  public constructor(private readonly eventService: EventService) {}

  @Get()
  public getList() {
    return this.eventService.getList();
  }

  @Get('/:id')
  public getFullEvent(@Param('id') id: string) {
    return this.eventService.getFullEvent(id);
  }

  @Post()
  public create(@Body() eventInput: EventInputDto) {
    return this.eventService.create(eventInput);
  }

  @Put('/:id')
  public update(@Param('id') id: string, @Body() eventUpdate: EventUpdateDto) {
    return this.eventService.update(id, eventUpdate);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    await this.eventService.delete(id);
  }
}
