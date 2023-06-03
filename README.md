##TypeScript Kullanarak Solana için Wallet Backend'i Oluşturmak!

Blockchain teknolojisi, finansal işlemlerin güvenli ve şeffaf bir şekilde gerçekleştirilmesine olanak tanıyan önemli bir dönüşüm sağlıyor. Solana, yüksek performanslı ve ölçeklenebilir bir blockchain platformu olarak, inovasyonu destekleyen bir ekosistem sunuyor. Bu yazıda, Solana'nın güçlü altyapısından yararlanarak, TypeScript ve Nest.js kullanarak bir Wallet Backend'i oluşturmanın adımlarını keşfedeceğiz.

Solana Cookbook, Solana platformuna yönelik kapsamlı bir kaynak ve rehber koleksiyonudur. Bu yazıda, Cookbook'un sağladığı bilgilerden faydalanarak, Wallet Backend'inin nasıl oluşturulacağını adım adım göstereceğiz. Wallet Backend'i, Solana blockchaini ile etkileşime geçerek cüzdan oluşturma, bakiye sorgulama, işlem gönderme gibi temel işlevleri gerçekleştirecek bir arka uç hizmetidir.

Bu proje için TypeScript'i seçmemizin nedeni, statik tiplerin gücünü kullanarak daha güvenli ve hatasız bir geliştirme süreci sağlamaktır. Ayrıca, Nest.js kullanarak güçlü bir TypeScript tabanlı bir framework ile projemizi hızlı ve yapılandırılabilir bir şekilde geliştirebileceğiz. Nest.js, modüler bir yapı sunarak, kodun daha temiz ve bakımı kolay olmasını sağlar.

Hazırsanız, Solana Cookbook referans alınarak, TypeScript ve Nest.js ile Solana için bir Wallet Backend'i oluşturmanın heyecan verici yolculuğuna başlayalım!
## Projenin Kurulumu


Öncelikle kullanacağımız teknolojileri kurmamız gerekiyor. Bu yazıda, Node.js 14.17.0 LTS sürümünü kullanacağız. Node.js'i indirmek için, https://nodejs.org/en/download/ adresini ziyaret edebilirsiniz. Node.js'i kurduktan sonra, Nest.js'i kurmak için aşağıdaki komutu çalıştırabilirsiniz:

```
npm i -g @nestjs/cli
```
![npm i](https://imgtr.ee/images/2023/06/02/SVIS4.png)

Nest.js, TypeScript tabanlı bir framework olduğu için, TypeScript'i de kurmamız gerekiyor. TypeScript'i kurmak için aşağıdaki komutu çalıştırabilirsiniz:
```
npm i -g typescript
```
Şimdi kullanacağımız paketleri kuralım. Öncelikle, Nest.js'in sağladığı paketleri kurmak için aşağıdaki komutu çalıştırabilirsiniz:
Npm desteğini seçmeyi unutmayın çünkü yazının devamında npm paket yöneticisini kullanacağız.
```
nest new solana-wallet
```
![nest new solana-wallet](https://imgtr.ee/images/2023/06/02/SVfY0.png)

Solonayla iletişme geçmek için @solona/web3.js paketini kullanacağız. Bu paketi kurmak için aşağıdaki komutu çalıştırabilirsiniz:
```
npm i @solana/web3.js
```
Yazacağımız apileri denemek için swagger kullanacağız. Swagger'ı kurmak için aşağıdaki komutu çalıştırabilirsiniz:
```
npm install --save @nestjs/swagger
```
Swagger'ı yükledikten sonra kullanmak için main.ts dosyasında birkaç değişiklik yapmamız gerekiyor. main.ts dosyasını aşağıdaki gibi değiştirebilirsiniz:
```
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```
Bu işlemlerden sonra projemizi çalıştırabiliriz. Önce genel paketleri yüklemesini sağlayıp sonra projemizi çalıştıralım:
```
npm install
npm run start:dev
```
Bu noktada artık dosya dizininiz aşağıdaki gibi görünmelidir:
![dosya dizini görüntüsü](https://imgtr.ee/images/2023/06/02/SWnHi.png)
Projenizi çalıştırdıktan sonra, http://localhost:3000/api adresine giderek Swagger'ı kullanabilirsiniz. Swagger'ı kullanarak, projenizin API'lerini test edebilirsiniz. Aşağıdaki gibi bir ekran göreceksiniz:
![swagger ekran görüntüsü](https://imgtr.ee/images/2023/06/02/SW1RD.png)
Artık temel bir proje kurulumumuz var. Şimdi, Solana ile etkileşime geçmek için gerekli olan hesap oluşturma, bakiye sorgulama, işlem gönderme gibi işlevleri gerçekleştirecek olan Wallet Service'i oluşturmaya başlayabiliriz.
Terminaliniz proje dizinindeyse, sırasıyla aşağıdaki komutları çalıştırarak Wallet Service'i oluşturalım:
```
cd src
mkdir routes
cd routes
nest g module wallet
nest g service wallet
nest g controller wallet
```
Gözünüze batmaması ve aklınızı karıştırmaması için aşağıdaki dosyaları silebilirsiniz:
```
src/app.controller.ts
src/app.service.ts
src/app.controller.spec.ts
src/app.module.ts
src/routes/wallet/wallet.controller.spec.ts
src/routes/wallet/wallet.service.spec.ts
```
Ayrıca main.ts içindeki AppModule olan kısmı WalletModule olarak değiştirebilirsiniz.
```
async function bootstrap() {
  const app = await NestFactory.create(WalletModule);
  ...
}
```
Bu işlemlerden sonra dosya dizininiz aşağıdaki gibi görünmelidir:
![dosya dizini görüntüsü](https://imgtr.ee/images/2023/06/02/SWIBA.png)

## Solana/web3.js ve Wallet Service
Bu kısımda artık Solana ile etkileşime geçmek için gerekli olan hesap oluşturma, bakiye sorgulama, işlem gönderme gibi işlevleri gerçekleştirecek olan Wallet Service'i oluşturmaya başlayacağız.

### KeyPair Oluşturma
wallet.service.ts dosyasını gidelim ve keypair oluşturup bunu döndüren bir fonksiyon yazalım. Bu fonksiyonu yazarken, Solana'nın sağladığı @solana/web3.js paketini kullanacağız. Bu paketin sağladığı KeyPair sınıfını kullanarak keypair oluşturacağız. KeyPair sınıfı, Solana'da bir hesabı temsil eder. Bu hesabın public ve private keylerini içerir. Bu keypair'i oluşturmak için aşağıdaki fonksiyonu yazabilirsiniz:
```
import { Injectable } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';

@Injectable()
export class WalletService {
    async generateKeyPair() {
        const main_account: Keypair = await Keypair.generate();
        const public_key: string = main_account.publicKey.toBase58();
        const secret_key = main_account.secretKey.toString();
        return { publicKey: public_key, secretKey: secret_key };
    }
}
```
Şimdi bunu gidip wallet.controller.ts dosyasında kullanalım. Bunun için öncelikle wallet.service.ts dosyasını import edelim. Sonra da WalletController sınıfının constructor'ına WalletService'i inject edelim. Son olarak da generateKeyPair fonksiyonunu çağıralım. Bunun için aşağıdaki gibi bir kod yazabilirsiniz:
```
import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(private walletService : WalletService) {
        
    }
    @Get()
    async generateKeyPair() {
        return await this.walletService.generateKeyPair();
    }
}
```
Bu işlemlerden sonra http://localhost:3000/api adresine giderek Swagger üzerinden yeni apimizi test edebiliriz. Aşağıdaki gibi bir ekran göreceksiniz:
![swagger ekran görüntüsü](https://imgtr.ee/images/2023/06/02/SASc7.png)
Şimdi gidip epoint'i test edelim. Test etmek için "Try it out" butonuna tıklayıp "Execute" butonuna tıklayabilirsiniz. Aşağıdaki gibi bir ekran göreceksiniz:
![swagger ekran görüntüsü](https://imgtr.ee/images/2023/06/02/SAZ5i.png)
İsterseniz gidip SolScan ile oluşturduğunuz walletı teyit edebilirsiniz. Bunun için aşağıdaki linki kullanabilirsiniz:
```
https://solscan.io/account/<public_key>
```
### Bakiye Sorgulama
Şimdi de wallet.service.ts dosyasına gidip bakiye sorgulama fonksiyonunu yazalım. Bunun için öncelikle @solana/web3.js paketini import edelim. Sonra da aşağıdaki fonksiyonu yazabilirsiniz:
```
async showBalance(publicKey:string){
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet = new PublicKey(publicKey);
        let balance = await connection.getBalance(wallet);
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
    return {balance:`${balance} LAMPORTS`};
    }
```
Şimdi gidip wallet.controller.ts dosyasında kullanalım. Bunun için öncelikle wallet.service.ts dosyasını import edelim. Sonra da WalletController sınıfının constructor'ına WalletService'i inject edelim. Son olarak da showBalance fonksiyonunu çağıralım. Bunun için aşağıdaki gibi bir kod yazabilirsiniz:
```
 @Get('balance/:publicKey')
    async getBalance(@Query('publicKey') publicKey:string) {
        return await this.walletService.showBalance(publicKey);
    }
```
Bu işlemlerden sonra http://localhost:3000/api adresine gidip yeni apimizi test edelim. Önce daha önce yazdığım apiden publicKey yaratalım sonra yeni yazdığım showBalance apisinden bakiye sorgulaması yapalım.
![swagger ekran görüntüsü](https://imgtr.ee/images/2023/06/02/SAx9q.png)
## AirDrop isteme
Transaction fonksiyonunu yazmadan önce AirDrop isteme işlemini yapmamız gerekiyor. Bunun için aşağıdaki fonksiyonu yazabilirsiniz:
```
  async requestAirdrop(publicKey:string,solBalance:number){
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet : PublicKey = new PublicKey(publicKey);
        let signature = await connection.requestAirdrop(wallet, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        return {signature:signature};
    }
```
Şimdi gidip wallet.controller.ts dosyasında kullanalım. Bunun için öncelikle wallet.service.ts dosyasını import edelim. Sonra da WalletController sınıfının constructor'ına WalletService'i inject edelim. Son olarak da requestAirdrop fonksiyonunu çağıralım. Bunun için aşağıdaki gibi bir kod yazabilirsiniz:
```
   @Get('airdrop/:publicKey/:solBalance')
    async requestAirdrop(@Query('publicKey') publicKey:string,@Query('solBalance') solBalance:number) {
        return await this.walletService.requestAirdrop(publicKey,solBalance);
    }
```
Bu işlemlerden sonra http://localhost:3000/api adresine gidip yeni apimizi test edelim. Daha önce yazdığımız apiden publicKey yaratalım sonra yeni yazdığımız requestAirdrop apisinden airdrop isteğini gönderelim.
![swagger ekran görüntüsü](https://i.ibb.co/9GtmYY1/Screenshot-2023-06-03-at-15-28-44.png)
Şimdi gidip SolScan ile teyite edebilir ya da daha önce yazdığımız showBalance apisini kullanabilirsiniz. SolScan için aşağıdaki linki kullanabilirsiniz:
```
https://solscan.io/account/<public_key>
```

