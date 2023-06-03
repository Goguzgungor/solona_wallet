import { Injectable } from '@nestjs/common';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { TransactionDto } from './wallet.dto';

@Injectable()
export class WalletService {
    async generateKeyPair() {
        const main_account: Keypair = await Keypair.generate();
        const public_key: string = main_account.publicKey.toBase58();
        const secret_key = main_account.secretKey.toString();
        return { publicKey: public_key, secretKey: secret_key };
    }

    async showBalance(publicKey: string) {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet = new PublicKey(publicKey);
        let balance = await connection.getBalance(wallet);
        console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
        return { balance: `${balance} LAMPORTS` };
    }

    async requestAirdrop(publicKey: string, solBalance: number) {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet: PublicKey = new PublicKey(publicKey);
        let signature = await connection.requestAirdrop(wallet, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        return { signature: signature };
    }
    async transaction(item: TransactionDto) {
        {

            const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

            const keyPair: Keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(item.privateKey)));
            const transferTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keyPair.publicKey,
                    toPubkey: new PublicKey(item.reciver_public_key),
                    lamports: item.balance,
                })
            );
            const signature: string = await sendAndConfirmTransaction(connection, transferTransaction, [
                keyPair
            ])
            return signature;
        }
    }
}
