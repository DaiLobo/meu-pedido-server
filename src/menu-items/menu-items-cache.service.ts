import { Injectable } from "@nestjs/common";
import redis, { connectRedis } from "../cache/redis";

@Injectable()
export class MenuItemsCacheService {
  private readonly CACHE_KEY = "menu_items_cache";

  async getPopularMenuItems(): Promise<any[]> {
    await connectRedis();
    const cached = await redis.get(this.CACHE_KEY);
    return cached ? JSON.parse(cached.toString()) : null;
  }

  async setPopularMenuItems(items: any[]): Promise<void> {
    await connectRedis();
    await redis.set(this.CACHE_KEY, JSON.stringify(items), {
      EX: 3600 // Expira em 1 hora
    });
  }
}
