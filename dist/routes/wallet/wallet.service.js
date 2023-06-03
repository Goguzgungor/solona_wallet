"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
let WalletService = exports.WalletService = class WalletService {
    async generateKeyPair() {
        const main_account = await web3_js_1.Keypair.generate();
        const public_key = main_account.publicKey.toBase58();
        const secret_key = main_account.secretKey.toString();
        return { publicKey: public_key, secretKey: secret_key };
    }
    async showBalance(publicKey) {
        const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet = new web3_js_1.PublicKey(publicKey);
        let balance = await connection.getBalance(wallet);
        console.log(`${balance / web3_js_1.LAMPORTS_PER_SOL} SOL`);
        return { balance: `${balance} LAMPORTS` };
    }
    async requestAirdrop(publicKey, solBalance) {
        const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet = new web3_js_1.PublicKey(publicKey);
        let signature = await connection.requestAirdrop(wallet, web3_js_1.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        return { signature: signature };
    }
};
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)()
], WalletService);
//# sourceMappingURL=wallet.service.js.map