import { WalletService } from './wallet.service';
import { TransactionDto } from './wallet.dto';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    generateKeyPair(): Promise<{
        publicKey: string;
        secretKey: string;
    }>;
    getBalance(publicKey: string): Promise<{
        balance: string;
    }>;
    requestAirdrop(publicKey: string, solBalance: number): Promise<{
        signature: string;
    }>;
    transaction(item: TransactionDto): Promise<string>;
}
