import {
  Controller,
  Header,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Response as Res } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Header('Cache-Control', 'none')
  @Post('auth/login')
  async login(@Request() req, @Response() res: Res) {
    const { token, user } = await this.authService.login(req.user);

    return res
      .cookie('token', token, { sameSite: 'none', secure: true })
      .json({ user, token });
  }
}
