export declare class WalletService {
    generateKeyPair(): Promise<{
        publicKey: string;
        secretKey: string;
    }>;
    showBalance(publicKey: string): Promise<{
        balance: string;
    }>;
    requestAirdrop(publicKey: string, solBalance: number): Promise<{
        signature: string;
    }>;
}
