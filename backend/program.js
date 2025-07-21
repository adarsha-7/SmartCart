const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function program() {
    const subcategoriesWithCategories = await prisma.subCategory.findMany({
        select: {
            name: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
    });

    console.log(subcategoriesWithCategories);
}
program();
