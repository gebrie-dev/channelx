import { readFileSync } from "fs";
import path from "path";
import {
  Analytics,
  AuthUser,
  Channel,
  ChannelQuery,
  Offer,
  Paginated,
  Purchase,
  User,
  UserRole,
} from "./types";

// Config
const MIN_DELAY = 300;
const MAX_DELAY = 800;
let ERROR_RATE = 0.05; // 5%

// In-memory stores
let seeded = false;
const db = {
  users: new Map<string, User>(),
  channels: new Map<string, Channel>(),
  offers: new Map<string, Offer>(),
  purchases: new Map<string, Purchase>(),
  analytics: new Map<string, Analytics>(),
  authUsers: new Map<string, { id: string; email: string; password: string }>(),
};

// token -> userId
const sessions = new Map<string, string>();

function seed() {
  if (seeded) return;
  const base = path.join(process.cwd(), "lib", "mockApi", "json");
  const readJson = (name: string) => JSON.parse(readFileSync(path.join(base, name), "utf-8"));

  const users: User[] = readJson("users.json");
  users.forEach((u) => db.users.set(u.id, u));

  const channels: Channel[] = readJson("channels.json");
  channels.forEach((c) => db.channels.set(c.id, c));

  const offers: Offer[] = readJson("offers.json");
  offers.forEach((o) => db.offers.set(o.id, o));

  const purchases: Purchase[] = readJson("purchases.json");
  purchases.forEach((p) => db.purchases.set(p.id, p));

  const analytics: Analytics[] = readJson("analytics.json");
  analytics.forEach((a) => db.analytics.set(a.channelId, a));

  const auth: { users: { id: string; email: string; password: string }[] } = readJson("auth.json");
  auth.users.forEach((au) => db.authUsers.set(au.email, au));

  seeded = true;
}

function delay() {
  const ms = MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY));
  return new Promise((res) => setTimeout(res, ms));
}

function maybeFail() {
  if (Math.random() < ERROR_RATE) {
    const error = new Error("Mock API random failure");
    // Attach shape similar to problem+json
    (error as any).status = 500;
    (error as any).title = "Internal Error";
    (error as any).detail = "A simulated error occurred. Please retry.";
    throw error;
  }
}

function genId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// Utility: filter/sort/paginate channels
function filterSortPaginateChannels(list: Channel[], q: ChannelQuery): Paginated<Channel> {
  let items = [...list];

  if (q.search) {
    const s = q.search.toLowerCase();
    items = items.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.handle.toLowerCase().includes(s) ||
        c.description?.toLowerCase().includes(s)
    );
  }

  if (q.platform && q.platform !== "all") {
    items = items.filter((c) => c.platform === q.platform);
  }

  if (typeof q.minPrice === "number") items = items.filter((c) => c.askingPrice >= q.minPrice!);
  if (typeof q.maxPrice === "number") items = items.filter((c) => c.askingPrice <= q.maxPrice!);

  switch (q.sort) {
    case "price-low":
      items.sort((a, b) => a.askingPrice - b.askingPrice);
      break;
    case "price-high":
      items.sort((a, b) => b.askingPrice - a.askingPrice);
      break;
    case "followers":
      items.sort((a, b) => b.subscribers - a.subscribers);
      break;
    case "revenue":
      items.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
      break;
    case "growth":
      items.sort((a, b) => b.growthRate - a.growthRate);
      break;
    case "newest":
    default:
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const page = Math.max(1, q.page || 1);
  const limit = Math.max(1, q.limit || 12);
  const start = (page - 1) * limit;
  const paged = items.slice(start, start + limit);
  return { items: paged, total: items.length };
}

// Public API
export async function setErrorRate(rate: number) {
  ERROR_RATE = Math.max(0, Math.min(1, rate));
}

// Auth
export async function login(params: { email: string; password: string }): Promise<AuthUser> {
  seed();
  await delay();
  maybeFail();
  const auth = db.authUsers.get(params.email);
  if (!auth || auth.password !== params.password) {
    const error = new Error("Invalid credentials");
    (error as any).status = 401;
    throw error;
  }
  const user = db.users.get(auth.id);
  if (!user) {
    const error = new Error("User not found");
    (error as any).status = 404;
    throw error;
  }
  const token = genId("tok");
  sessions.set(token, user.id);
  return { user, token };
}

export async function register(params: { name: string; email: string; password: string; role: UserRole }): Promise<AuthUser> {
  seed();
  await delay();
  maybeFail();
  if (db.authUsers.has(params.email)) {
    const error = new Error("Email already registered");
    (error as any).status = 409;
    throw error;
  }
  const id = genId("u");
  const now = new Date().toISOString();
  const user: User = { id, name: params.name, email: params.email, role: params.role, createdAt: now };
  db.users.set(id, user);
  db.authUsers.set(params.email, { id, email: params.email, password: params.password });
  const token = genId("tok");
  sessions.set(token, id);
  return { user, token };
}

export async function logout(token?: string): Promise<{ ok: true }> {
  seed();
  await delay();
  maybeFail();
  if (token) sessions.delete(token);
  return { ok: true };
}

export async function getSession(token?: string): Promise<{ user: User | null }> {
  seed();
  await delay();
  maybeFail();
  if (!token) return { user: null };
  const uid = sessions.get(token);
  if (!uid) return { user: null };
  const user = db.users.get(uid) || null;
  return { user };
}

// Users
export async function getMe(token?: string): Promise<{ user: User }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const uid = sessions.get(token);
  if (!uid) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const user = db.users.get(uid);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return { user };
}

export async function getUserById(id: string): Promise<{ user: User }> {
  seed();
  await delay();
  maybeFail();
  const user = db.users.get(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return { user };
}

// Channels
export async function listChannels(query: ChannelQuery = {}): Promise<Paginated<Channel>> {
  seed();
  await delay();
  maybeFail();
  const items = Array.from(db.channels.values());
  return filterSortPaginateChannels(items, query);
}

export async function getChannel(id: string): Promise<{ channel: Channel }> {
  seed();
  await delay();
  maybeFail();
  const channel = db.channels.get(id);
  if (!channel) throw Object.assign(new Error("Channel not found"), { status: 404 });
  return { channel };
}

export async function createChannel(token: string | undefined, data: Omit<Channel, "id" | "createdAt" | "sellerId"> & { sellerId?: string }): Promise<{ channel: Channel }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const sellerId = sessions.get(token) || data.sellerId;
  if (!sellerId) throw Object.assign(new Error("Seller required"), { status: 400 });
  const id = genId("c");
  const now = new Date().toISOString();
  const channel: Channel = { id, createdAt: now, sellerId, ...data } as Channel;
  db.channels.set(id, channel);
  return { channel };
}

export async function updateChannel(token: string | undefined, id: string, data: Partial<Channel>): Promise<{ channel: Channel }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const existing = db.channels.get(id);
  if (!existing) throw Object.assign(new Error("Channel not found"), { status: 404 });
  const uid = sessions.get(token);
  if (!uid || existing.sellerId !== uid) throw Object.assign(new Error("Forbidden"), { status: 403 });
  const channel = { ...existing, ...data } as Channel;
  db.channels.set(id, channel);
  return { channel };
}

export async function deleteChannel(token: string | undefined, id: string): Promise<{ ok: true }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const existing = db.channels.get(id);
  if (!existing) throw Object.assign(new Error("Channel not found"), { status: 404 });
  const uid = sessions.get(token);
  if (!uid || existing.sellerId !== uid) throw Object.assign(new Error("Forbidden"), { status: 403 });
  db.channels.delete(id);
  // also cleanup offers and purchases for this channel in mock
  Array.from(db.offers.values()).forEach((o) => o.channelId === id && db.offers.delete(o.id));
  Array.from(db.purchases.values()).forEach((p) => p.channelId === id && db.purchases.delete(p.id));
  db.analytics.delete(id);
  return { ok: true };
}

// Offers
export async function listOffers(channelId: string): Promise<{ items: Offer[] }> {
  seed();
  await delay();
  maybeFail();
  const items = Array.from(db.offers.values()).filter((o) => o.channelId === channelId);
  return { items };
}

export async function createOffer(token: string | undefined, channelId: string, data: { amount: number; message?: string }): Promise<{ offer: Offer }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const buyerId = sessions.get(token);
  if (!buyerId) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  if (!db.channels.get(channelId)) throw Object.assign(new Error("Channel not found"), { status: 404 });
  const id = genId("o");
  const now = new Date().toISOString();
  const offer: Offer = { id, channelId, buyerId, amount: data.amount, message: data.message, status: "pending", createdAt: now, updatedAt: now };
  db.offers.set(id, offer);
  return { offer };
}

export async function updateOffer(token: string | undefined, id: string, data: Partial<Pick<Offer, "status" | "amount" | "message">>): Promise<{ offer: Offer }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const offer = db.offers.get(id);
  if (!offer) throw Object.assign(new Error("Offer not found"), { status: 404 });
  const uid = sessions.get(token);
  if (!uid || (uid !== offer.buyerId && uid !== db.channels.get(offer.channelId)?.sellerId)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  const updated: Offer = { ...offer, ...data, updatedAt: new Date().toISOString() } as Offer;
  db.offers.set(id, updated);
  return { offer: updated };
}

export async function deleteOffer(token: string | undefined, id: string): Promise<{ ok: true }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const offer = db.offers.get(id);
  if (!offer) throw Object.assign(new Error("Offer not found"), { status: 404 });
  const uid = sessions.get(token);
  if (!uid || (uid !== offer.buyerId && uid !== db.channels.get(offer.channelId)?.sellerId)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  db.offers.delete(id);
  return { ok: true };
}

// Purchases
export async function listPurchases(token?: string): Promise<{ items: Purchase[] }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const uid = sessions.get(token);
  if (!uid) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const items = Array.from(db.purchases.values()).filter((p) => p.buyerId === uid || p.sellerId === uid);
  return { items };
}

export async function getPurchase(id: string): Promise<{ purchase: Purchase }> {
  seed();
  await delay();
  maybeFail();
  const purchase = db.purchases.get(id);
  if (!purchase) throw Object.assign(new Error("Purchase not found"), { status: 404 });
  return { purchase };
}

export async function createPurchase(token: string | undefined, data: { channelId: string; price: number }): Promise<{ purchase: Purchase }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const buyerId = sessions.get(token);
  if (!buyerId) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const channel = db.channels.get(data.channelId);
  if (!channel) throw Object.assign(new Error("Channel not found"), { status: 404 });
  const id = genId("p");
  const now = new Date().toISOString();
  const purchase: Purchase = {
    id,
    channelId: data.channelId,
    buyerId,
    sellerId: channel.sellerId,
    price: data.price,
    status: "initiated",
    createdAt: now,
    updatedAt: now,
    receiptId: undefined,
  };
  db.purchases.set(id, purchase);
  return { purchase };
}

export async function updatePurchase(token: string | undefined, id: string, data: Partial<Pick<Purchase, "status">>): Promise<{ purchase: Purchase }> {
  seed();
  await delay();
  maybeFail();
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  const purchase = db.purchases.get(id);
  if (!purchase) throw Object.assign(new Error("Purchase not found"), { status: 404 });
  const uid = sessions.get(token);
  const channel = db.channels.get(purchase.channelId);
  const sellerId = channel?.sellerId;
  if (!uid || (uid !== purchase.buyerId && uid !== sellerId)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  const updated: Purchase = { ...purchase, ...data, updatedAt: new Date().toISOString() } as Purchase;
  db.purchases.set(id, updated);
  return { purchase: updated };
}

// Analytics
export async function getAnalytics(channelId: string): Promise<{ analytics: Analytics }> {
  seed();
  await delay();
  maybeFail();
  const analytics = db.analytics.get(channelId);
  if (!analytics) throw Object.assign(new Error("Analytics not found"), { status: 404 });
  return { analytics };
}

// Convenience typesafe fetch wrappers could be added later if needed.
