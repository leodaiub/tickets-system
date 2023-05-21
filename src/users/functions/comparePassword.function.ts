import { compare } from 'bcryptjs';
import { INVALID_PASSOWORD_MESSAGE } from '../../common/utils/constants/error.messages';
import { UnauthorizedException } from '@nestjs/common';

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<null> => {
  const passwordMatch = await compare(password, hashedPassword);
  if (!passwordMatch) {
    throw new UnauthorizedException(INVALID_PASSOWORD_MESSAGE);
  }
  return;
};
