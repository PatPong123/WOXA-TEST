// import { PrismaClient } from "@prisma/client";
// import { TRPCError } from "@trpc/server";

// // สร้าง Singleton Instance สำหรับ Prisma
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// // --- Broker Queries ---

// /**
//  * ดึงรายการโบรกเกอร์ (ใช้แทนตัวเดิมที่เคยใช้ Drizzle)
//  */
// export async function getBrokers(search?: string | null, types?: string[] | null) {
//   try {
//     return await prisma.brokers.findMany({
//       where: {
//         AND: [
//           search ? { name: { contains: search } } : {},
//           // ใช้ Operator 'in' สำหรับค้นหาหลายค่า
//           (types && types.length > 0) 
//             ? { broker_type: { in: types } } 
//             : {},
//         ],
//       },
//       orderBy: {
//         name: 'asc',
//       },
//     });
//   } catch (error) {
//     console.error("[Prisma] Failed to fetch brokers:", error);
//     throw error;
//   }
// }
// /**
//  * ดึงโบรกเกอร์ด้วย Slug
//  */
// export async function getBrokerBySlug(slug: string) {
//   return await prisma.brokers.findUnique({
//     where: { slug },
//   });
// }

// /**
//  * เช็คว่ามี Slug นี้หรือยัง
//  */
// export async function checkSlugExists(slug: string) {
//   const count = await prisma.brokers.count({
//     where: { slug },
//   });
//   return count > 0;
// }

// /**
//  * สร้างโบรกเกอร์ใหม่
//  */
// export async function createBroker(data: any) {
//   return await prisma.brokers.create({
//     data,
//   });
// }