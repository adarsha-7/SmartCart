-- AlterTable
CREATE SEQUENCE featuredproduct_id_seq;
ALTER TABLE "FeaturedProduct" ALTER COLUMN "id" SET DEFAULT nextval('featuredproduct_id_seq');
ALTER SEQUENCE featuredproduct_id_seq OWNED BY "FeaturedProduct"."id";

-- AlterTable
CREATE SEQUENCE trendingproduct_id_seq;
ALTER TABLE "TrendingProduct" ALTER COLUMN "id" SET DEFAULT nextval('trendingproduct_id_seq');
ALTER SEQUENCE trendingproduct_id_seq OWNED BY "TrendingProduct"."id";
