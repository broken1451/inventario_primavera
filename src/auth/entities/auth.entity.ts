import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from '../interfaces/user.interface';

@Schema()
export class Auth extends Document {
    // roles ADM y USER

    @Prop({ required: [true, "El nombre es necesario y unico"], type: String })
    name: string

    @Prop({ required: [true, "El correo es necesario y unico"], type: String })
    email: string

    @Prop({ type: String, default: '' })
    img: string

    @Prop({ required: [true, "El password es necesario"], type: String })
    password: string

    @Prop({ type: Array, default: [ValidRoles.user] })
    roles: string[];

    @Prop({ type: Date, default: Date.now })
    created: Date

    @Prop({ type: Boolean, default: true })
    isActive: boolean;
    
}

export const AuthUsers = SchemaFactory.createForClass(Auth);