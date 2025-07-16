const data = require("./data.js");
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

function transformProducts(data) {
    return data.map((product) => ({
        id: product.id,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: product.name,
        price: Number(product.actual_price),
        rating: Number(product.ratings),
        numberOfRating: Number(String(product.no_of_ratings).replace(/,/g, "")),
        quantitySold: Math.floor(
            1.5 * Number(String(product.no_of_ratings).replace(/,/g, ""))
        ),
        imageURL: product.image,
        categories: {
            connect: product.main_category.map((id) => ({ id })),
        },
        subCategories: {
            connect: product.sub_category.map((id) => ({ id })),
        },
        specs: [],
    }));
}

async function insertProducts() {
    try {
        await prisma.product.deleteMany({});
        console.log("All products deleted.");

        const transformedData = transformProducts(data);

        for (const product of transformedData) {
            try {
                await prisma.product.create({
                    data: product,
                });
                console.log(`Inserted: ${product.name}`);
            } catch (err) {
                console.error(`Error inserting ${product.name}:`, err.message);
            }
        }
    } catch (err) {
        console.error("Error during deletion or insertion:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

insertProducts();
