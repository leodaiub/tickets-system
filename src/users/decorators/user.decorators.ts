import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponse, PostResponse } from '../classes/user-responses.class';

export const SignInUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiOkResponse({
      type: PostResponse,
      description: 'Logged In',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Database error',
    }),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'BadRequest',
    }),
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Conflict',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Server error',
    }),
  );
};

export const CreateUserDecorators = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiCreatedResponse({
      type: PostResponse,
      description: 'Created',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Database error',
    }),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'BadRequest',
    }),
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Conflict',
    }),
  );
};
