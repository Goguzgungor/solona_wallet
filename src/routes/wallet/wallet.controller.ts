import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PublicKey } from '@solana/web3.js';
import { TransactionDto } from './wallet.dto';

@Controller('wallet')
export class WalletController {
    constructor(private walletService : WalletService) {
        
    }
    @Get()
    async generateKeyPair() {
        return await this.walletService.generateKeyPair();
    }
    @Get('balance/:publicKey')
    async getBalance(@Query('publicKey') publicKey:string) {
        return await this.walletService.showBalance(publicKey);
    }
    @Get('airdrop/:publicKey/:solBalance')
    async requestAirdrop(@Query('publicKey') publicKey:string,@Query('solBalance') solBalance:number) {
        return await this.walletService.requestAirdrop(publicKey,solBalance);
    }
    @Post('transaction')

    async transaction(@Body()item:TransactionDto){
        return await this.walletService.transaction(item);
    }
}