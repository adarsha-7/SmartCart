const { PrismaClient } = require("./generated/prisma");
const data = require("./data");

const prisma = new PrismaClient();

async function program() {
    for (const item of data) {
        const { productId, categoryIds, subCategoryIds } = item;

        // Update product to clear and reconnect categories and subCategories
        await prisma.product.update({
            where: { id: productId },
            data: {
                categories: {
                    set: [], // clear existing categories
                    connect: categoryIds.map((id) => ({ id })),
                },
                subCategories: {
                    set: [], // clear existing subCategories
                    connect: subCategoryIds.map((id) => ({ id })),
                },
            },
        });

        console.log(`Updated product ${productId}`);
    }
}

program()
    .then(() => {
        console.log("All products updated successfully.");
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
