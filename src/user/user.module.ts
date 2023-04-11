import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeishuController } from '@/user/feishu/feishu.controller';
import { FeishuService } from '@/user/feishu/feishu.service';

@Module({
  controllers: [FeishuController],
  providers: [FeishuService],
})
export class UserModule {}
