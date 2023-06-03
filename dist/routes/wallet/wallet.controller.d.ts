import { WalletService } from './wallet.service';
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
}
