import { Schema, model, type Document } from 'mongoose'

export type UserRole = 'buyer' | 'seller' | 'admin'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  role: UserRole
  avatarUrl?: string
  refreshTokenHash?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['buyer','seller','admin'], default: 'buyer', index: true },
  avatarUrl: { type: String },
  refreshTokenHash: { type: String },
}, { timestamps: true })

export const User = model<IUser>('User', UserSchema)
