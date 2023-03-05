import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, Document } from 'mongoose';

@Schema()
export class Prenda extends Document {

    @Prop({ required: [true, "El nombre es necesario y unico"], type: String })
    name: string;

    @Prop({ type: Array, default: [''] })
    types: string[];

    @Prop({ required: [true, "El precio es requerido"], type: Number })
    price: number;

    @Prop({ required: [true, "La cantidad es requerido"], type: Number })
    quantity: number;

    @Prop({ type: Date, default: Date.now })
    dateCreated: Date;
}

export const PrendaShema = SchemaFactory.createForClass(Prenda);