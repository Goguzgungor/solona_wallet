import { ApiProperty } from "@nestjs/swagger";

export class TransactionDto{
    @ApiProperty({ type: String, required: true, example:"[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"})
    privateKey: string;

    //dikkat bu benim hesabımın public keyi
    @ApiProperty({ type: String, required: true, example:'99Grs8xvqrox8Zgcp2AgBVvWTBdBQp37YNgfzwLmsQ1P'})
    reciver_public_key: string;


    @ApiProperty({ type: Number, required: true, example:10000000})
    balance:number;
}