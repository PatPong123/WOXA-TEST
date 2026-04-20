import express from "express";
import cors from "cors";
import { prisma } from "./db";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


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
        const newBroker = await prisma.brokers.create({
            data: req.body, // หาก field ใน body ตรงกับ schema สามารถส่งเข้าไปตรงๆ ได้เลย
        });
        res.status(201).json(newBroker);
    } catch (error: any) {
        // เช็คกรณี Slug ซ้ำ (Unique constraint)
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Slug นี้มีอยู่ในระบบแล้ว" });
        }
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ REST API Server is running at http://localhost:${PORT}`);
});