"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const wallet_dto_1 = require("./wallet.dto");
let WalletController = exports.WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async generateKeyPair() {
        return await this.walletService.generateKeyPair();
    }
    async getBalance(publicKey) {
        return await this.walletService.showBalance(publicKey);
    }
    async requestAirdrop(publicKey, solBalance) {
        return await this.walletService.requestAirdrop(publicKey, solBalance);
    }
    async transaction(item) {
        return await this.walletService.transaction(item);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "generateKeyPair", null);
__decorate([
    (0, common_1.Get)('balance/:publicKey'),
    __param(0, (0, common_1.Query)('publicKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('airdrop/:publicKey/:solBalance'),
    __param(0, (0, common_1.Query)('publicKey')),
    __param(1, (0, common_1.Query)('solBalance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "requestAirdrop", null);
__decorate([
    (0, common_1.Post)('transaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_dto_1.TransactionDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transaction", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map