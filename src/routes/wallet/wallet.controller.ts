import { Controller, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PublicKey } from '@solana/web3.js';

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
}
