import { Schema, model, type Document, Types } from 'mongoose'

export type Platform = 'YouTube' | 'TikTok' | 'Instagram' | 'Twitter' | 'Twitch' | 'Telegram'

export interface IChannel extends Document {
  name: string
  platform: Platform
  handle: string
  subscribers: number
  askingPrice: number
  niche?: string
  verification?: boolean
  media?: { avatar?: string; banner?: string }
  growthRate?: number
  sellerId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ChannelSchema = new Schema<IChannel>({
  name: { type: String, required: true, index: true },
  platform: { type: String, enum: ['YouTube','TikTok','Instagram','Twitter','Twitch','Telegram'], required: true, index: true },
  handle: { type: String, required: true, index: true },
  subscribers: { type: Number, required: true, min: 0, index: true },
  askingPrice: { type: Number, required: true, min: 0, index: true },
  niche: { type: String },
  verification: { type: Boolean, default: false, index: true },
  media: { avatar: String, banner: String },
  growthRate: { type: Number },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
}, { timestamps: true })

ChannelSchema.index({ name: 'text', handle: 'text', niche: 'text' })

export const Channel = model<IChannel>('Channel', ChannelSchema)
