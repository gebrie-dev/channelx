export type Platform = "YouTube" | "TikTok" | "Instagram" | "Twitter" | "Twitch" | "Telegram";

export type UserRole = "buyer" | "seller" | "both";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string; // ISO date
}

export interface TimePoint {
  t: string; // ISO date
  v: number;
}

export interface ChannelMetricSeries {
  subscribers: TimePoint[];
  views: TimePoint[];
  revenue: TimePoint[];
}

export interface Channel {
  id: string;
  platform: Platform;
  handle: string;
  name: string;
  description?: string;
  niche?: string;
  language?: string;
  country?: string;
  createdAt: string; // ISO date
  ageMonths: number;
  subscribers: number;
  avgViews: number;
  monthlyRevenue: number;
  askingPrice: number;
  growthRate: number; // percent
  verification?: boolean;
  tags?: string[];
  media?: { banner?: string; avatar?: string };
  metrics?: ChannelMetricSeries;
  sellerId: string;
}

export type OfferStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export interface Offer {
  id: string;
  channelId: string;
  buyerId: string;
  amount: number;
  message?: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
}

export type PurchaseStatus =
  | "initiated"
  | "escrow"
  | "transferred"
  | "completed"
  | "refunded"
  | "failed";

export interface Purchase {
  id: string;
  channelId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: PurchaseStatus;
  receiptId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  channelId: string;
  subscribers: TimePoint[];
  views: TimePoint[];
  revenue: TimePoint[];
  audienceGeo: { country: string; pct: number }[];
  audienceAge: { range: string; pct: number }[];
  deviceSplit: { device: string; pct: number }[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
}

export interface ChannelQuery {
  search?: string;
  platform?: Platform | "all";
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-low" | "price-high" | "followers" | "revenue" | "growth";
  page?: number;
  limit?: number;
}

export interface AuthUser {
  user: User;
  token: string;
}
