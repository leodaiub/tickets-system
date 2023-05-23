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
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RequestWithUser } from 'src/users/classes/request-with-user.class';

@UseGuards(AuthGuard)
@ApiBearerAuth('token')
@Controller('tickets')
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

  @ApiParam({
    name: 'userId',
    type: String,
    required: false,
    allowEmptyValue: true,
  })
  @Get('/redemptions/user/:userId')
  getRedemptionsHistory(
    @Req() req: RequestWithUser,
    @Param('userId') userId?: string,
  ) {
    const userIdToUse = userId === '{userId}' ? req.user : userId;
    return this.ticketsService.getRedemptionsHistory(userIdToUse);
  }
}
