import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddUserDto } from './user.dto';

@ApiTags('用户')
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }
  @ApiOperation({
    summary: '查询用户列表',
  })
  @Get()
  @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }

  @Get('getTestName')
  getTestName() {
    console.log(this.configService.get('TEST_VALUE'));
    return this.configService.get('TEST_VALUE').name;
  }
}
