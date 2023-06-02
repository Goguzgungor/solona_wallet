TypeScript Kullanarak Solana için Wallet Backend'i Oluşturmak!

Blockchain teknolojisi, finansal işlemlerin güvenli ve şeffaf bir şekilde gerçekleştirilmesine olanak tanıyan önemli bir dönüşüm sağlıyor. Solana, yüksek performanslı ve ölçeklenebilir bir blockchain platformu olarak, inovasyonu destekleyen bir ekosistem sunuyor. Bu yazıda, Solana'nın güçlü altyapısından yararlanarak, TypeScript ve Nest.js kullanarak bir Wallet Backend'i oluşturmanın adımlarını keşfedeceğiz.

Solana Cookbook, Solana platformuna yönelik kapsamlı bir kaynak ve rehber koleksiyonudur. Bu yazıda, Cookbook'un sağladığı bilgilerden faydalanarak, Wallet Backend'inin nasıl oluşturulacağını adım adım göstereceğiz. Wallet Backend'i, Solana blockchaini ile etkileşime geçerek cüzdan oluşturma, bakiye sorgulama, işlem gönderme gibi temel işlevleri gerçekleştirecek bir arka uç hizmetidir.

Bu proje için TypeScript'i seçmemizin nedeni, statik tiplerin gücünü kullanarak daha güvenli ve hatasız bir geliştirme süreci sağlamaktır. Ayrıca, Nest.js kullanarak güçlü bir TypeScript tabanlı bir framework ile projemizi hızlı ve yapılandırılabilir bir şekilde geliştirebileceğiz. Nest.js, modüler bir yapı sunarak, kodun daha temiz ve bakımı kolay olmasını sağlar.

Hazırsanız, Solana Cookbook referans alınarak, TypeScript ve Nest.js ile Solana için bir Wallet Backend'i oluşturmanın heyecan verici yolculuğuna başlayalım!


Öncelikle kullanacağımız teknolojileri kurmamız gerekiyor. Bu yazıda, Node.js 14.17.0 LTS sürümünü kullanacağız. Node.js'i indirmek için, https://nodejs.org/en/download/ adresini ziyaret edebilirsiniz. Node.js'i kurduktan sonra, Nest.js'i kurmak için aşağıdaki komutu çalıştırabilirsiniz:

```
npm i -g @nestjs/cli
```
![alt text](https://imgtr.ee/images/2023/06/02/SVIS4.png)

Nest.js, TypeScript tabanlı bir framework olduğu için, TypeScript'i de kurmamız gerekiyor. TypeScript'i kurmak için aşağıdaki komutu çalıştırabilirsiniz:
```
npm i -g typescript
```
Şimdi kullanacağımız paketleri kuralım. Öncelikle, Nest.js'in sağladığı paketleri kurmak için aşağıdaki komutu çalıştırabilirsiniz:
Npm desteğini seçmeyi unutmayın çünkü yazının devamında npm paket yöneticisini kullanacağız.
```
nest new solana-wallet
```
![alt text](https://imgtr.ee/images/2023/06/02/SVfY0.png)

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
