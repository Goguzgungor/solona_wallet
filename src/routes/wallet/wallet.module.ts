import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
