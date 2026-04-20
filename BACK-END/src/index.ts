import express from "express";
import cors from "cors";
import { prisma } from "./db";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * 1. GET /api/brokers : ดึงข้อมูลทั้งหมด + Search & Filter
 * ตัวอย่าง: /api/brokers?search=capital&type=cfd
 */
app.get("/api/brokers", async (req, res) => {
    try {
        
        const { search, types } = req.query;

        
        const where: any = {};

       
        if (search && typeof search === "string") {
            where.name = {
                contains: search as string,
             
            };
        }

       
        if (types && typeof types === "string") {
            const typeArray = types.split(","); 
            where.broker_type = {
                in: typeArray,
            };
        }

        // 3. ส่ง where เข้าไปใน findMany
        const brokers = await prisma.brokers.findMany({
            where: where,
            orderBy: {
                id: 'desc' // เรียงลำดับจากใหม่ไปเก่า
            }
        });

        res.json(brokers);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "Backend Error",
            message: error.message,
            code: error.code
        });
    }
});

/**
 * 2. GET /api/brokers/:slug : ดึงข้อมูลรายตัวตาม Slug
 */
app.get("/api/brokers/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const broker = await prisma.brokers.findUnique({
            where: { slug }
        });

        if (!broker) return res.status(404).json({ message: "ไม่พบข้อมูลโบรกเกอร์" });

        res.json(broker);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * 3. POST /api/brokers : บันทึกข้อมูลใหม่
 */
app.post("/api/brokers", async (req, res) => {
    try {
        const data = req.body;
        const newBroker = await prisma.brokers.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                logo_url: data.logo_url,
                website: data.website,
                broker_type: data.broker_type,
                // ใส่ค่า Default สำหรับฟิลด์ที่ Database บังคับแต่ในฟอร์มยังไม่มี
                
               
               
            }
        });
        res.status(201).json(newBroker);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ REST API Server is running at http://localhost:${PORT}`);
});