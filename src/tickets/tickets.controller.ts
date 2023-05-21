import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from 'src/users/classes/authGuard.class';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from 'src/users/classes/request-with-user.class';

@Controller('tickets')
@UseGuards(AuthGuard)
@ApiBearerAuth('token')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Patch('redeem/:ticketCode')
  redeem(
    @Req() { user: userId }: RequestWithUser,
    @Param('ticketCode') ticketCode: string,
  ) {
    return this.ticketsService.redeem({
      code: ticketCode,
      userId: userId,
    });
  }

  @Get('/redemptions/user/:userId')
  getRedemptionsHistory(
    @Req() req: RequestWithUser,
    @Param('userId') userId?: string | undefined,
  ) {
    return this.ticketsService.getRedemptionsHistory(userId || req.user);
  }
}
