const data = [
    {
        id: 1,
        name: "Godrej 1 Ton 3 Star Inverter Split AC (GIC 12TTC3-WVA, White)",
        main_category: [1], // Electronics
        sub_category: [28, 59], // Mobiles, Smart Home Devices
        image: "https://m.media-amazon.com/images/I/41rnZbv7vBL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Godrej-Inverter-Split-GIC-12TTC3-WVA/dp/B0B2W25NHS/ref=sr_1_294?qid=1679134253&s=kitchen&sr=1-294",
        ratings: "5.0",
        no_of_ratings: "1",
        discount_price: 28650.0,
        actual_price: 40990.0,
    },
    {
        id: 2,
        name: "Panasonic 1 Ton 3 Star Wi-Fi Inverter Split Air Conditioner (White)",
        main_category: [1], // Electronics
        sub_category: [28, 59], // Mobiles, Smart Home Devices
        image: "https://m.media-amazon.com/images/I/51oqlNHOBaL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Panasonic-Conditioner-Convertible-Anti-Corrosion-CU-SU12XKYWA/dp/B09R3T1QLW/ref=sr_1_58?qid=1679134240&s=kitchen&sr=1-58",
        ratings: "4.2",
        no_of_ratings: "686",
        discount_price: 32490.0,
        actual_price: 48100.0,
    },
    {
        id: 3,
        name: "Sulfar Refrigerator Base Stand 4pcs, Washing Machine Stand, Furniture Base Stand, Fridge Stands, Black (0862)",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture
        image: "https://m.media-amazon.com/images/I/51T0gcGWugL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sulfar-Refrigerator-Washing-Machine-Furniture/dp/B09BZ53743/ref=sr_1_7380?qid=1679136008&s=appliances&sr=1-7380",
        ratings: "3.7",
        no_of_ratings: "26",
        discount_price: 0,
        actual_price: 149.0,
    },
    {
        id: 4,
        name: "REAL LIFE SOLUTION Coupler for 1/4 and 3/16 Pumping and Flushing for Refrigerator and AC Use, Black",
        main_category: [10], // Automotive & Tools
        sub_category: [20], // Hand Tools
        image: "https://m.media-amazon.com/images/I/71NEGFtIRhL._AC_UL320_.jpg",
        link: "https://www.amazon.in/REAL-LIFE-SOLUTION-16%E2%80%B3Pumping-Refrigerator/dp/B08G7R7H8L/ref=sr_1_5839?qid=1679135922&s=appliances&sr=1-5839",
        ratings: "3.2",
        no_of_ratings: "95",
        discount_price: 175.0,
        actual_price: 499.0,
    },
    {
        id: 5,
        name: "TATA NEXON OEM Type ARMREST",
        main_category: [10], // Automotive & Tools
        sub_category: [19], // Car Accessories
        image: "https://m.media-amazon.com/images/I/51d+XqH1bxL._AC_UL320_.jpg",
        link: "https://www.amazon.in/TATA-NEXON-OEM-Type-ARMREST/dp/B09K4BXHRV/ref=sr_1_1937?qid=1679222631&s=automotive&sr=1-1937",
        ratings: "4.1",
        no_of_ratings: "146",
        discount_price: 899.0,
        actual_price: 1250.0,
    },

    {
        id: 6,
        name: "AUTO SNAP Cute Car Air Fresheners Vent Clip, Outlet Freshener Perfume Clip Aroma Diffuser Decor, Lovely Couple Car Interio...",
        main_category: [10], // Automotive & Tools
        sub_category: [19], // Car Accessories
        image: "https://m.media-amazon.com/images/I/818YWu6726L._AC_UL320_.jpg",
        link: "https://www.amazon.in/AUTO-SNAP-Fresheners-Accessories-Decoration/dp/B0BGY6FWZ1/ref=sr_1_7471?qid=1679222772&s=automotive&sr=1-7471",
        ratings: "5.0",
        no_of_ratings: "2",
        discount_price: 999.0,
        actual_price: 9999.0,
    },
    {
        id: 7,
        name: "Sony MDR-XB55AP Premium in-Ear Extra Bass Wired Headphones with Mic (Black)",
        main_category: [1, 12], // Electronics, Music & Instruments
        sub_category: [35], // Audio Equipment
        image: "https://m.media-amazon.com/images/I/51ROSBYPXOL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sony-MDR-XB55AP-Extra-Headphone-Black/dp/B073JPC6R3/ref=sr_1_1321?qid=1679133731&s=electronics&sr=1-1321",
        ratings: "4.3",
        no_of_ratings: "16584",
        discount_price: 2099.0,
        actual_price: 2490.0,
    },
    {
        id: 8,
        name: "Cosmic Byte Stardust Headset with Flexible Mic for PS4, Xbox One, Laptop, PC, iPhone and Android Phones (Black)",
        main_category: [1, 12], // Electronics, Music & Instruments
        sub_category: [35, 36], // Audio Equipment, Accessories
        image: "https://m.media-amazon.com/images/I/61WVJ7jLT4L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Cosmic-Byte-Stardust-Flexible-Black/dp/B09J91KGB7/ref=sr_1_9507?qid=1679134232&s=electronics&sr=1-9507",
        ratings: "3.9",
        no_of_ratings: "86",
        discount_price: 699.0,
        actual_price: 1149.0,
    },
    {
        id: 9,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Just Care Unisex Athletic Fit Leggings",
        main_category: [4], // Sports
        sub_category: [25, 26], // Fitness Equipment, Outdoor Sports
        image: "https://m.media-amazon.com/images/I/51SUV8zubRL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Just-Care-Compression-Leggings-Sportswear/dp/B07TGK1GFR/ref=sr_1_3688?qid=1679218275&s=sports&sr=1-3688",
        ratings: "4.0",
        no_of_ratings: "1,229",
        discount_price: 340.0,
        actual_price: 999.0,
    },
    {
        id: 10,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Chromozome Men's Regular Shorts",
        main_category: [4], // Sports
        sub_category: [26], // Outdoor Sports
        image: "https://m.media-amazon.com/images/I/61aA1ucTyJL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Chromozome-Track-N-169-Running-Shorts_Black_X-Large/dp/B07NBW3599/ref=sr_1_226?qid=1679218208&s=sports&sr=1-226",
        ratings: "3.9",
        no_of_ratings: "2,460",
        discount_price: 324.0,
        actual_price: 659.0,
    },
    {
        id: 11,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Supathya Milagai podi - Idli Dosa Powder - Chutney podi Masala - Gun Powder - Karam Molaga Podi - 200g",
        main_category: [9], // Groceries
        sub_category: [16], // Snacks
        image: "https://m.media-amazon.com/images/I/71YmmNtksKL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Supathya-Milagai-podi-Powder-Chutney/dp/B07KVJ9ZWY/ref=sr_1_5302?qid=1679216259&s=grocery&sr=1-5302",
        ratings: "4.1",
        no_of_ratings: "962",
        discount_price: 193.0,
        actual_price: 195.0,
    },
    {
        id: 12,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Markstor Ajwa Al-Saudi - Finest Ajwa Dates (Khajoor/Khajur) of Madina, Saudi Arabia - 500g",
        main_category: [9], // Groceries
        sub_category: [49], // Dairy Products (closest fit)
        image: "https://m.media-amazon.com/images/I/71SL6aJBjKL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Markstor-Al-Saudi-Finest-Dates-Arabia/dp/B0767Z51PZ/ref=sr_1_4167?qid=1679216241&s=grocery&sr=1-4167",
        ratings: "4.0",
        no_of_ratings: "604",
        discount_price: 1250.0,
        actual_price: 2000.0,
    },
    {
        id: 13,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Stewit Capsule Shape Travel Toothbrush Toothpaste Case Holder Portable Toothbrush Storage Plastic Toothbrush Holder",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials
        image: "https://m.media-amazon.com/images/I/51ya+-+nQgL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Stewit-Toothbrush-Toothpaste-Multi-Color-ST-Capsule/dp/B09HH38V3W/ref=sr_1_1469?qid=1679214476&s=kitchen&sr=1-1469",
        ratings: "3.5",
        no_of_ratings: "662",
        discount_price: 89.0,
        actual_price: 149.0,
    },
    {
        id: 14,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "BSB Home Cotton 120 TC Pillow Cover, 6 Pieces - King, Multicolor",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture
        image: "https://m.media-amazon.com/images/I/91mioi1IrML._AC_UL320_.jpg",
        link: "https://www.amazon.in/BSB-Designer-Printed-Piece-Pillow/dp/B081T6Q5K2/ref=sr_1_4830?qid=1679214538&s=kitchen&sr=1-4830",
        ratings: "3.9",
        no_of_ratings: "1,164",
        discount_price: 399.0,
        actual_price: 999.0,
    },
    {
        id: 15,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Pups&Pets Hard Squeeze Green Squeak Ball Dog Toy Paw Design Piece Squeaky Ball Toy for Dog/Puppy. (Pack of 3)",
        main_category: [14], // Pets & Animals
        sub_category: [41], // Pet Toys
        image: "https://m.media-amazon.com/images/I/41OllOR88RL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Pups-Pets-Squeeze-Squeak-Squeaky/dp/B09RWTXQ2J/ref=sr_1_9492?qid=1679214770&s=pet-supplies&sr=1-9492",
        ratings: "3.4",
        no_of_ratings: "2",
        discount_price: 399.0,
        actual_price: 599.0,
    },
    {
        id: 16,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Pawsome Reversable Dual Color Beige & Black Ultra Soft Polyester Ethnic Designer Bed For Dog & Cat (Export Quality)- Small",
        main_category: [14], // Pets & Animals
        sub_category: [55], // Pet Beds
        image: "https://m.media-amazon.com/images/I/61ZOr2Cx69L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Pawsome-Reversable-Ethnic-desingner-Quality/dp/B08THZW4LB/ref=sr_1_2213?qid=1679214666&s=pet-supplies&sr=1-2213",
        ratings: "4.3",
        no_of_ratings: "747",
        discount_price: 699.0,
        actual_price: 1499.0,
    },
    {
        id: 17,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "CABLE GALLERY Men's Sweat Shapewear Vest Belt for Men, Polymer Shapewear, Workout Tank top for Weight Loss Waist Slim Trim",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment
        image: "https://m.media-amazon.com/images/I/71zxAouDShL._AC_UL320_.jpg",
        link: "https://www.amazon.in/CABLE-GALLERY-Shapewear-Polymer-Slimming/dp/B0B17MP7CY/ref=sr_1_5438?qid=1679218466&s=sports&sr=1-5438",
        ratings: "5.0",
        no_of_ratings: "6",
        discount_price: 499.0,
        actual_price: 999.0,
    },
    {
        id: 18,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "F Gear Military Garrison 36 Liters SIDE OPENING Rucksack Backpack (Khaki)",
        main_category: [4], // Sports
        sub_category: [44, 57], // Camping Gear, Trekking Gear
        image: "https://m.media-amazon.com/images/I/91x-rIXQ5ZL._AC_UL320_.jpg",
        link: "https://www.amazon.in/F-Gear-Military-Garrison-Rucksack-Khaki/dp/B07M98KMJ1/ref=sr_1_1932?qid=1679218403&s=sports&sr=1-1932",
        ratings: "4.2",
        no_of_ratings: "1,411",
        discount_price: 1110.0,
        actual_price: 3580.0,
    },
    {
        id: 19,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "Nivia Plain Encounter Stockings (M, Royal Blue) - Polyester Blend, Knee Length, Unisex, Pack of 1",
        main_category: [2], // Fashion
        sub_category: [22], // Men
        image: "https://m.media-amazon.com/images/I/21zsnOTQRGL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Nivia-728MRW-Encounter-Stockings-Medium/dp/B079SDH7G1/ref=sr_1_14201?qid=1679212518&s=apparel&sr=1-14201",
        ratings: "4.0",
        no_of_ratings: "739",
        discount_price: 145.0,
        actual_price: 149.0,
    },
    {
        id: 20,
        userID: "3d3e41fa-3242-46ca-af8c-6ec8f5326a61",
        name: "IndiWeaves� Womens Fleece Warm Neck Printed Kurtis for Winters [Pack of 4]",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/51AuFOlT5wL._AC_UL320_.jpg",
        link: "https://www.amazon.in/IndiWeaves%EF%BF%BD-Womens-Fleece-Printed-Winters/dp/B0BC4NNTJK/ref=sr_1_3977?qid=1679212409&s=apparel&sr=1-3977",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 2639.0,
        actual_price: 2749.0,
    },
    {
        id: 21,
        name: "Baby Basket Mothercare All We Know Baby Oil, 300 ml",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials
        image: "https://m.media-amazon.com/images/I/61XBJ9PyoTL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Baby-basket-Mothercare-All-Know/dp/B07D69DDLH/ref=sr_1_1057?qid=1679219945&s=baby&sr=1-1057",
        ratings: "4.3",
        no_of_ratings: "30",
        discount_price: 279.0,
        actual_price: 399.0,
    },
    {
        id: 22,
        name: "Little Fingers 4-in-1 Baby Grooming Kit/Nailcare kit for Newborn",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials
        image: "https://m.media-amazon.com/images/I/31eY4Knb8NL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Little-Fingers-Healthcare-Different-Available/dp/B08T9W3CWJ/ref=sr_1_9415?qid=1679220120&s=baby&sr=1-9415",
        ratings: "3.4",
        no_of_ratings: "8",
        discount_price: 229.0,
        actual_price: 499.0,
    },
    {
        id: 23,
        name: "Gini & Jony Baby Boy's T-Shirt",
        main_category: [2], // Fashion
        sub_category: [23], // Women (no direct subcategory for "Baby Fashion" — closest match is general fashion categories)
        image: "https://m.media-amazon.com/images/I/81j1jqCDoaL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Gini-Jony-Baby-Boys-121246524566-C316_Solar/dp/B09MZKZDZZ/ref=sr_1_17994?qid=1679221652&s=apparel&sr=1-17994",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 300.0,
        actual_price: 599.0,
    },
    {
        id: 24,
        name: "Mini Klub Baby Boy's Regular fit Romper Suit",
        main_category: [2], // Fashion
        sub_category: [23], // Women (used as stand-in for "Baby Fashion")
        image: "https://m.media-amazon.com/images/I/81TTb7T4nxL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Mini-Klub-Regular-Romper-97BBRO653-ON_Multi_0-3M/dp/B08H68YCFF/ref=sr_1_10359?qid=1679221552&s=apparel&sr=1-10359",
        ratings: "5.0",
        no_of_ratings: "1",
        discount_price: 210.0,
        actual_price: 699.0,
    },
    {
        id: 25,
        name: "Babymoon Headbands Flowers Soft Cotton Hairbands for Baby Girls Infants Toddlers",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials (best match for baby girl accessories)
        image: "https://m.media-amazon.com/images/I/61H1Plu8KQL._AC_UL320_.jpg",
        link: "https://www.amazon.in/BabyMoon-Headbands-Flowers-Hairbands-Scarlet/dp/B07FSYB8H6/ref=sr_1_1845?qid=1679219604&s=baby&sr=1-1845",
        ratings: "4.0",
        no_of_ratings: "113",
        discount_price: 199.0,
        actual_price: 345.0,
    },
    {
        id: 26,
        name: "Silver Shine Mosquito Net Single Bed Foldable",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Baby Products
        image: "https://m.media-amazon.com/images/I/712dqspQxlL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Silver-Mosquito-Single-Foldable-Protection/dp/B0B2PG723R",
        ratings: "3.8",
        no_of_ratings: "65",
        discount_price: 599.0,
        actual_price: 1599.0,
    },
    {
        id: 27,
        name: "Sisliya Multifunctional School Bag for Men",
        main_category: [11], // Bags & Luggage
        sub_category: [13], // Backpacks
        image: "https://m.media-amazon.com/images/I/51zgYpkfvNL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sisliya-Multifunctional-School-Vintage-Backpack/dp/B0BTHGFR2M",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 1199.0,
        actual_price: 1999.0,
    },
    {
        id: 28,
        name: "American Tourister Casual Backpack",
        main_category: [11],
        sub_category: [13],
        image: "https://m.media-amazon.com/images/I/A1+3Pfdc3IL._AC_UL320_.jpg",
        link: "https://www.amazon.in/American-Tourister-AMT-SCH-BAG02/dp/B07CGLDV2C",
        ratings: "4.1",
        no_of_ratings: "14448",
        discount_price: 999.0,
        actual_price: 1249.0,
    },
    {
        id: 29,
        name: "Lining Airforce 80 Lite Badminton Racquet",
        main_category: [4], // Sports & Fitness
        sub_category: [45], // Badminton
        image: "https://m.media-amazon.com/images/I/31KKgYx05AL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Lining-Airforce-Badmintonracquet-Purple-Material/dp/B09CTBJX9H",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 4082.0,
        actual_price: 5590.0,
    },
    {
        id: 30,
        name: "MEGAPLAY Force Badminton Kit",
        main_category: [4],
        sub_category: [45],
        image: "https://m.media-amazon.com/images/I/81D7sBNG5iL._AC_UL320_.jpg",
        link: "https://www.amazon.in/MEGAPLAY-Badminton-Rackets-Feather-Shuttle/dp/B0B6JBKK6Z",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 589.0,
        actual_price: 849.0,
    },
    {
        id: 31,
        name: "Lychee Canvas Blue Floral Print Sling Bag",
        main_category: [10], // Accessories
        sub_category: [13], // Bags & Luggage
        image: "https://m.media-amazon.com/images/I/81f7Ag7wlkL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Lychee-Womens-Sling-Yellow-Lbhbcp20Bl/dp/B01E3XPHB6",
        ratings: "3.8",
        no_of_ratings: "331",
        discount_price: 549.0,
        actual_price: 1199.0,
    },
    {
        id: 32,
        name: "K London Stylish Clutch Wallet",
        main_category: [10],
        sub_category: [13],
        image: "https://m.media-amazon.com/images/I/71yHoR71PuL._AC_UL320_.jpg",
        link: "https://www.amazon.in/London-Stylish-Zipped-Pocket-Clutch/dp/B09S3TDLR8",
        ratings: "4.4",
        no_of_ratings: "3",
        discount_price: 381.0,
        actual_price: 1500.0,
    },
    {
        id: 33,
        name: "Deeanne London Women's Bellies",
        main_category: [6], // Women's Shoes
        sub_category: [33], // Ballerinas
        image: "https://m.media-amazon.com/images/I/71uleS9-1sL._AC_UL320_.jpg",
        link: "https://www.amazon.in/DEEANNE-LONDON-Womans-Bellies-Orange/dp/B07MZ64NX4",
        ratings: "2.9",
        no_of_ratings: "28",
        discount_price: 419.0,
        actual_price: 999.0,
    },
    {
        id: 34,
        name: "Commander Casual Bellies",
        main_category: [6],
        sub_category: [33],
        image: "https://m.media-amazon.com/images/I/41ntx23kjoL._AC_UL320_.jpg",
        link: "https://www.amazon.in/commander-shoes-stylish-Casual-Bellies/dp/B08YDZ1MVD",
        ratings: "1.0",
        no_of_ratings: "1",
        discount_price: 589.0,
        actual_price: 1499.0,
    },
    {
        id: 35,
        name: "ClubBeauty Stainless Steel Cosmetic Mixing Plate",
        main_category: [7], // Beauty & Health
        sub_category: [32], // Beauty & Grooming
        image: "https://m.media-amazon.com/images/I/61JORu-Fq+L._AC_UL320_.jpg",
        link: "https://www.amazon.in/ClubBeauty-Mixing-Plate-Spatula-Tool/dp/B091K61N5V",
        ratings: "4.6",
        no_of_ratings: "376",
        discount_price: 133.0,
        actual_price: 499.0,
    },
    {
        id: 36,
        name: "MACPLUS Electric Shaver with Adjustable Trimming Range",
        main_category: [7], // Beauty & Health
        sub_category: [32], // Beauty & Grooming
        image: "https://m.media-amazon.com/images/I/413Gn7uC5lS._AC_UL320_.jpg",
        link: "https://www.amazon.in/MACPLUS-Electric-Adjustable-Trimming-Multicolour/dp/B08GZD5XTY",
        ratings: "3.8",
        no_of_ratings: "605",
        discount_price: 670.0,
        actual_price: 1999.0,
    },
    {
        id: 37,
        name: "NEW BLATT'S Premium Cotton Flat Double Bedsheets",
        main_category: [3], // Home & Kitchen
        sub_category: [15], // Bedroom Linen
        image: "https://m.media-amazon.com/images/I/51eEuJwZJVL._AC_UL320_.jpg",
        link: "https://www.amazon.in/NEW-BLATTS-Bed-Breathable-Wrinklefree/dp/B0BT8R1KTH",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 349.0,
        actual_price: 1299.0,
    },
    {
        id: 38,
        name: "Shri Anand Creations White Elastic Fitted Bedsheet",
        main_category: [3],
        sub_category: [15],
        image: "https://m.media-amazon.com/images/I/714LGgrQrEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Shri-Anand-Creations-Bedsheet-72X78X10/dp/B0BWMTMS7Z",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 395.0,
        actual_price: 1499.0,
    },
    {
        id: 39,
        name: "Lowepro Format 120 II Camera Bag",
        main_category: [13], // TV, Audio & Cameras
        sub_category: [47], // Camera Accessories
        image: "https://m.media-amazon.com/images/I/71Nu9F69j8L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Lowepro-Format-120-II-Camera/dp/B07T3GZ2NL",
        ratings: "4.1",
        no_of_ratings: "499",
        discount_price: 899.0,
        actual_price: 1504.0,
    },
    {
        id: 40,
        name: "Plus Carrying Case for GoPro Hero 5, 6, 7",
        main_category: [13],
        sub_category: [47],
        image: "https://m.media-amazon.com/images/I/51tsQxrw9RL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Plus-Carrying-Protective-Camera-Storage/dp/B07RBV7VLG",
        ratings: "4.2",
        no_of_ratings: "336",
        discount_price: 599.0,
        actual_price: 999.0,
    },
    {
        id: 41,
        name: "7SEVEN® CCTV Power Supply 8 Channel Camera 12v SMPS with Multi Port for Indoor or Outdoor Security Surveillance Cameras",
        main_category: [13], // TV, Audio & Cameras
        sub_category: [48], // Cameras
        image: "https://m.media-amazon.com/images/I/51fJ-BYBoXL._AC_UL320_.jpg",
        link: "https://www.amazon.in/7SEVEN-Outdoor-Channel-Warranty-Including/dp/B08WLRL42V/ref=sr_1_1325?qid=1679129996&s=electronics&sr=1-1325",
        ratings: "4.0",
        no_of_ratings: "142",
        discount_price: 680.0,
        actual_price: 999.0,
    },
    {
        id: 42,
        name: "KushJay Avenger 24 Images Digital Projector Watch for Kids",
        main_category: [13], // TV, Audio & Cameras
        sub_category: [48], // Cameras
        image: "https://m.media-amazon.com/images/I/517uYzKxBkS._AC_UL320_.jpg",
        link: "https://www.amazon.in/KushJay-Avenger-Images-Digital-Projector/dp/B09HP6SGLM/ref=sr_1_5398?qid=1679130233&s=electronics&sr=1-5398",
        ratings: "4.6",
        no_of_ratings: "3",
        discount_price: 280.0,
        actual_price: 999.0,
    },
    {
        id: 43,
        name: "Wholesalestuff Camping Tent Pegs Hammer Nails Pouch Storage Bag Stuff Sack Purplish Blue",
        main_category: [15], // Sports & Fitness
        sub_category: [54], // Camping & Hiking
        image: "https://m.media-amazon.com/images/I/51lAfXoJlML._AC_UL320_.jpg",
        link: "https://www.amazon.in/Wholesalestuff-Camping-Hammer-Storage-Purplish/dp/B0B7S7WRW1/ref=sr_1_7559?qid=1679217628&s=sports&sr=1-7559",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 44,
        name: "Water Bag Hydration Pack Bite Valve Nozzle Bladder Black 7.5x7cm 90 Degree",
        main_category: [15], // Sports & Fitness
        sub_category: [54], // Camping & Hiking
        image: "https://m.media-amazon.com/images/I/51SlVhF5qfL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Hydration-Nozzle-Bladder-7-5x7cm-Degree/dp/B0BFQ3VJHS/ref=sr_1_6025?qid=1679217603&s=sports&sr=1-6025",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 985.0,
        actual_price: 1970.0,
    },
    {
        id: 45,
        name: "NOFOX Tornado Interior High Pressure Car Cleaning Gun Surface Interior Exterior Tornado Tool",
        main_category: [14], // Car & Motorbike
        sub_category: [49], // Car & Bike Care
        image: "https://m.media-amazon.com/images/I/31tx0x0E43L._AC_UL320_.jpg",
        link: "https://www.amazon.in/NOFOX-Interior-Pressure-Cleaning-Exterior/dp/B09NNRPNH7/ref=sr_1_4150?qid=1679222483&s=automotive&sr=1-4150",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 3510.0,
        actual_price: 3999.0,
    },
    {
        id: 46,
        name: "ELISCO Powerful Portable & High Power 12V Orange Car Handheld Vacuum Cleaner for Car and Home Wet and Dry Car Vacuum Cleaner",
        main_category: [14], // Car & Motorbike
        sub_category: [49], // Car & Bike Care
        image: "https://m.media-amazon.com/images/I/71bRnEPILaL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ELISCO-Powerful-Portable-Handheld-Multipurpose/dp/B0BWRYQFC6/ref=sr_1_3399?qid=1679222470&s=automotive&sr=1-3399",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 909.0,
        actual_price: 4399.0,
    },
    {
        id: 47,
        name: "Kozdiko Custom Fit Car Sun Shades Fix Non Magnetic Curtains Mesh Compatible for Tata Nano",
        main_category: [14], // Car & Motorbike
        sub_category: [50], // Car Accessories
        image: "https://m.media-amazon.com/images/I/51RJow6KrNL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kozdiko-Custom-Magnetic-Curtains-Compatible/dp/B0BWN1B9FX/ref=sr_1_7918?qid=1679222021&s=automotive&sr=1-7918",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 579.0,
        actual_price: 1099.0,
    },
    {
        id: 48,
        name: "Autofact Car Body Cover with Mirror Pockets Compatible for Honda Brio (Triple Stitched , Bottom Fully Elastic , Royal Blue)",
        main_category: [14], // Car & Motorbike
        sub_category: [50], // Car Accessories
        image: "https://m.media-amazon.com/images/I/71EqU6hekWL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Autofact-Honda-Brio-Car-Accessories/dp/B07DYSTR22/ref=sr_1_9511?qid=1679222054&s=automotive&sr=1-9511",
        ratings: "3.9",
        no_of_ratings: "40",
        discount_price: 999.0,
        actual_price: 1999.0,
    },
    {
        id: 49,
        name: "Cave® RJ-1640 3-Way 6-Inches Coaxial Car Speakers with Inbuilt Tweeter (600W-Max)",
        main_category: [14], // Car & Motorbike
        sub_category: [51], // Car Electronics
        image: "https://m.media-amazon.com/images/I/81+TsxjqGGL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Cave%C2%AE-Inches-Speakers-Tweeter-Speaker/dp/B08LL9Q6M3/ref=sr_1_5119?qid=1679222155&s=electronics&sr=1-5119",
        ratings: "3.6",
        no_of_ratings: "43",
        discount_price: 1199.0,
        actual_price: 1830.0,
    },
    {
        id: 50,
        name: "Pinaaki Enterprises Nokia C31 Flip Case | Leather Finish Flip Cover |Complete Protection Flip Cover for Nokia C31 - Mango",
        main_category: [14], // Car & Motorbike
        sub_category: [51], // Car Electronics
        image: "https://m.media-amazon.com/images/I/51YxlEMYPEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Pinaaki-Enterprises-Leather-Complete-Protection/dp/B0BR3PN6WC/ref=sr_1_5939?qid=1679222168&s=electronics&sr=1-5939",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 169.0,
        actual_price: 999.0,
    },
    {
        id: 51,
        name: "Generic SET OF 2 PCS REAR REFLECTOR LIGHT FOR SCORPIO",
        main_category: [10], // Automotive & Tools
        sub_category: [19], // Car Accessories
        image: "https://m.media-amazon.com/images/I/61NYzHkU4nL._AC_UL320_.jpg",
        link: "https://www.amazon.in/2PCS-REAR-REFLECTOR-LIGHT-SCORPIO/dp/B0B363DTGJ/ref=sr_1_2645?qid=1679222270&s=automotive&sr=1-2645",
        ratings: "5.0",
        no_of_ratings: "2",
        discount_price: 699.0,
        actual_price: 1299.0,
    },
    {
        id: 52,
        name: "I-POP Door Guard Bumper Protector Universal for All Cars with 3M Sticker Black Color (Pack of 4)",
        main_category: [10], // Automotive & Tools
        sub_category: [19], // Car Accessories
        image: "https://m.media-amazon.com/images/I/51l2iHOFoPL._AC_UL320_.jpg",
        link: "https://www.amazon.in/I-POP-Bumper-Protector-Universal-Sticker/dp/B094FWZ42Q/ref=sr_1_1332_mod_primary_new?qid=1679222252&s=automotive&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1332",
        ratings: "3.3",
        no_of_ratings: "94",
        discount_price: 205.0,
        actual_price: 399.0,
    },
    {
        id: 53,
        name: "Holy Delight Folding Mini Stationary Bike Pedaler Fitness Gym Equipment for Seniors Digital Home Gym Fitness Cycle - Foot ...",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment
        image: "https://m.media-amazon.com/images/I/61h1tQjvBOL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Holy-Delight-Folding-Stationary-Equipment/dp/B07X3DLTWH/ref=sr_1_217?qid=1679218168&s=sports&sr=1-217",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 1894.0,
        actual_price: 3999.0,
    },
    {
        id: 54,
        name: "Dolphy Fitness Stair Stepper with LCD Monitor, Portable Twist Stair Stepper Household Hydraulic Mute Stepper for Home Gym",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment
        image: "https://m.media-amazon.com/images/I/51gvbyu7rXL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Fitness-Resistance-Portable-Household-Hydraulic/dp/B0B6F9Y97X/ref=sr_1_151?qid=1679218166&s=sports&sr=1-151",
        ratings: "4.4",
        no_of_ratings: "3",
        discount_price: 4999.0,
        actual_price: 9999.0,
    },
    {
        id: 55,
        name: "Puma Mens Premium Tz Idp Closed Shoe",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/71CmG3-zXdL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Puma-Premium-Castlerock-Ebony-Yellow-Sneaker-8-4063696107916/dp/B084HZFM44/ref=sr_1_9258?qid=1679148951&s=shoes&sr=1-9258",
        ratings: "4.0",
        no_of_ratings: "252",
        discount_price: 2208.0,
        actual_price: 4499.0,
    },
    {
        id: 56,
        name: "Aqualite Mens Htr00116g Sneaker",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/71giaCHM+tS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Aqualite-Brown-Sneakers-UK-HTR00116GBRBR06/dp/B08GW5Y2WD/ref=sr_1_12036?qid=1679149053&s=shoes&sr=1-12036",
        ratings: "3.9",
        no_of_ratings: "52",
        discount_price: 890.0,
        actual_price: 899.0,
    },
    {
        id: 57,
        name: "US Polo Women's Solid T-Shirt",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/81XFOeY6XRL._AC_UL320_.jpg",
        link: "https://www.amazon.in/US-Polo-T-Shirt-UWTS0233_Peacock-Green_X-Large/dp/B01I53L692/ref=sr_1_14239?qid=1679153257&s=apparel&sr=1-14239",
        ratings: "3.6",
        no_of_ratings: "15",
        discount_price: 615.0,
        actual_price: 999.0,
    },
    {
        id: 58,
        name: "Teemoods Women's Cotton Full Sleeves Long Shrug",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/51Eqy29ay1L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Teemoods-Womens-Cotton-Sleeves-Fashionable/dp/B07DK8F9L8/ref=sr_1_9356?qid=1679153077&s=apparel&sr=1-9356",
        ratings: "3.8",
        no_of_ratings: "102",
        discount_price: 999.0,
        actual_price: 1499.0,
    },
    {
        id: 59,
        name: "Namaste Chai - Immuneup - Immunity Booster | Herbal Tea | Ancient Indian Ayurvedic Kadha |48 Sachets| 17 Natural Herbs All...",
        main_category: [9], // Groceries
        sub_category: [17], // Beverages
        image: "https://m.media-amazon.com/images/I/61CPhmvCVwL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Namaste-Chai-Immuneup-Ayurvedic-Antioxidant/dp/B08CBWJ7N4/ref=sr_1_4751?qid=1679216415&s=grocery&sr=1-4751",
        ratings: "4.5",
        no_of_ratings: "23",
        discount_price: 649.0,
        actual_price: 700.0,
    },
    {
        id: 60,
        name: "Jeevan Ras Patharchur Herbal Juice (500 ml)",
        main_category: [9], // Groceries
        sub_category: [17], // Beverages
        image: "https://m.media-amazon.com/images/I/61SEjXmRuDL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jeevan-Ras-Patharchur-Herbal-Juice/dp/B017OYWYU8/ref=sr_1_5858?qid=1679216435&s=grocery&sr=1-5858",
        ratings: "3.8",
        no_of_ratings: "283",
        discount_price: 245.0,
        actual_price: 250.0,
    },
    {
        id: 61,
        name: "Kidbee Boy's & Girls Cotton Hooded Sweatshirt",
        main_category: [4], // Sports
        sub_category: [26], // Outdoor Sports (Closest to Cricket)
        image: "https://m.media-amazon.com/images/I/91ot6ZpV-HL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kidbee-Cotton-Hooded-Sweatshirt-RoyalBlue/dp/B09QT5Q1SB/ref=sr_1_2189?qid=1679216704&s=sports&sr=1-2189",
        ratings: "3.9",
        no_of_ratings: "122",
        discount_price: 425.0,
        actual_price: 1699.0,
    },
    {
        id: 62,
        name: "FEROC FCL Full Cricket Spikes Shoes",
        main_category: [4], // Sports
        sub_category: [26], // Outdoor Sports (Closest to Cricket)
        image: "https://m.media-amazon.com/images/I/61qFQk3xv8L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Feroc-Cricket-Spikes-Shoes-Green/dp/B07L7NBCZF/ref=sr_1_1620?qid=1679216694&s=sports&sr=1-1620",
        ratings: "3.8",
        no_of_ratings: "24",
        discount_price: 1649.0,
        actual_price: 2899.0,
    },
    {
        id: 63,
        name: "STEFFER Headband Wristband for Sports Gym Workout ,Yoga (1Headband -2 Wristbands) Unisex Fitness Band (Red)",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment (Closest to Cycling)
        image: "https://m.media-amazon.com/images/I/61Aa-Z8n4BL._AC_UL320_.jpg",
        link: "https://www.amazon.in/STEFFER-Headband-Wristband-1Headband-Wristbands/dp/B0B39KH5KR/ref=sr_1_1519?qid=1679217018&s=sports&sr=1-1519",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 180.0,
        actual_price: 499.0,
    },
    {
        id: 64,
        name: "Hind Home Women's Nylon Ankle Length Skin Ultra-Thin Transparent Summer Socks - Pack of 5",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment (Closest to Cycling)
        image: "https://m.media-amazon.com/images/I/61rX7RA5lTL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Hind-Home-Ultra-Thin-Transparent-Socks/dp/B09JKP13SQ/ref=sr_1_4497?qid=1679217071&s=sports&sr=1-4497",
        ratings: "2.0",
        no_of_ratings: "1",
        discount_price: 189.0,
        actual_price: 399.0,
    },
    {
        id: 65,
        name: "WAHHSON Washable Reusable Pocket Cloth Diapers for New Born Baby, Baby Washable Cloth Diaper Nappies with Wet-Free Inserts...",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials (Closest to Diapers)
        image: "https://m.media-amazon.com/images/I/51fQ1p6mMPL._AC_UL320_.jpg",
        link: "https://www.amazon.in/WAHHSON-Washable-Reusable-Wet-Free-Toddlers/dp/B09M42TFT8/ref=sr_1_4845?qid=1679219825&s=baby&sr=1-4845",
        ratings: "3.8",
        no_of_ratings: "19",
        discount_price: 699.0,
        actual_price: 1299.0,
    },
    {
        id: 66,
        name: "Mother Sparsh Combo Pack of Plant Powered Cloth Diaper + Soaker Pad with 99% Water Wipes, 72Pcs Pack of 3 (Snoozy Sun) (Fr...",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials (Closest to Diapers)
        image: "https://m.media-amazon.com/images/I/515GsK+n1SL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Mother-Sparsh-Powered-Diaper-Booster/dp/B0BJ964SRN/ref=sr_1_6036?qid=1679219848&s=baby&sr=1-6036",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 1049.0,
        actual_price: 1787.0,
    },

    {
        id: 71,
        name: "MS VHCK ENTERPRISE Women Woven Cotton Fabric Stylist Kurti Kurta",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/81+f4MuWndL._AC_UL320_.jpg",
        link: "https://www.amazon.in/MS-VHCK-ENTERPRISE-Cotton-Stylist/dp/B09VBNT9YT/ref=sr_1_9210?qid=1679154464&s=apparel&sr=1-9210",
        ratings: "3.3",
        no_of_ratings: "9",
        discount_price: 209.0,
        actual_price: 699.0,
    },
    {
        id: 72,
        name: "MY CHOICE Women's rajasthani bandhani print saree with work",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/91gjkeNOhTL._AC_UL320_.jpg",
        link: "https://www.amazon.in/CHOICE-Women-rajasthani-bandhani-print/dp/B07ZBHGQ97/ref=sr_1_12036?qid=1679154569&s=apparel&sr=1-12036",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 999.0,
        actual_price: 3333.0,
    },
    {
        id: 73,
        name: "Silver color Vampire Diaries Inspired Movie Jewelry For Girls Women",
        main_category: [8], // Toys & Baby Products (closest match to accessories)
        sub_category: [], // No exact subcategory match for Fashion & Silver Jewellery
        image: "https://m.media-amazon.com/images/I/51FKtYE+2jS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Silver-Vampire-Diaries-Inspired-Jewelry/dp/B09J2R1JTH/ref=sr_1_9433?qid=1679160266&s=jewelry&sr=1-9433",
        ratings: "4.3",
        no_of_ratings: "15",
        discount_price: 369.0,
        actual_price: 699.0,
    },
    {
        id: 74,
        name: "I Jewels 18K Gold Plated with Stunning Matte Finish Traditional Big Kundan & Faux Pearl Bridal Chandbali Earrings with Maa...",
        main_category: [8], // Toys & Baby Products (closest match to accessories)
        sub_category: [], // No exact subcategory match for Fashion & Silver Jewellery
        image: "https://m.media-amazon.com/images/I/910SJi3Un5L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jewels-Stunning-Traditional-Chandbali-Earrings/dp/B08JLPRTXY/ref=sr_1_4523?qid=1679160091&s=jewelry&sr=1-4523",
        ratings: "3.7",
        no_of_ratings: "105",
        discount_price: 614.0,
        actual_price: 2999.0,
    },
    {
        id: 75,
        name: "Caprese Womens Zip Closure Tote Handbag",
        main_category: [2], // Fashion
        sub_category: [36], // Accessories (subcategory id 36 under main category 12 Music & Instruments? No, 36 is Accessories under 12 but this is Fashion accessory, so I will pick subcategory 30 Accessories under Electronics is 30, but Fashion Accessories subcategory is missing?
        image: "https://m.media-amazon.com/images/I/91eMGXsjsqL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Caprese-Womens-Tote-Bag-Ochre/dp/B072N8KNQQ/ref=sr_1_278?qid=1679212573&s=apparel&sr=1-278",
        ratings: 3.7,
        no_of_ratings: 141,
        discount_price: 1699.0,
        actual_price: 4299.0,
    },
    {
        id: 76,
        name: "Mango Star Stylish And Trendy Shoulders Hand Beg With Combo PU Leather Material For Women's (Green)",
        main_category: [2], // Fashion
        sub_category: [], // No exact match for Fashion Sales & Deals
        image: "https://m.media-amazon.com/images/I/61BqpNxC8hL._AC_UL320_.jpg",
        link: "https://www.amazon.in/mango-star-Stylish-Clutch-Womens/dp/B079D2MJ71/ref=sr_1_265?qid=1679212573&s=apparel&sr=1-265",
        ratings: 3.2,
        no_of_ratings: 32,
        discount_price: 548.0,
        actual_price: 1499.0,
    },
    {
        id: 77,
        name: "Parnami01 Enterprises Women/Girls New Desgin Belli Heel Sandal",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/51GJXyyC5ML._AC_UL320_.jpg",
        link: "https://www.amazon.in/Parnami01-Enterprises-Belli-Heel-Sandal/dp/B0B5H9XGBZ/ref=sr_1_17946?qid=1679211816&s=shoes&sr=1-17946",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 539.0,
        actual_price: 999.0,
    },
    {
        id: 78,
        name: "Catwalk Black Fashion Sandals",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/71U8M6pZQ0L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Catwalk-Womens-Fashion-Sandals-5-4849c-5/dp/B08554SBF3/ref=sr_1_9447?qid=1679211741&s=shoes&sr=1-9447",
        ratings: 3.4,
        no_of_ratings: 9,
        discount_price: 999.0,
        actual_price: 2595.0,
    },
    {
        id: 79,
        name: "Rioff® skipping rope for kids beginner",
        main_category: [4], // Sports
        sub_category: [], // Fitness Accessories is not explicitly listed, leaving empty
        image: "https://m.media-amazon.com/images/I/71OgQlkSUyL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Rioff-jumping-skipping-beginner-Black/dp/B08FGCW7CC/ref=sr_1_2339?qid=1679217700&s=sports&sr=1-2339",
        ratings: 3.1,
        no_of_ratings: 27,
        discount_price: 449.0,
        actual_price: 499.0,
    },
    {
        id: 80,
        name: "IRIS Fitness Thick Bar Grips - Comfortable and Durable Non-Slip Silicone Rubber Easily Attachable to Any Bar - for Barbell",
        main_category: [4], // Sports
        sub_category: [], // Fitness Accessories - no exact match, left empty
        image: "https://m.media-amazon.com/images/I/71G+JHQbw8L._AC_UL320_.jpg",
        link: "https://www.amazon.in/IRIS-Fitness-Thick-Bar-Grips/dp/B06ZYHR375/ref=sr_1_5450?qid=1679217758&s=sports&sr=1-5450",
        ratings: 3.8,
        no_of_ratings: 6,
        discount_price: 699.0,
        actual_price: 3000.0,
    },
    {
        id: 81,
        name: "Jockey Solid Women Grey Track Pants",
        main_category: [4], // Sports
        sub_category: [], // Football subcategory not listed under Sports, but Football is likely Outdoor Sports (26)
        image: "https://m.media-amazon.com/images/I/41jgIrXdgWL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jockey-Solid-Women-Track-Pants/dp/B0BVG83K88/ref=sr_1_4358?qid=1679217238&s=sports&sr=1-4358",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 999.0,
        actual_price: 1099.0,
        sub_category: [26], // Outdoor Sports
    },
    {
        id: 82,
        name: "Jockey Men's Track Jacket",
        main_category: [4], // Sports
        sub_category: [26], // Outdoor Sports (Football)
        image: "https://m.media-amazon.com/images/I/51x9aahNqZL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jockey-Mens-Track-Jacket-2730-0103-NAVY_Large/dp/B07911N189/ref=sr_1_1781?qid=1679217188&s=sports&sr=1-1781",
        ratings: 3.9,
        no_of_ratings: 351,
        discount_price: 1515.0,
        actual_price: 1699.0,
    },
    {
        id: 83,
        name: "San Frissco Men Faux Leather Field Black Derby Shoes",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/812kqoPCglS._AC_UL320_.jpg",
        link: "https://www.amazon.in/San-Frissco-Leather-Field-Black/dp/B0978H5SNR/ref=sr_1_3243?qid=1679148007&s=shoes&sr=1-3243",
        ratings: 2.0,
        no_of_ratings: 1,
        discount_price: 1748.0,
        actual_price: 4995.0,
    },
    {
        id: 84,
        name: "ONE8 Select Premium Leather Loafer Shoes Slip-on for Men's",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/61LalJmg1VL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ONE8-Select-Premium-Leather-Loafer/dp/B09ZBFFVDW/ref=sr_1_14703?qid=1679148441&s=shoes&sr=1-14703",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 6399.0,
        actual_price: 7999.0,
    },
    {
        id: 85,
        name: "KARP Office Chair Wheel Heavy Duty Castor Thread Type Revolving Chair Wheel - 2 Inch Office Chair Wheels Replacement Set of 5",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture
        image: "https://m.media-amazon.com/images/I/61OovdsVISL._AC_UL320_.jpg",
        link: "https://www.amazon.in/KARP-Office-Castor-Thread-Revolving/dp/B09RSYPKX8/ref=sr_1_482?qid=1679212908&s=kitchen&sr=1-482",
        ratings: 3.6,
        no_of_ratings: 119,
        discount_price: 249.0,
        actual_price: 499.0,
    },
    {
        id: 86,
        name: "Nilkamal Comfy Plastic Chairs Set of 2 for Dining Room|Living Room|Balcony|Patio Chair|Indoor|Outdoor|Office Work & Shop| Plastic Chairs",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture
        image: "https://m.media-amazon.com/images/I/7182a3f50tL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Nilkamal-Plastic-Balcony-Outdoor-Structure/dp/B0BFJ7GNBD/ref=sr_1_9140?qid=1679213058&s=kitchen&sr=1-9140",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 0,
        actual_price: 2900.0,
    },
    {
        id: 87,
        name: "ALMADEEN Crafts® Metal Flower Stand 2 Tier Indoor Shelf Holder Metal Tall Display Designs Planter Pot Plant Flower Stand S...",
        main_category: [3], // Home & Living
        sub_category: [], // Garden & Outdoors (not in subcategory list)
        image: "https://m.media-amazon.com/images/I/61m7jDhuSEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ALMADEEN-CraftsTM-Display-Designs-Planter/dp/B09M42ZQNK/ref=sr_1_3478?qid=1679213656&s=garden&sr=1-3478",
        ratings: 3.6,
        no_of_ratings: 56,
        discount_price: 1479.0,
        actual_price: 3350.0,
    },
    {
        id: 88,
        name: "Guuchuu Poly Resin Cute Planter Pot (1 Pot Only) Plant not Included, Medium, and Color, 1 Piece",
        main_category: [3], // Home & Living
        sub_category: [], // Garden & Outdoors (not in subcategory list)
        image: "https://m.media-amazon.com/images/I/51DeduG97ML._AC_UL320_.jpg",
        link: "https://www.amazon.in/Guuchuu-Planter-Included-Medium-Assorted/dp/B08ZKLP2LF/ref=sr_1_3862?qid=1679213663&s=garden&sr=1-3862",
        ratings: 4.3,
        no_of_ratings: 43,
        discount_price: 284.0,
        actual_price: 499.0,
    },
    {
        id: 89,
        name: "PC Jeweller 18k (750) White Gold and Solitaire Ring for Women",
        main_category: [2], // Fashion
        sub_category: [], // Gold & Diamond Jewellery (not in subcategory list)
        image: "https://m.media-amazon.com/images/I/51-JGKvI+cL._AC_UL320_.jpg",
        link: "https://www.amazon.in/PC-Jeweller-White-Solitaire-Women/dp/B07X9QWJRS/ref=sr_1_9385?qid=1679159576&s=jewelry&sr=1-9385",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 56278.0,
        actual_price: 66209.0,
    },
    {
        id: 90,
        name: "DISHIS 14k (585) Rose Gold Designer Bracelet for Women",
        main_category: [2], // Fashion
        sub_category: [], // Gold & Diamond Jewellery (not in subcategory list)
        image: "https://m.media-amazon.com/images/I/51FDBZrNawL._AC_UL320_.jpg",
        link: "https://www.amazon.in/DISHIS-Rose-Designer-Bracelet-Women/dp/B08FBKGDCM/ref=sr_1_4523?qid=1679159397&s=jewelry&sr=1-4523",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 91,
        name: "Attack on Titan Anime Survey Corps Tote Bag",
        main_category: [2], // Fashion
        sub_category: [43], // Luggage (subcategory 43 under Fashion is not listed, but 43 is Luggage under Travel & Outdoors (15). Since it is a tote bag, assign Travel & Outdoors)
        image: "https://m.media-amazon.com/images/I/418PqaDpuqL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Attack-Titan-Anime-Survey-Corps/dp/B09WYYCHHW/ref=sr_1_18352?qid=1679159207&s=shoes&sr=1-18352",
        ratings: 4.6,
        no_of_ratings: 3,
        discount_price: 599.0,
        actual_price: 999.0,
    },
    {
        id: 92,
        name: "Baggit Women's Sling Bag - Small",
        main_category: [2], // Fashion
        sub_category: [43], // Luggage (similar reasoning as above)
        image: "https://m.media-amazon.com/images/I/51gbgHRCmcL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Baggit-Womens-Sling-Bag-Small/dp/B0BNTQJDDG/ref=sr_1_9385?qid=1679158907&s=shoes&sr=1-9385",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 819.0,
        actual_price: 1690.0,
    },
    {
        id: 93,
        name: "CCA CRA in Ear Earphone, Ultra-Thin Diaphragm Dynamic Driver IEM, Clear Sound & Deep Bass, Wired Earbuds with Mic and Tangle-Free Cable",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories (subcategory 36 under Music & Instruments but closest for Accessories)
        image: "https://m.media-amazon.com/images/I/616EVVFlznL._AC_UL320_.jpg",
        link: "https://www.amazon.in/CCA-Ultra-Thin-Diaphragm-Tangle-Free-Removable/dp/B09NNGSCXH/ref=sr_1_1325?qid=1679128762&s=electronics&sr=1-1325",
        ratings: 4.4,
        no_of_ratings: 504,
        discount_price: 1499.0,
        actual_price: 2199.0,
    },
    {
        id: 94,
        name: "foxly HS12 Wireless Bluetooth Over the Ear Headphone Mic with Music and Calling Controls Adjustable Pads for Small and Big Heads",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories (closest for Headphones not listed)
        image: "https://m.media-amazon.com/images/I/61bOcQDKtpS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Bluetooth-Headphone-Adjustable-multicolor-stretchable/dp/B09D4VVV37/ref=sr_1_9508?qid=1679129279&s=electronics&sr=1-9508",
        ratings: 3.2,
        no_of_ratings: 7,
        discount_price: 640.0,
        actual_price: 999.0,
    },
    {
        id: 96,
        name: "Himalaya Purifying Neem Pack, 100g",
        main_category: [11], // Health & Wellness
        sub_category: [31], // Supplements
        image: "https://m.media-amazon.com/images/I/51f+Wj72nJL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Himalaya-Herbals-Purifying-Neem-Pack/dp/B005HBPEMQ/ref=sr_1_2782?qid=1679215386&s=hpc&sr=1-2782",
        ratings: 4.3,
        no_of_ratings: 3500,
        discount_price: 129.0,
        actual_price: 160.0,
    },
    {
        id: 97,
        name: "MuscleBlaze MB-Burner PRO, L- Carnitine, Garcinia Cambogia, Caffeine, Green Tea, Green Coffee Bean, Coleus Forskohlii, Bla...",
        main_category: [11], // Health & Wellness
        sub_category: [31], // Supplements
        image: "https://m.media-amazon.com/images/I/61HF0GESAuL._AC_UL320_.jpg",
        link: "https://www.amazon.in/MuscleBlaze-Carnitine-Garcinia-Caffeine-Extract/dp/B08QM6QJXP/ref=sr_1_3114?qid=1679215418&s=hpc&sr=1-3114",
        ratings: 3.8,
        no_of_ratings: 1338,
        discount_price: 849.0,
        actual_price: 1149.0,
    },
    {
        id: 98,
        name: "HAVAI Honeycomb Pad - Set of 3 - for Voltas Jetmax 70 Litre Desert Cooler",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials (closest related)
        image: "https://m.media-amazon.com/images/I/61FiVQ4gWfL._AC_UL320_.jpg",
        link: "https://www.amazon.in/HAVAI-Honeycomb-Pad-Voltas-Jetmax/dp/B0B57H13S7/ref=sr_1_5398?qid=1679135348&s=kitchen&sr=1-5398",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 1895.0,
        actual_price: 2499.0,
    },
    {
        id: 99,
        name: "Voltas All Weather 1.5 Ton, 3 star Split AC, (Copper 183 DZR, White)",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials (closest related)
        image: "https://m.media-amazon.com/images/I/31yUMnl4+RL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Voltas-Weather-Copper-183-DZR/dp/B09YMH95PF/ref=sr_1_9173?qid=1679135558&s=kitchen&sr=1-9173",
        ratings: 3.0,
        no_of_ratings: 1,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 100,
        name: "Rambutan Sl100 Relay 1.9",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories (closest related)
        image: "https://m.media-amazon.com/images/I/41Hx5ADkHmL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Generic-Rambutan-Sl100-Relay-1-9/dp/B08ZXMNQFY/ref=sr_1_288?qid=1679129909&s=electronics&sr=1-288",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 300.0,
        actual_price: 500.0,
    },
    {
        id: 101,
        name: "Rambutan Motor Driver 1.10",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories (closest related)
        image: "https://m.media-amazon.com/images/I/41gNWMk4i6L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Generic-Rambutan-Motor-Driver-1-10/dp/B08ZXKDMB9/ref=sr_1_290?qid=1679129909&s=electronics&sr=1-290",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 210.0,
        actual_price: 500.0,
    },
    {
        id: 102,
        name: "Devotional Kart Yin Yang Bagua Pa KUA for Toilet / Bathroom / Latrine Vastu and Balancing Energies",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor (closest related)
        image: "https://m.media-amazon.com/images/I/61CWax7mPZL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Devotional-Kart-Yang-Bagua-Symbol/dp/B09PZ5MLN9/ref=sr_1_5419?qid=1679213522&s=kitchen&sr=1-5419",
        ratings: 3.8,
        no_of_ratings: 6,
        discount_price: 149.0,
        actual_price: 300.0,
    },
    {
        id: 103,
        name: "PnF Diwali Puja (laxmiji, Ganeshji,Saraswatiji) Religious Wood Photo Frames with Acrylic Sheet (Glass) for Worship/Pooja(p...",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor
        image: "https://m.media-amazon.com/images/I/613iLeUXuEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Ganeshji-Saraswatiji-Religious-photoframe-Multicolour/dp/B08R5KT6MB/ref=sr_1_8801?qid=1679213583&s=kitchen&sr=1-8801",
        ratings: 4.0,
        no_of_ratings: 11,
        discount_price: 219.0,
        actual_price: 499.0,
    },
    {
        id: 104,
        name: "Charging & Data USB Cable For vivo Z1 Pro Original USB Cable | Micro USB Data Cable | Sync Quick Fast Charging Cable | Cha...",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories
        image: "https://m.media-amazon.com/images/I/51N5+y633PL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Charging-vivo-Z1-Pro-Original/dp/B0BT9H8W41/ref=sr_1_7359?qid=1679128538&s=electronics&sr=1-7359",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 245.0,
        actual_price: 599.0,
    },
    {
        id: 105,
        name: "LUNAGARIYA Remote Cover Compatible with PANASONIC TV Remote Control",
        main_category: [1], // Electronics
        sub_category: [36], // Accessories
        image: "https://m.media-amazon.com/images/I/61dUYKQpFzL._AC_UL320_.jpg",
        link: "https://www.amazon.in/LUNAGARIYA-Remote-Compatible-PANASONIC-Control/dp/B0B45WKFF6/ref=sr_1_5818?qid=1679128448&s=electronics&sr=1-5818",
        ratings: 4.4,
        no_of_ratings: 8,
        discount_price: 0,
        actual_price: 249.0,
    },
    {
        id: 106,
        name: "Adore Stuff Bedding and Mosquito Net Set with Sleeping Bag Combo Pack for 0-6 Month Babies - Green Heart Color",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture (closest related)
        image: "https://m.media-amazon.com/images/I/81CibQQq-lL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Adore-Stuff-Bedding-Mosquito-Net/dp/B0BKVQDRDB/ref=sr_1_5709?qid=1679213176&s=kitchen&sr=1-5709",
        ratings: 4.6,
        no_of_ratings: 4,
        discount_price: 549.0,
        actual_price: 999.0,
    },
    {
        id: 107,
        name: "PILLOW KING Plain White Pillow- 68x43cm Pillow Set of 2",
        main_category: [3], // Home & Living
        sub_category: [1], // Furniture (closest related)
        image: "https://m.media-amazon.com/images/I/41bwaQNpUxL._AC_UL320_.jpg",
        link: "https://www.amazon.in/PILLOW-KING-Pillow-68x43cm-Pillow/dp/B0BXJJ8BCG/ref=sr_1_6125?qid=1679213186&s=kitchen&sr=1-6125",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 108,
        name: "Dizgoy Bathroom Shelf Shower Shelf Adhesive Shower Caddy for Shampoo Holder Kitchen Rack Wall Holder Box Storage Basket wi...",
        main_category: [3], // Home & Living
        sub_category: [50], // Cleaning Supplies (closest related)
        image: "https://m.media-amazon.com/images/I/51pEjj9BY0L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Dizgoy-Bathroom-Adhesive-Shampoo-Kitchen/dp/B09HMYB216/ref=sr_1_1094?qid=1679214132&s=kitchen&sr=1-1094",
        ratings: 4.5,
        no_of_ratings: 178,
        discount_price: 449.0,
        actual_price: 699.0,
    },
    {
        id: 109,
        name: "Dizgoy Bathroom Shelf Shower Shelf Adhesive Shower Caddy for Shampoo Holder Kitchen Rack Wall Holder Box Storage Basket wi...",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor (closest to Home Décor)
        image: "https://m.media-amazon.com/images/I/51pEjj9BY0L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Dizgoy-Bathroom-Adhesive-Shampoo-Kitchen/dp/B09HMYB216/ref=sr_1_1094?qid=1679214132&s=kitchen&sr=1-1094",
        ratings: 4.5,
        no_of_ratings: 178,
        discount_price: 449.0,
        actual_price: 699.0,
    },
    {
        id: 110,
        name: "SBD Safari ABS Plastic Health Faucet Gun with Flexible Stainless Steel Hose Tube and PVC Holder, Chrome Finished (Perfect ...",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor (or Home Improvement but we only have Decor related)
        image: "https://m.media-amazon.com/images/I/713Ys03gMDL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Safari-Health-Faucet-Stainless-Holder/dp/B074HF8M9G/ref=sr_1_1013?qid=1679214130&s=kitchen&sr=1-1013",
        ratings: 3.2,
        no_of_ratings: 6396,
        discount_price: 279.0,
        actual_price: 495.0,
    },
    {
        id: 111,
        name: "Plantex Acrylic Tooth Brush/Tumbler Holder/Stand for Bathroom Accessories - (White)",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor (closest to Home Storage)
        image: "https://m.media-amazon.com/images/I/71Dbi852mDL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Plantex-Acrylic-Tumbler-Bathroom-Accessories/dp/B09GP8TSRW/ref=sr_1_5366?qid=1679213865&s=kitchen&sr=1-5366",
        ratings: 3.2,
        no_of_ratings: 10,
        discount_price: 399.0,
        actual_price: 1099.0,
    },
    {
        id: 112,
        name: "Kuber Industries Storage Box|Toy Box Storage For Kids|Foldable Storage Box| Disney Cars Print (Red)",
        main_category: [3], // Home & Living
        sub_category: [3], // Decor (closest to Home Storage)
        image: "https://m.media-amazon.com/images/I/71ijFMDdjhL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kuber-Industries-Foldable-Wardrobe-Organiser/dp/B08DYTXTKP/ref=sr_1_1236?qid=1679213790&s=kitchen&sr=1-1236",
        ratings: 4.1,
        no_of_ratings: 402,
        discount_price: 255.55,
        actual_price: 299.0,
    },
    {
        id: 113,
        name: "01Super Shop large Homelite matchsticks long sticks large burn time for all purpose(Pack of 20)",
        main_category: [9], // Groceries
        sub_category: [50], // Cleaning Supplies (closest to Household Supplies)
        image: "https://m.media-amazon.com/images/I/41rdz6U0OcL._AC_UL320_.jpg",
        link: "https://www.amazon.in/01Super-Homelite-matchsticks-sticks-purpose/dp/B09BDHBXG8/ref=sr_1_3838?qid=1679215730&s=hpc&sr=1-3838",
        ratings: 4.0,
        no_of_ratings: 1,
        discount_price: 0,
        actual_price: 299.0,
    },
    {
        id: 114,
        name: "MAPPERZ Multi-Purpose Double-Sided Reusable Premium Microfiber Swedish Dish, Dust and Dirty Cleaning Cloth, Highly Absorbe...",
        main_category: [9], // Groceries
        sub_category: [50], // Cleaning Supplies (closest to Household Supplies)
        image: "https://m.media-amazon.com/images/I/61PM1mlUK1L._AC_UL320_.jpg",
        link: "https://www.amazon.in/MAPPERZ-Multi-Purpose-Double-Sided-Microfiber-Non-Abrasive/dp/B0BTW56DF4/ref=sr_1_8722?qid=1679215817&s=hpc&sr=1-8722",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 109.0,
        actual_price: 309.0,
    },
    {
        id: 115,
        name: "BrightLyt Black Double Wall Light / Two Shade Wall Lamp for Bedroom, Living Room-Glass",
        main_category: [3], // Home & Living
        sub_category: [46], // Lighting (Indoor Lighting is a bit specific, use general Lighting)
        image: "https://m.media-amazon.com/images/I/41Dz+tB-eQS._AC_UL320_.jpg",
        link: "https://www.amazon.in/BrightLyt-Double-Bedroom-Living-Kitchen/dp/B094Y9VDCN/ref=sr_1_4423?qid=1679214024&s=kitchen&sr=1-4423",
        ratings: 3.9,
        no_of_ratings: 88,
        discount_price: 1175.0,
        actual_price: 2000.0,
    },
    {
        id: 116,
        name: "SDMS 3Mode Long Beam Focus 300 WATT 8000 mAh Rechargeable Emergency Torch Light Night Lamp Torchlight Flaslight with Water...",
        main_category: [3], // Home & Living
        sub_category: [46], // Lighting
        image: "https://m.media-amazon.com/images/I/61GvvR58nmL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Rechargeable-Emergency-Torchlight-Flaslight-Waterproof/dp/B0991TXYCQ/ref=sr_1_6280?qid=1679214054&s=kitchen&sr=1-6280",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 2299.0,
        actual_price: 4999.0,
    },
    {
        id: 117,
        name: "YAGVIZ New Toilet Brush with Liquid Dispenser Wall Mounted Slim Holder Stand High Deep & Easy Cleaning with Non Slip Soft ...",
        main_category: [10], // Automotive & Tools
        sub_category: [50], // Cleaning Supplies
        image: "https://m.media-amazon.com/images/I/51Yg8DtiyEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/YAGVIZ-Dispenser-Cleaning-Bristles-Bathroom/dp/B0BBRJWQQZ/ref=sr_1_8562?qid=1679223425&s=industrial&sr=1-8562",
        ratings: 1.0,
        no_of_ratings: 2,
        discount_price: 425.0,
        actual_price: 899.0,
    },
    {
        id: 118,
        name: "Aquieen Brass Mixer Basin Tap, Rose Gold, Copper finish",
        main_category: [10], // Automotive & Tools
        sub_category: [20], // Hand Tools
        image: "https://m.media-amazon.com/images/I/51lJUTq990L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Aquieen-Single-Lever-Basin-Provision/dp/B07SSQFW1P/ref=sr_1_6066?qid=1679223390&s=industrial&sr=1-6066",
        ratings: 3.7,
        no_of_ratings: 7,
        discount_price: 5990.0,
        actual_price: 14999.0,
    },
    {
        id: 119,
        name: "Pepe Jeans Men's Regular Jeans",
        main_category: [2], // Fashion
        sub_category: [22], // Men
        image: "https://m.media-amazon.com/images/I/71Rd3gAVkKL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Pepe-Jeans-Mens-Pm206427g35_32-Blue/dp/B097RFZZ57/ref=sr_1_3243?qid=1679141793&s=apparel&sr=1-3243",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 1899.0,
        actual_price: 3799.0,
    },
    {
        id: 120,
        name: "Kingdom Fashion Latest Slit Knee Cut Stylish Men's Stretchable Jeans",
        main_category: [2], // Fashion
        sub_category: [22], // Men
        image: "https://m.media-amazon.com/images/I/51IZpbSmbmL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kingdom-Fashion-Latest-Stylish-Stretchable/dp/B0BQC38PDC/ref=sr_1_14703?qid=1679142303&s=apparel&sr=1-14703",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 679.0,
        actual_price: 1999.0,
    },
    {
        id: 121,
        name: "Taraash 999 Purity 20 Gram Goddess Ashtalakshmi Coin | Silver Coin | Coin For Gifting",
        main_category: [1], // Electronics (closest related category for accessories)
        sub_category: [30], // Accessories (under Electronics)
        image: "https://m.media-amazon.com/images/I/51eVOWmczvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Taraash-Purity-Goddess-Ashtalakshmi-Gifting/dp/B09JS4ZV8J/ref=sr_1_9356?qid=1679145464&s=jewelry&sr=1-9356",
        ratings: 4.1,
        no_of_ratings: 6,
        discount_price: 2205.0,
        actual_price: 3500.0,
    },
    {
        id: 122,
        name: "KUKSHYA JEWELLERS 925 Sterling Silver INFINITY Charm Thread Bracelet Nazariya Adjustable For Girls, Men, Boys And Women",
        main_category: [1], // Electronics (closest related category for accessories)
        sub_category: [30], // Accessories (under Electronics)
        image: "https://m.media-amazon.com/images/I/61uogCHITJL._AC_UL320_.jpg",
        link: "https://www.amazon.in/KUKSHYA-Adjustable-Comfortable-Traditiona-072/dp/B09D5PD2P9/ref=sr_1_349?qid=1679145163&s=jewelry&sr=1-349",
        ratings: 3.5,
        no_of_ratings: 67,
        discount_price: 389.0,
        actual_price: 999.0,
    },
    {
        id: 123,
        name: "CrazyInk Stylish & Trendy Girl's Plain Double Strap Crop Top",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/61psyIlAijL._AC_UL320_.jpg",
        link: "https://www.amazon.in/CrazyInk-Stylish-Trendy-Double-Maroon/dp/B0B2RX61FG/ref=sr_1_5617?qid=1679220489&s=apparel&sr=1-5617",
        ratings: 3.4,
        no_of_ratings: 31,
        discount_price: 249.0,
        actual_price: 999.0,
    },
    {
        id: 124,
        name: "IndiWeaves Boys Snowfall Solid Regular Fit Full Sleeves T-Shirts {Pack of 2}",
        main_category: [2], // Fashion
        sub_category: [22], // Men (closest fit for boys)
        image: "https://m.media-amazon.com/images/I/51rJVETq2OL._AC_UL320_.jpg",
        link: "https://www.amazon.in/IndiWeaves%EF%BF%BD-Snowfall-Regular-T-Shirts-Multicolor44/dp/B0BBFQJVFT/ref=sr_1_9114?qid=1679220528&s=apparel&sr=1-9114",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 714.0,
        actual_price: 769.0,
    },
    {
        id: 125,
        name: "Longies Girls Casual Shorts",
        main_category: [2], // Fashion
        sub_category: [23], // Women (closest fit for girls)
        image: "https://m.media-amazon.com/images/I/A1qbi0+kL3S._AC_UL320_.jpg",
        link: "https://www.amazon.in/Longies-Regular-Cotton-LGPSPO3V001_Dark-Green004_5-6yrs/dp/B08WX83QXR/ref=sr_1_3936?qid=1679221243&s=apparel&sr=1-3936",
        ratings: 3.7,
        no_of_ratings: 163,
        discount_price: 439.0,
        actual_price: 1299.0,
    },
    {
        id: 126,
        name: "Sunshades Keychain Holder Nose Reading Glasses +1.00 +1.50 +2.00 +2.50 +3.00 Reading Eyeglasses19",
        main_category: [2], // Fashion
        sub_category: [30], // Accessories (closest related)
        image: "https://m.media-amazon.com/images/I/31i7BzK8ifL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sunshades-Keychain-Reading-Glasses-Eyeglasses19/dp/B0BSNTHZ2T/ref=sr_1_10144?qid=1679221323&s=apparel&sr=1-10144",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 650.0,
        actual_price: 1250.0,
    },
    {
        id: 127,
        name: "SOLETHREADS DINO | Kids | Slipper | Flip Flops | Home | Outdoor | Comfortable | Soft | Cushion",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear (kids shoes fall here)
        image: "https://m.media-amazon.com/images/I/714xt3k-kYL._AC_UL320_.jpg",
        link: "https://www.amazon.in/SOLETHREADS-DINO-Slipper-Outdoor-Comfortable/dp/B0B9RW4WG3/ref=sr_1_2501?qid=1679220681&s=shoes&sr=1-2501",
        ratings: 3.0,
        no_of_ratings: 1,
        discount_price: 0,
        actual_price: 399.0,
    },
    {
        id: 128,
        name: "SportsYuva Nish Professional Shoes Roller Skates",
        main_category: [2], // Fashion
        sub_category: [24], // Footwear
        image: "https://m.media-amazon.com/images/I/61DpiA6JBBL._AC_UL320_.jpg",
        link: "https://www.amazon.in/SportsYuva-Professional-Shoes-Skate-Black/dp/B07H1JR29G/ref=sr_1_8185?qid=1679220735&s=shoes&sr=1-8185",
        ratings: 4.0,
        no_of_ratings: 17,
        discount_price: 2699.0,
        actual_price: 2999.0,
    },
    {
        id: 129,
        name: "AONES Pack of 3 Magnetic Loop Watch Strap Compatible for Amazfit Huami Gts A1914 Watch Strap Black, Gold, Silver",
        main_category: [2], // Fashion
        sub_category: [30], // Accessories (closest related)
        image: "https://m.media-amazon.com/images/I/71iRPoP4VFL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AONES-Magnetic-Compatible-Amazfit-Silver/dp/B0BWS8P4K9/ref=sr_1_6959?qid=1679221123&s=watches&sr=1-6959",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 999.0,
        actual_price: 1590.0,
    },
    {
        id: 130,
        name: "AONES Ocean Silicone Watch Strap Compatible for Huawei Watch Gt2 Pro Smart Watch Band",
        main_category: [2], // Fashion
        sub_category: [30], // Accessories
        image: "https://m.media-amazon.com/images/I/51WpI5zkOnL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AONES-Ocean-Silicone-Compatible-Huawei/dp/B0BSD8W78H/ref=sr_1_8800?qid=1679221142&s=watches&sr=1-8800",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 359.0,
        actual_price: 990.0,
    },
    {
        id: 131,
        name: "Sansui Digital Kitchen Scale with 7 Nutrition Modes & Food Weight Machine for Health, Fitness, Home Baking & Cooking, (10 ...",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials
        image: "https://m.media-amazon.com/images/I/51diXGPcaqL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sansui-Nutrition-Kitchen-Scale-White/dp/B07XNTZ5RP/ref=sr_1_9507?qid=1679212739&s=kitchen&sr=1-9507",
        ratings: 4.1,
        no_of_ratings: 132,
        discount_price: 1699.0,
        actual_price: 2999.0,
    },
    {
        id: 132,
        name: "Kuber Industries Stainless Steel JHara/Skimmer/Strainer Steel Frying Spoon/deep Fry for Kitchen (Silver)",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials
        image: "https://m.media-amazon.com/images/I/51AGhDZ2OkS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kuber-Industries-Stainless-Skimmer-Strainer/dp/B092DQ58BP/ref=sr_1_6434?qid=1679212691&s=kitchen&sr=1-6434",
        ratings: 3.9,
        no_of_ratings: 71,
        discount_price: 217.0,
        actual_price: 249.0,
    },
    {
        id: 133,
        name: "FreshDcart Heavy Duty Portable Hook Weighing Machine Digital Type Manual Weight M/c 10 Kg-50Kg Temp Scale for Home, Kitchen...",
        main_category: [3], // Home & Living (appliances can be considered part of home & living here)
        sub_category: [2], // Kitchen Essentials (closest fit)
        image: "https://m.media-amazon.com/images/I/515L2jdnxpL._AC_UL320_.jpg",
        link: "https://www.amazon.in/FreshDcart-Portable-Weighing-Machine-Traveling/dp/B07HHQXCNS/ref=sr_1_1325?qid=1679134545&s=kitchen&sr=1-1325",
        ratings: 3.8,
        no_of_ratings: 951,
        discount_price: 379.0,
        actual_price: 999.0,
    },
    {
        id: 134,
        name: "Air Philips 2000 Series HEPA +CARBON set ( FY 2422 + FY 2420 ) White & Black For Model AC2887 / AC 2882",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials (fits appliances here)
        image: "https://m.media-amazon.com/images/I/41JRbtuSFiS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Filter-Philips-NanoProtect-Air-Purifier/dp/B07L9DWWQC/ref=sr_1_9508?qid=1679135028&s=kitchen&sr=1-9508",
        ratings: 4.4,
        no_of_ratings: 139,
        discount_price: 4590.0,
        actual_price: 4990.0,
    },
    {
        id: 135,
        name: "Wolpin Plastic Hanger Towel Hanger/Holder for Bathroom Self Adhesive Towel Stand/Rack Bathroom Accessories Towel Bar (25.7...)",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials (closest fit; you could also consider Decor if desired)
        image: "https://m.media-amazon.com/images/I/71MYInTvD4L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Wolpin-Plastic-Bathroom-Adhesive-Accessories/dp/B09S1FNM1T/ref=sr_1_638?qid=1679212753&s=kitchen&sr=1-638",
        ratings: 3.8,
        no_of_ratings: 186,
        discount_price: 279.0,
        actual_price: 999.0,
    },
    {
        id: 136,
        name: "Amazon Brand - Solimo Curved Stainless Steel Water Bottle, Set of 3, 1 L Each",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials
        image: "https://m.media-amazon.com/images/I/81f6bUdxeIS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Amazon-Brand-Solimo-Stainless-Bottle/dp/B0929M5NJS/ref=sr_1_269?qid=1679212747&s=kitchen&sr=1-269",
        ratings: 4.0,
        no_of_ratings: 769,
        discount_price: 779.0,
        actual_price: 1099.0,
    },
    {
        id: 137,
        name: "YOKIVE 50 Pcs Silicone Rubber Stoppers, Tapered Plugs with High-Temperature Resistance | Protect Hole, Great for Lab Industrial Use",
        main_category: [10], // Automotive & Tools (closest for industrial supplies)
        sub_category: [20], // Hand Tools (closest for Lab & Scientific)
        image: "https://m.media-amazon.com/images/I/51Fp6DpXCEL._AC_UL320_.jpg",
        link: "https://www.amazon.in/YOKIVE-Silicone-Stoppers-High-Temperature-Resistance/dp/B0BGSBPY4C/ref=sr_1_9324?qid=1679223298&s=industrial&sr=1-9324",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2823.0,
        actual_price: 4039.0,
    },
    {
        id: 138,
        name: "LABOGENS BIURET REAGENT solution 125ML",
        main_category: [10], // Automotive & Tools (closest for industrial supplies)
        sub_category: [20], // Hand Tools (closest for Lab & Scientific)
        image: "https://m.media-amazon.com/images/I/51kpUPRgAyL._AC_UL320_.jpg",
        link: "https://www.amazon.in/LABOGENS-BIURET-REAGENT-solution-125ML/dp/B091GDK8L4/ref=sr_1_5588?qid=1679223244&s=industrial&sr=1-5588",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 139,
        name: "DECISIVE Fitness Casual Gym, Sports, V Neck Yoga Tshirt for Women & Girls",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/81n3Qy9wUZL._AC_UL320_.jpg",
        link: "https://www.amazon.in/DECISIVE-Fitness-V-Neck-T-Shirt-Red-Melange/dp/B097YNDBRC/ref=sr_1_18400?qid=1679155551&s=apparel&sr=1-18400",
        ratings: 4.2,
        no_of_ratings: 145,
        discount_price: 499.0,
        actual_price: 1099.0,
    },
    {
        id: 140,
        name: "Vigorous Body Slimmer Ladies Shapewear Women's Body Shape Slimmer Shapewear (Dark Beige)",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/61cqpShetmL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Vigorous-Womens-Shape-Slimmer-Shapewear/dp/B07MY6M457/ref=sr_1_9385?qid=1679155204&s=apparel&sr=1-9385",
        ratings: 3.3,
        no_of_ratings: 25,
        discount_price: 899.0,
        actual_price: 1360.0,
    },
    {
        id: 141,
        name: "Kama Ayurveda 3 Step Skincare Gift Box",
        main_category: [6], // Beauty & Personal Care
        sub_category: [7], // Skincare
        image: "https://m.media-amazon.com/images/I/612kwiJ-yRL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Kama-Ayurveda-Step-Skincare-Gift/dp/B08LHGSJJD/ref=sr_1_1351?qid=1679215117&s=luxury-beauty&sr=1-1351",
        ratings: 4.0,
        no_of_ratings: 20,
        discount_price: 0,
        actual_price: 1325.0,
    },
    {
        id: 142,
        name: "Mercedes-Benz Woman Eau De Toilette, 90ml",
        main_category: [6], // Beauty & Personal Care
        sub_category: [8], // Makeup (closest fit)
        image: "https://m.media-amazon.com/images/I/613XQww-UpL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Mercedes-Benz-Woman-Eau-Toilette-90ml/dp/B07D9GB5LD/ref=sr_1_3142?qid=1679215130&s=luxury-beauty&sr=1-3142",
        ratings: 4.3,
        no_of_ratings: 193,
        discount_price: 5775.0,
        actual_price: 7700.0,
    },
    {
        id: 143,
        name: "Comet Busters Long Multicolor Tilak Bindi (13mm) (BV1505)",
        main_category: [6], // Beauty & Personal Care
        sub_category: [8], // Makeup
        image: "https://m.media-amazon.com/images/I/41cUBrSgL8L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Comet-Busters-Multicolor-Tilak-BV1505/dp/B09XQW66RM/ref=sr_1_14630?qid=1679215294&s=beauty&sr=1-14630",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 249.0,
        actual_price: 499.0,
    },
    {
        id: 144,
        name: "FACES CANADA Ultime Pro Intense Gel Kajal With Smudger & Sharpener - Black, 1.2 g | 24 Hr Long Stay | Waterproof & Smudgeproof",
        main_category: [6], // Beauty & Personal Care
        sub_category: [8], // Makeup
        image: "https://m.media-amazon.com/images/I/71rXO0QFIYL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Faces-Ultime-Intense-Kajal-Sharpener/dp/B01M0WI4F6/ref=sr_1_81?qid=1679215166&s=beauty&sr=1-81",
        ratings: 4.1,
        no_of_ratings: 2895,
        discount_price: 363.0,
        actual_price: 549.0,
    },
    {
        id: 145,
        name: "Jewelswonder Certified Sulemani Hakik Stone/Original Sulemani Akik - Black (LAB CERTIFIED) 1 Piece For Unisex Adult",
        main_category: [2], // Fashion (closest for Men's Fashion)
        sub_category: [22], // Men
        image: "https://m.media-amazon.com/images/I/41SdpPJ7IuL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jewelswonder-Certified-Sulemani-Hakik-Original/dp/B08WL3DFB2/ref=sr_1_3243?qid=1679150821&s=apparel&sr=1-3243",
        ratings: 3.8,
        no_of_ratings: 17,
        discount_price: 199.0,
        actual_price: 699.0,
    },
    {
        id: 146,
        name: "ONE8 by Virat Kohli Premium Leather Accessories Men Gift Combo | Perfect Valentine's Day Gift | Leather Belt | Leather Wallet",
        main_category: [2], // Fashion
        sub_category: [22], // Men
        image: "https://m.media-amazon.com/images/I/71GJU6w1V4L._AC_UL320_.jpg",
        link: "https://www.amazon.in/ONE8-Premium-Leather-Accessories-Valentines/dp/B0BV772217/ref=sr_1_9464?qid=1679151117&s=apparel&sr=1-9464",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 3149.0,
        actual_price: 3499.0,
    },
    {
        id: 147,
        name: "Horseyaart Waterproof Dustproof UV Protection Two Wheeler Scooter Body Cover with Mirror for TVS Jupiter - Gray",
        main_category: [10], // Automotive & Tools (Car & Motorbike)
        sub_category: [19], // Car Accessories (closest for Motorbike Accessories & Parts)
        image: "https://m.media-amazon.com/images/I/51G8LbsSJCL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Horseyaart-Jupiter-Waterproof-Dustproof-Protection/dp/B09JGGS3LT/ref=sr_1_6278?qid=1679221798&s=automotive&sr=1-6278",
        ratings: 4.7,
        no_of_ratings: 7,
        discount_price: 485.0,
        actual_price: 1400.0,
    },
    {
        id: 148,
        name: "Cover Lab - TVS Wego New BS6 Water Resistant - Dust Proof - Full Bike Scooty Two Wheeler Body Cover for TVS Wego (Maroon)",
        main_category: [10], // Automotive & Tools
        sub_category: [19], // Car Accessories
        image: "https://m.media-amazon.com/images/I/61IjvkKqehL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Cover-Lab-Resistant-Scooty-Wheeler/dp/B08WBYR42X/ref=sr_1_3293?qid=1679221731&s=automotive&sr=1-3293",
        ratings: 3.7,
        no_of_ratings: 46,
        discount_price: 369.0,
        actual_price: 499.0,
    },
    {
        id: 149,
        name: "Digimore Heavy Duty Microphone Stand with Mobile Holder, for Singing Voice Recording Adjustable Mic Stand Studio Floor Type",
        main_category: [12], // Music & Instruments
        sub_category: [35], // Audio Equipment (closest to Musical Instruments & Professional Audio)
        image: "https://m.media-amazon.com/images/I/41ybEw+rDWL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Digimore-Microphone-Recording-Adjustable-Broadcast/dp/B09XVCVVDV/ref=sr_1_5973?qid=1679225495&s=musical-instruments&sr=1-5973",
        ratings: 4.1,
        no_of_ratings: 11,
        discount_price: 1234.0,
        actual_price: 2999.0,
    },
    {
        id: 150,
        name: "JUAREZ Arpeggio Guitar JRA41MAH, mahogany",
        main_category: [12], // Music & Instruments
        sub_category: [34], // Instruments
        image: "https://m.media-amazon.com/images/I/716TvRBgieL._AC_UL320_.jpg",
        link: "https://www.amazon.in/JUAREZ-Arpeggio-Guitar-JRA41MAH-mahogany/dp/B08MWBBYL1/ref=sr_1_7332?qid=1679225521&s=musical-instruments&sr=1-7332",
        ratings: 4.3,
        no_of_ratings: 4,
        discount_price: 6600.0,
        actual_price: 9990.0,
    },
    {
        id: 151,
        name: "Luvlap Hippo Sipper / Sippy Cup 225ml, Anti-Spill Design with Soft Silicone Spout, 6m+ (Green) Tiny Giffy Sipper / Sippy Cup",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials (closest to Nursing & Feeding)
        image: "https://m.media-amazon.com/images/I/51kK5H+QSXL._AC_UL320_.jpg",
        link: "https://www.amazon.in/LuvLap-Sipper-Anti-Spill-Design-Silicone/dp/B08KTMD1Z3/ref=sr_1_1821?qid=1679220273&s=baby&sr=1-1821",
        ratings: 4.2,
        no_of_ratings: 15,
        discount_price: 398.0,
        actual_price: 524.0,
    },
    {
        id: 152,
        name: "ezpz Mini Cup - 100% Silicone Training Cup for Toddlers (Indigo)",
        main_category: [8], // Toys & Baby Products
        sub_category: [14], // Newborn Essentials
        image: "https://m.media-amazon.com/images/I/3108oIFQcYL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Ezpz-FDA-Mini-Cup-Indigo/dp/B0991K4LHD/ref=sr_1_6929?qid=1679220372&s=baby&sr=1-6929",
        ratings: 4.7,
        no_of_ratings: 665,
        discount_price: 1079.1,
        actual_price: 1199.0,
    },
    {
        id: 153,
        name: "SWASTIIK Enterprise One Step Hair Dryer and Volumizer, Hot Air Brush, 3 in1 Styling Brush Style, Negative Ion Hair Straightener",
        main_category: [6], // Beauty & Personal Care
        sub_category: [9], // Hair Care (closest to Personal Care Appliances)
        image: "https://m.media-amazon.com/images/I/41zoYliJriL._AC_UL320_.jpg",
        link: "https://www.amazon.in/One-Step-Hair-Dryer-Straightener/dp/B0BX2TDH94/ref=sr_1_5198?qid=1679215918&s=hpc&sr=1-5198",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 1499.0,
        actual_price: 1999.0,
    },
    {
        id: 154,
        name: "PRABODH Hair Straightener Brush, 2-in-1 Hair Straightening Brush for Women with 5 Temp & Fast Heating, Negative Ion Hair Straightener",
        main_category: [6], // Beauty & Personal Care
        sub_category: [9], // Hair Care
        image: "https://m.media-amazon.com/images/I/314hbDtEYWL._AC_UL320_.jpg",
        link: "https://www.amazon.in/PRABODH-Straightener-Straightening-Negative-Multicolored/dp/B0BSFQF2H3/ref=sr_1_6408?qid=1679215941&s=hpc&sr=1-6408",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 499.0,
        actual_price: 899.0,
    },
    {
        id: 155,
        name: "Mini Fridge Compact Fridge Cooling Super-Versatile Material: ABS Skincare for Drinks Breast Milk Snacks(Pink)",
        main_category: [3], // Home & Living (could be Appliances, but we map to Home & Living)
        sub_category: [2], // Kitchen Essentials (closest fit for Refrigerators)
        image: "https://m.media-amazon.com/images/I/51oyY-yqUpL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Fridge-Compact-Cooling-Super-Versatile-Material/dp/B09K37YBNH/ref=sr_1_2086?qid=1679134383&s=kitchen&sr=1-2086",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 14839.0,
        actual_price: 29697.0,
    },
    {
        id: 156,
        name: "Decdeal 6L Mini Fridge Freezer Cooler and Warmer Portable Compact Car Refrigerator Quick Refrigeration Home Picnic Icebox",
        main_category: [3], // Home & Living
        sub_category: [2], // Kitchen Essentials
        image: "https://m.media-amazon.com/images/I/61dNz+Bnx1L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Decdeal-Freezer-Portable-Refrigerator-Refrigeration/dp/B09L4M9XBN/ref=sr_1_2077?qid=1679134383&s=kitchen&sr=1-2077",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 7289.0,
        actual_price: 14597.0,
    },
    {
        id: 157,
        name: "(Renewed) IMPACT BY HONEYWELL 5MP high Resolution Bullet CCTV Camera I AHD 4 in 1 Outdoor Camera I 3.6MM Lens Up to 20M IR...",
        main_category: [3], // Home & Living (home, kitchen, pets)
        sub_category: [5], // Refurbished & Open Box
        image: "https://m.media-amazon.com/images/I/41hmV5i8iaL._AC_UL320_.jpg",
        link: "https://www.amazon.in/IMPACT-HONEYWELL-Resolution-Housing-White-I-HABC-5005PI/dp/B0B7DZG67J/ref=sr_1_201?qid=1679214940&s=kitchen&sr=1-201",
        ratings: 3.0,
        no_of_ratings: 2,
        discount_price: 2328.0,
        actual_price: 2799.0,
    },
    {
        id: 158,
        name: "USHA (Renewed) Bloom Daffodil Goodbye Dust Ceiling Fan 1250mm, Sparkle Red and Black",
        main_category: [3], // Home & Living
        sub_category: [5], // Refurbished & Open Box
        image: "https://m.media-amazon.com/images/I/21P1B2g2asL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Renewed-Usha-Bloom-Daffodil-Goodbye/dp/B07ZS4BWTQ/ref=sr_1_209?qid=1679214940&s=kitchen&sr=1-209",
        ratings: 3.4,
        no_of_ratings: 3,
        discount_price: 3273.0,
        actual_price: 3636.0,
    },
    {
        id: 159,
        name: "WorldCare® Fishing 18cm 23.8g Hard Wobrs Crank Eyes Artificial Trout Pike Carp Fishing Accessories WW9 : G",
        main_category: [11], // Bags & Luggage
        sub_category: [24], // Rucksacks
        image: "https://m.media-amazon.com/images/I/31Gp4t-EabL._AC_UL320_.jpg",
        link: "https://www.amazon.in/WorldCare%C2%AE-Fishing-23-8g-Artificial-Accessories/dp/B09MSC41L7/ref=sr_1_17994?qid=1679218875&s=luggage&sr=1-17994",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 917.0,
        actual_price: 1999.0,
    },
    {
        id: 160,
        name: "WorldCare® Fishing Rocker, For Banax Wheel, Durable Aluminum Alloy, Double Holes Fishing Reel- Parent : Blue",
        main_category: [11], // Bags & Luggage
        sub_category: [24], // Rucksacks
        image: "https://m.media-amazon.com/images/I/31qZ7gO5fjL._AC_UL320_.jpg",
        link: "https://www.amazon.in/WorldCare%C2%AE-Fishing-Rocker-Durable-Aluminum/dp/B09NY1SGS5/ref=sr_1_9783?qid=1679218801&s=luggage&sr=1-9783",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 5279.0,
        actual_price: 10558.0,
    },
    {
        id: 161,
        name: "Leonyvie Padded Velvet Headband for Teens (Black Thin)",
        main_category: [9], // Sports & Fitness
        sub_category: [26], // Running
        image: "https://m.media-amazon.com/images/I/61tiwLM3ORL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Padded-Velvet-Headband-Black-Thin/dp/B09L6J5BLK/ref=sr_1_7322?qid=1679217468&s=sports&sr=1-7322",
        ratings: 4.7,
        no_of_ratings: 16,
        discount_price: 279.0,
        actual_price: 429.0,
    },
    {
        id: 162,
        name: "ALISHAH Girl's Loose Fit Joggers",
        main_category: [9], // Sports & Fitness
        sub_category: [26], // Running
        image: "https://m.media-amazon.com/images/I/51o6aNUUJzL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ALISHAH-Womens-Comfort-Cotton-Trousers/dp/B08RNMJ3P5/ref=sr_1_5490?qid=1679217441&s=sports&sr=1-5490",
        ratings: 3.8,
        no_of_ratings: 127,
        discount_price: 489.0,
        actual_price: 1199.0,
    },
    {
        id: 163,
        name: "4Monster Hiking Daypack,Water Resistant Lightweight Packable Backpack for Travel Camping Outdoor",
        main_category: [7], // Kids' Fashion
        sub_category: [29], // School Bags
        image: "https://m.media-amazon.com/images/I/61x5-JRv4zL._AC_UL320_.jpg",
        link: "https://www.amazon.in/4Monster-Resistant-Lightweight-Packable-Backpack/dp/B07D373JGV/ref=sr_1_4077?qid=1679220895&s=luggage&sr=1-4077",
        ratings: 4.5,
        no_of_ratings: 618,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 164,
        name: "NuGran 28 litres Sleek Backpack Bags - (Graze, Grey)",
        main_category: [7], // Kids' Fashion
        sub_category: [29], // School Bags
        image: "https://m.media-amazon.com/images/I/91AzEd7NtOL._AC_UL320_.jpg",
        link: "https://www.amazon.in/NuGran-litres-Sleek-Backpack-Bags/dp/B08PYGFRTB/ref=sr_1_17443?qid=1679221025&s=luggage&sr=1-17443",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 895.0,
    },
    {
        id: 165,
        name: "EVteQ 2MP 20m Smart Dual-Light Built-in Mic Dome Camera (DS-2CE16D0T-LPFS)",
        main_category: [4], // TV, Audio & Cameras
        sub_category: [33], // Security Cameras
        image: "https://m.media-amazon.com/images/I/41SLTtGeTFL._AC_UL320_.jpg",
        link: "https://www.amazon.in/EVteQ-Dual-Light-Built-Camera-DS-2CE16D0T-LPFS/dp/B0BS3YBGDT/ref=sr_1_7383?qid=1679132421&s=electronics&sr=1-7383",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2099.0,
        actual_price: 5999.0,
    },
    {
        id: 166,
        name: "TECHNOVIEW 4k HD Police WiFi Body Camera with Free 64GB Memory Card, Body Worn Camera,Premium Portable Body Pocket Camera ...",
        main_category: [4], // TV, Audio & Cameras
        sub_category: [33], // Security Cameras
        image: "https://m.media-amazon.com/images/I/5143T2wT4JL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Technoview-Portable-Recording-Wearable-Detection/dp/B09YDD9PRD/ref=sr_1_1390?qid=1679132041&s=electronics&sr=1-1390",
        ratings: 3.5,
        no_of_ratings: 13,
        discount_price: 5999.0,
        actual_price: 8999.0,
    },
    {
        id: 167,
        name: "Doms Non-Toxic Dustless Coloured Chalk (Pack of 10 x 1 Set)",
        main_category: [3], // Home & Living
        sub_category: [13], // Sewing & Craft Supplies
        image: "https://m.media-amazon.com/images/I/61FgPybrd+S._AC_UL320_.jpg",
        link: "https://www.amazon.in/Doms-Non-Toxic-Dustless-Coloured-Multicolor/dp/B095HBN5TV/ref=sr_1_1961?qid=1679214305&s=kitchen&sr=1-1961",
        ratings: 4.1,
        no_of_ratings: 102,
        discount_price: 0,
        actual_price: 250.0,
    },
    {
        id: 168,
        name: "Jiyan Art Handmade Personalized Greeting Card Add Your Own Photo & Message (Anniversary)",
        main_category: [3], // Home & Living
        sub_category: [13], // Sewing & Craft Supplies
        image: "https://m.media-amazon.com/images/I/71p99+7VXFL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Jiyan-Art-Handmade-Personalized-Anniversary/dp/B07N837M8P/ref=sr_1_7303?qid=1679214402&s=kitchen&sr=1-7303",
        ratings: 4.1,
        no_of_ratings: 31,
        discount_price: 899.0,
        actual_price: 1699.0,
    },
    {
        id: 169,
        name: "KETCH Men Shirt",
        main_category: [2], // Fashion / Men's Clothing
        sub_category: [22], // Men / Shirts
        image: "https://m.media-amazon.com/images/I/71vNScJ09sL._AC_UL320_.jpg",
        link: "https://www.amazon.in/KETCH-Letter-Print-Straight-KHSH000725_Blue/dp/B0B518ZLMS/ref=sr_1_3243?qid=1679140907&s=apparel&sr=1-3243",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 489.0,
        actual_price: 1399.0,
    },
    {
        id: 170,
        name: "JAINISH Men's Smart Regular Fit Solid Formal Shirt",
        main_category: [2], // Fashion
        sub_category: [22], // Men / Shirts
        image: "https://m.media-amazon.com/images/I/61zHNQ7U9EL._AC_UL320_.jpg",
        link: "https://www.amazon.in/JAINISH-Smart-Regular-Formal-Yellow/dp/B08RJP93MP/ref=sr_1_9464?qid=1679141195&s=apparel&sr=1-9464",
        ratings: 3.0,
        no_of_ratings: 3,
        discount_price: 590.0,
        actual_price: 1499.0,
    },
    {
        id: 171,
        name: "Mochi Women Leather Ankle Boot",
        main_category: [6], // Women's Shoes
        sub_category: [20], // Shoes
        image: "https://m.media-amazon.com/images/I/71KfqZ8+vyL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Mochi-Women-Olive-Leather-Ankle/dp/B0BQ3VH8Q9/ref=sr_1_16728?qid=1679211636&s=shoes&sr=1-16728",
        ratings: 4.0,
        no_of_ratings: 1,
        discount_price: 2793.0,
        actual_price: 3990.0,
    },
    {
        id: 172,
        name: "KARYJERRY Stylish Wedges for Women's",
        main_category: [6],
        sub_category: [20],
        image: "https://m.media-amazon.com/images/I/61Z6FBGAd6L._AC_UL320_.jpg",
        link: "https://www.amazon.in/KaryJerry-Partywear-Stylish-Selling-Wedges/dp/B06Y55HBZC/ref=sr_1_14565?qid=1679211616&s=shoes&sr=1-14565",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 449.0,
        actual_price: 999.0,
    },
    {
        id: 173,
        name: "Nutty Gritties Premium California Roasted Pistachios 400g | Pista Lightly Salted, Dry Roasted, Non Fried, Zero Oil, Crunch...",
        main_category: [8], // Grocery & Gourmet Foods
        sub_category: [16], // Snack Foods
        image: "https://m.media-amazon.com/images/I/61YYLOeO3YL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Nutty-Gritties-Roasted-Pistachios-Lightly/dp/B07PSJVGYV/ref=sr_1_2541?qid=1679216544&s=grocery&sr=1-2541",
        ratings: 4.0,
        no_of_ratings: 974,
        discount_price: 679.0,
        actual_price: 930.0,
    },
    {
        id: 174,
        name: "Disco Food Products Roasted Chat pati Tasty SOYA katori || Katori Masala Snack || Hot Chips (200 gm Pack of 1)",
        main_category: [8],
        sub_category: [16],
        image: "https://m.media-amazon.com/images/I/612LHKlMJQL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Products-Roasted-katori-Katori-Masala/dp/B0BLHP2J9R/ref=sr_1_7745?qid=1679216635&s=grocery&sr=1-7745",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 229.0,
        actual_price: 399.0,
    },
    {
        id: 175,
        name: "Shopnet Wireless Bluetooth Speaker TG113 For Oppo Reno2 F Ultra Boost Bass with DJ Sound Portable Home Speaker with Audio ...",
        main_category: [4], // TV, Audio & Cameras
        sub_category: [30], // Speakers
        image: "https://m.media-amazon.com/images/I/51uEPldT42L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Shopnet-Bluetooth-Oppo-Reno2-Waterproof/dp/B0BY8RZH3R/ref=sr_1_9508?qid=1679129890&s=electronics&sr=1-9508",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 999.0,
        actual_price: 1599.0,
    },
    {
        id: 176,
        name: "Shopnet Wireless Bluetooth Speaker TG113 For Realme 6 Pro Ultra Boost Bass with DJ Sound Portable Home Speaker with Audio ...",
        main_category: [4],
        sub_category: [30],
        image: "https://m.media-amazon.com/images/I/51uEPldT42L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Shopnet-Bluetooth-Realme-Pro-Waterproof/dp/B0BY8TH28X/ref=sr_1_7229?qid=1679129742&s=electronics&sr=1-7229",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 999.0,
        actual_price: 1599.0,
    },
    {
        id: 177,
        name: "Campus Men's LESTOR Running Shoes",
        main_category: [5], // Men's Shoes
        sub_category: [21], // Sports Shoes
        image: "https://m.media-amazon.com/images/I/71iSU7aorbL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-LESTOR-R-Slate-Running-Shoes/dp/B09Y9B6LP2/ref=sr_1_3243?qid=1679147302&s=shoes&sr=1-3243",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 1099.0,
        actual_price: 1599.0,
    },
    {
        id: 178,
        name: "Campus Men's Steve Running Shoes",
        main_category: [5],
        sub_category: [21],
        image: "https://m.media-amazon.com/images/I/41+vLE8tU-L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-Bt-Grn-Running-Shoes-9-5G-580/dp/B07ZQC2NLZ/ref=sr_1_9464?qid=1679147526&s=shoes&sr=1-9464",
        ratings: 3.5,
        no_of_ratings: 12,
        discount_price: 1329.0,
        actual_price: 1899.0,
    },
    {
        id: 179,
        name: "Fila Men's Memory Sportland Running Shoe",
        main_category: [10], // Stores
        sub_category: [32], // Sportswear
        image: "https://m.media-amazon.com/images/I/61SpTn95k9L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Fila-Memory-Sportland-Metallic-Silver/dp/B01015PBPW/ref=sr_1_6628?qid=1679149556&s=apparel&sr=1-6628",
        ratings: 4.4,
        no_of_ratings: 1521,
        discount_price: 0,
        actual_price: 8097.39,
    },
    {
        id: 180,
        name: "Campus Men's SUPRIMO Running Shoes",
        main_category: [10],
        sub_category: [32],
        image: "https://m.media-amazon.com/images/I/61glTX9lP3L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-SUPRIMO-BLK-RED-Running-Shoes/dp/B084SYBJ4L/ref=sr_1_1929?qid=1679149389&s=apparel&sr=1-1929",
        ratings: 4.0,
        no_of_ratings: 51,
        discount_price: 1384.0,
        actual_price: 1899.0,
    },
    {
        id: 181,
        name: "Bodylastics Resistance Tube with Adjustable Length, Non-Slip Handles, High Density Door Anchor for Strength Training",
        main_category: [9],
        sub_category: [28], // Strength Training
        image: "https://m.media-amazon.com/images/I/81I1m4LJuyL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Bodylastics-Resistance-Adjustable-Non-Slip-Strength/dp/B07WZJR9FQ/ref=sr_1_3094?qid=1679218053&s=sports&sr=1-3094",
        ratings: 4.1,
        no_of_ratings: 887,
        discount_price: 324.0,
        actual_price: 999.0,
    },
    {
        id: 182,
        name: "AJB Resistance Exercise Bands with Door Anchor, Handles, Waterproof Carry Bag, Legs Ankle Straps for Resistance Training, ...",
        main_category: [9],
        sub_category: [28],
        image: "https://m.media-amazon.com/images/I/61xz+W6Q7oL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AJB-Resistance-Exercise-Waterproof-Training/dp/B09BJG5CDT/ref=sr_1_9418?qid=1679218158&s=sports&sr=1-9418",
        ratings: 2.5,
        no_of_ratings: 3,
        discount_price: 499.0,
        actual_price: 999.0,
    },
    {
        id: 183,
        name: "Sturdy 5-Inch Baby Seat Strap Environmentally Stroller Safty Belt for Baby Chairs Strollers",
        main_category: [12], // Toys & Baby Products
        sub_category: [31], // Strollers & Prams
        image: "https://m.media-amazon.com/images/I/61GCCdFXqVL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sturdy-5-Inch-Environmentally-Stroller-Strollers/dp/B0922X8HDS/ref=sr_1_5009?qid=1679220207&s=baby&sr=1-5009",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 184,
        name: "Thule Summer Seat Liner",
        main_category: [12], // Toys & Baby Products
        sub_category: [31], // Strollers & Prams
        image: "https://m.media-amazon.com/images/I/81jXkGkmmAS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Thule-Summer-Seat-Liner-Gray/dp/B09222V12W/ref=sr_1_5014?qid=1679220207&s=baby&sr=1-5014",
        ratings: 2.8,
        no_of_ratings: 2,
        discount_price: 0,
        actual_price: 9250.0,
    },
    {
        id: 185,
        name: "VIP Polyester Soft 26.5 inch SUITCASE(INVALID DATA_Blue)",
        main_category: [7], // Bags & Luggage
        sub_category: [25], // Suitcases & Trolley Bags
        image: "https://m.media-amazon.com/images/I/71lz7mFnOvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Suknya-Polyester-Aristocrat-Strolly-Luggage/dp/B07QJBWLWW/ref=sr_1_1615?qid=1679218899&s=luggage&sr=1-1615",
        ratings: 5.0,
        no_of_ratings: 6,
        discount_price: 4498.0,
        actual_price: 11900.0,
    },
    {
        id: 186,
        name: "AWOKZA Trolley Home Folding Portable Ultra Light Multi-Function Mute 4-Wheel Trolley Car Shopping Cart Luggage Cart Truck ...",
        main_category: [7],
        sub_category: [25],
        image: "https://m.media-amazon.com/images/I/31KeH-GksPL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AWOKZA-Portable-Multi-Function-Shopping-Stainless/dp/B0BC961HL4/ref=sr_1_5123?qid=1679218934&s=luggage&sr=1-5123",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 1999.0,
        actual_price: 3999.0,
    },
    {
        id: 187,
        name: "INVU Polarized Round Women's Sunglasses - (T2701A|52|GREY Color Lens)",
        main_category: [3], // Accessories
        sub_category: [22], // Sunglasses
        image: "https://m.media-amazon.com/images/I/61vz4kujooL._AC_UL320_.jpg",
        link: "https://www.amazon.in/INVU-Polarized-Round-Womens-Sunglasses/dp/B077Y4WYTZ/ref=sr_1_10438?qid=1679211459&s=apparel&sr=1-10438",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2959.0,
        actual_price: 3540.0,
    },
    {
        id: 188,
        name: "Our Brand Pack of 4 Pure Cotton Socks for Men and Women Comfortable and Durable Unisex Design with Reinforced Toes and Hee...",
        main_category: [3],
        sub_category: [24], // Socks (correcting subcategory instead of Sunglasses)
        image: "https://m.media-amazon.com/images/I/61dDKmrr9YL._AC_UL320_.jpg",
        link: "https://www.amazon.in/dp/B0BYVXRNHG/ref=sr_1_2857?qid=1679211397&s=apparel&sr=1-2857",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 189,
        name: "Caseria Men's Round Neck Cotton Half Sleeved T-Shirt with Printed Graphics - Be Communist",
        main_category: [11], // Men's Clothing
        sub_category: [27], // T-shirts & Polos
        image: "https://m.media-amazon.com/images/I/61TfAdMX4VL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Caseria-Cotton-Graphic-Printed-T-Shirt/dp/B07JF6SBTB/ref=sr_1_18400?qid=1679140720&s=apparel&sr=1-18400",
        ratings: 4.8,
        no_of_ratings: 9,
        discount_price: 439.0,
        actual_price: 999.0,
    },
    {
        id: 190,
        name: "SLOTH CLOTH Neon Genesis - Rei-Ayanami",
        main_category: [11],
        sub_category: [27],
        image: "https://m.media-amazon.com/images/I/71cP5VJ60UL._AC_UL320_.jpg",
        link: "https://www.amazon.in/SLOTH-CLOTH-Cotton-T-Shirt-Genesis/dp/B09VYW4TST/ref=sr_1_4523?qid=1679140071&s=apparel&sr=1-4523",
        ratings: 4.0,
        no_of_ratings: 1,
        discount_price: 469.0,
        actual_price: 1299.0,
    },
    {
        id: 191,
        name: "Samsung 138 cm (55 inches) 4K Ultra HD Smart NEO QLED TV QA55QN90BAKLXL (Titan Black)",
        main_category: [4], // TV, Audio & Cameras
        sub_category: [29], // Televisions
        image: "https://m.media-amazon.com/images/I/91zlCIStMeL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Samsung-inches-Ultra-Smart-QA55QN90BAKLXL/dp/B09Y65KCMN/ref=sr_1_316?qid=1679128075&s=electronics&sr=1-316",
        ratings: 4.0,
        no_of_ratings: 18,
        discount_price: 144990.0,
        actual_price: 219900.0,
    },
    {
        id: 193,
        name: 'VIGITAL- TEMPRATUER SENSOR RTD PT-100, OD 6mm PT-100, Length 4" (100mm) (1 METER WIRE)',
        main_category: [13], // Industrial Supplies
        sub_category: [33], // Test, Measure & Inspect
        image: "https://m.media-amazon.com/images/I/61edDSIevQL._AC_UL320_.jpg",
        link: "https://www.amazon.in/VIGITAL-TEMPRATUER-SENSOR-PT-100-Length/dp/B0BMVSSN3N/ref=sr_1_889?qid=1679222965&s=industrial&sr=1-889",
        ratings: 5.0,
        no_of_ratings: 1,
        discount_price: 400.0,
        actual_price: 580.0,
    },
    {
        id: 194,
        name: "Ekavir New Universal Digital Multimeter Test Lead Probe 1 Pcs Set Wire",
        main_category: [13],
        sub_category: [33],
        image: "https://m.media-amazon.com/images/I/7179DdllLvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Ekavir-Universal-Digital-Multimeter-Probe/dp/B07MKHGH4C/ref=sr_1_3366?qid=1679223011&s=industrial&sr=1-3366",
        ratings: 3.8,
        no_of_ratings: 55,
        discount_price: 199.0,
        actual_price: 399.0,
    },
    {
        id: 195,
        name: "Aastha Jain Green Sterling Silver (18K Gold Polish) Earring For Women",
        main_category: [10], // Stores
        sub_category: [34], // The Designer Boutique
        image: "https://m.media-amazon.com/images/I/81mgOPkI6-L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Aastha-Jain-Sterling-Silver-Earring/dp/B01IJWJANS/ref=sr_1_5548?qid=1679212009&s=apparel&sr=1-5548",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2636.0,
        actual_price: 2700.0,
    },
    {
        id: 196,
        name: "ALCiS Men's Track Jacket",
        main_category: [10],
        sub_category: [34],
        image: "https://m.media-amazon.com/images/I/71DyVUAuKHL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ALCiS-Mens-Track-Jacket-ECMJKT00255-M_Black_M/dp/B07H8SLJHB/ref=sr_1_6974?qid=1679212026&s=apparel&sr=1-6974",
        ratings: 3.6,
        no_of_ratings: 20,
        discount_price: 1014.0,
        actual_price: 2899.0,
    },
    {
        id: 197,
        name: "Caseria Men's Round Neck Cotton Half Sleeved T-Shirt with Printed Graphics - Be Communist",
        main_category: [2],
        sub_category: [22],
        image: "https://m.media-amazon.com/images/I/61TfAdMX4VL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Caseria-Cotton-Graphic-Printed-T-Shirt/dp/B07JF6SBTB/ref=sr_1_18400?qid=1679140720&s=apparel&sr=1-18400",
        ratings: "4.8",
        no_of_ratings: "9",
        discount_price: 439.0,
        actual_price: 999.0,
    },
    {
        id: 198,
        name: "SLOTH CLOTH Neon Genesis - Rei-Ayanami",
        main_category: [2],
        sub_category: [22],
        image: "https://m.media-amazon.com/images/I/71cP5VJ60UL._AC_UL320_.jpg",
        link: "https://www.amazon.in/SLOTH-CLOTH-Cotton-T-Shirt-Genesis/dp/B09VYW4TST/ref=sr_1_4523?qid=1679140071&s=apparel&sr=1-4523",
        ratings: "4.0",
        no_of_ratings: "1",
        discount_price: 469.0,
        actual_price: 1299.0,
    },
    {
        id: 199,
        name: "Samsung 138 cm (55 inches) 4K Ultra HD Smart NEO QLED TV QA55QN90BAKLXL (Titan Black)",
        main_category: [1],
        sub_category: [59],
        image: "https://m.media-amazon.com/images/I/91zlCIStMeL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Samsung-inches-Ultra-Smart-QA55QN90BAKLXL/dp/B09Y65KCMN/ref=sr_1_316?qid=1679128075&s=electronics&sr=1-316",
        ratings: "4.0",
        no_of_ratings: "18",
        discount_price: 144990.0,
        actual_price: 219900.0,
    },
    {
        id: 201,
        name: 'VIGITAL- TEMPRATUER SENSOR RTD PT-100, OD 6mm PT-100, Length 4" (100mm) (1 METER WIRE)',
        main_category: [10],
        sub_category: [51],
        image: "https://m.media-amazon.com/images/I/61edDSIevQL._AC_UL320_.jpg",
        link: "https://www.amazon.in/VIGITAL-TEMPRATUER-SENSOR-PT-100-Length/dp/B0BMVSSN3N/ref=sr_1_889?qid=1679222965&s=industrial&sr=1-889",
        ratings: "5.0",
        no_of_ratings: "1",
        discount_price: 400.0,
        actual_price: 580.0,
    },
    {
        id: 202,
        name: "Ekavir New Universal Digital Multimeter Test Lead Probe 1 Pcs Set Wire",
        main_category: [10],
        sub_category: [51],
        image: "https://m.media-amazon.com/images/I/7179DdllLvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Ekavir-Universal-Digital-Multimeter-Probe/dp/B07MKHGH4C/ref=sr_1_3366?qid=1679223011&s=industrial&sr=1-3366",
        ratings: "3.8",
        no_of_ratings: "55",
        discount_price: 199.0,
        actual_price: 399.0,
    },
    {
        id: 203,
        name: "Aastha Jain Green Sterling Silver (18K Gold Polish) Earring For Women",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/81mgOPkI6-L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Aastha-Jain-Sterling-Silver-Earring/dp/B01IJWJANS/ref=sr_1_5548?qid=1679212009&s=apparel&sr=1-5548",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2636.0,
        actual_price: 2700.0,
    },
    {
        id: 204,
        name: "ALCiS Men's Track Jacket",
        main_category: [2],
        sub_category: [22],
        image: "https://m.media-amazon.com/images/I/71DyVUAuKHL._AC_UL320_.jpg",
        link: "https://www.amazon.in/ALCiS-Mens-Track-Jacket-ECMJKT00255-M_Black_M/dp/B07H8SLJHB/ref=sr_1_6974?qid=1679212026&s=apparel&sr=1-6974",
        ratings: "3.6",
        no_of_ratings: "20",
        discount_price: 1014.0,
        actual_price: 2899.0,
    },
    {
        id: 205,
        name: "Thule Summer Seat Liner",
        main_category: [8],
        sub_category: [15],
        image: "https://m.media-amazon.com/images/I/81jXkGkmmAS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Thule-Summer-Seat-Liner-Gray/dp/B09222V12W/ref=sr_1_5014?qid=1679220207&s=baby&sr=1-5014",
        ratings: "2.8",
        no_of_ratings: "2",
        discount_price: 0,
        actual_price: 9250.0,
    },
    {
        id: 206,
        name: "VIP Polyester Soft 26.5 inch SUITCASE(INVALID DATA_Blue)",
        main_category: [15],
        sub_category: [43],
        image: "https://m.media-amazon.com/images/I/71lz7mFnOvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Suknya-Polyester-Aristocrat-Strolly-Luggage/dp/B07QJBWLWW/ref=sr_1_1615?qid=1679218899&s=luggage&sr=1-1615",
        ratings: "5.0",
        no_of_ratings: "6",
        discount_price: 4498.0,
        actual_price: 11900.0,
    },
    {
        id: 207,
        name: "AWOKZA Trolley Home Folding Portable Ultra Light Multi-Function Mute 4-Wheel Trolley Car Shopping Cart Luggage Cart Truck ...",
        main_category: [15],
        sub_category: [43],
        image: "https://m.media-amazon.com/images/I/31KeH-GksPL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AWOKZA-Portable-Multi-Function-Shopping-Stainless/dp/B0BC961HL4/ref=sr_1_5123?qid=1679218934&s=luggage&sr=1-5123",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 1999.0,
        actual_price: 3999.0,
    },
    {
        id: 208,
        name: "INVU Polarized Round Women's Sunglasses - (T2701A|52|GREY Color Lens)",
        main_category: [2],
        sub_category: [30],
        image: "https://m.media-amazon.com/images/I/61vz4kujooL._AC_UL320_.jpg",
        link: "https://www.amazon.in/INVU-Polarized-Round-Womens-Sunglasses/dp/B077Y4WYTZ/ref=sr_1_10438?qid=1679211459&s=apparel&sr=1-10438",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 2959.0,
        actual_price: 3540.0,
    },
    {
        id: 209,
        name: "Our Brand Pack of 4 Pure Cotton Socks for Men and Women Comfortable and Durable Unisex Design with Reinforced Toes and Hee...",
        main_category: [2],
        sub_category: [30],
        image: "https://m.media-amazon.com/images/I/61dDKmrr9YL._AC_UL320_.jpg",
        link: "https://www.amazon.in/dp/B0BYVXRNHG/ref=sr_1_2857?qid=1679211397&s=apparel&sr=1-2857",
        ratings: 0,
        no_of_ratings: 0,
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 210,
        name: "Campus Men's LESTOR Running Shoes",
        main_category: [2],
        sub_category: [24],
        image: "https://m.media-amazon.com/images/I/71iSU7aorbL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-LESTOR-R-Slate-Running-Shoes/dp/B09Y9B6LP2/ref=sr_1_3243?qid=1679147302&s=shoes&sr=1-3243",
        ratings: "5.0",
        no_of_ratings: "1",
        discount_price: 1099.0,
        actual_price: 1599.0,
    },
    {
        id: 211,
        name: "Campus Men's Steve Running Shoes",
        main_category: [2],
        sub_category: [24],
        image: "https://m.media-amazon.com/images/I/41+vLE8tU-L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-Bt-Grn-Running-Shoes-9-5G-580/dp/B07ZQC2NLZ/ref=sr_1_9464?qid=1679147526&s=shoes&sr=1-9464",
        ratings: "3.5",
        no_of_ratings: "12",
        discount_price: 1329.0,
        actual_price: 1899.0,
    },
    {
        id: 212,
        name: "Fila Men's Memory Sportland Running Shoe",
        main_category: [2],
        sub_category: [24],
        image: "https://m.media-amazon.com/images/I/61SpTn95k9L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Fila-Memory-Sportland-Metallic-Silver/dp/B01015PBPW/ref=sr_1_6628?qid=1679149556&s=apparel&sr=1-6628",
        ratings: "4.4",
        no_of_ratings: "1521",
        discount_price: 0,
        actual_price: 8097.39,
    },
    {
        id: 213,
        name: "Campus Men's SUPRIMO Running Shoes",
        main_category: [2],
        sub_category: [24],
        image: "https://m.media-amazon.com/images/I/61glTX9lP3L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Campus-SUPRIMO-BLK-RED-Running-Shoes/dp/B084SYBJ4L/ref=sr_1_1929?qid=1679149389&s=apparel&sr=1-1929",
        ratings: "4.0",
        no_of_ratings: "51",
        discount_price: 1384.0,
        actual_price: 1899.0,
    },
    {
        id: 214,
        name: "Bodylastics Resistance Tube with Adjustable Length, Non-Slip Handles, High Density Door Anchor for Strength Training",
        main_category: [4], // Sports
        sub_category: [25], // Fitness Equipment
        image: "https://m.media-amazon.com/images/I/81I1m4LJuyL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Bodylastics-Resistance-Adjustable-Non-Slip-Strength/dp/B07WZJR9FQ/ref=sr_1_3094?qid=1679218053&s=sports&sr=1-3094",
        ratings: "4.1",
        no_of_ratings: "887",
        discount_price: 324.0,
        actual_price: 999.0,
    },
    {
        id: 215,
        name: "AJB Resistance Exercise Bands with Door Anchor, Handles, Waterproof Carry Bag, Legs Ankle Straps for Resistance Training, ...",
        main_category: [4],
        sub_category: [25],
        image: "https://m.media-amazon.com/images/I/61xz+W6Q7oL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AJB-Resistance-Exercise-Waterproof-Training/dp/B09BJG5CDT/ref=sr_1_9418?qid=1679218158&s=sports&sr=1-9418",
        ratings: "2.5",
        no_of_ratings: "3",
        discount_price: 499.0,
        actual_price: 999.0,
    },
    {
        id: 216,
        name: "Sturdy 5-Inch Baby Seat Strap Environmentally Stroller Safty Belt for Baby Chairs Strollers",
        main_category: [8], // Toys & Baby Products
        sub_category: [15], // Baby Gear
        image: "https://m.media-amazon.com/images/I/61GCCdFXqVL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Sturdy-5-Inch-Environmentally-Stroller-Strollers/dp/B0922X8HDS/ref=sr_1_5009?qid=1679220207&s=baby&sr=1-5009",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 217,
        name: "Thule Summer Seat Liner",
        main_category: [8],
        sub_category: [15],
        image: "https://m.media-amazon.com/images/I/81jXkGkmmAS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Thule-Summer-Seat-Liner-Gray/dp/B09222V12W/ref=sr_1_5014?qid=1679220207&s=baby&sr=1-5014",
        ratings: "2.8",
        no_of_ratings: "2",
        discount_price: 0,
        actual_price: 9250.0,
    },
    {
        id: 218,
        name: "VIP Polyester Soft 26.5 inch SUITCASE(INVALID DATA_Blue)",
        main_category: [15], // Travel & Outdoors
        sub_category: [43], // Luggage
        image: "https://m.media-amazon.com/images/I/71lz7mFnOvL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Suknya-Polyester-Aristocrat-Strolly-Luggage/dp/B07QJBWLWW/ref=sr_1_1615?qid=1679218899&s=luggage&sr=1-1615",
        ratings: "5.0",
        no_of_ratings: "6",
        discount_price: 4498.0,
        actual_price: 11900.0,
    },
    {
        id: 219,
        name: "AWOKZA Trolley Home Folding Portable Ultra Light Multi-Function Mute 4-Wheel Trolley Car Shopping Cart Luggage Cart Truck ...",
        main_category: [15],
        sub_category: [43],
        image: "https://m.media-amazon.com/images/I/31KeH-GksPL._AC_UL320_.jpg",
        link: "https://www.amazon.in/AWOKZA-Portable-Multi-Function-Shopping-Stainless/dp/B0BC961HL4/ref=sr_1_5123?qid=1679218934&s=luggage&sr=1-5123",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 1999.0,
        actual_price: 3999.0,
    },
    {
        id: 220,
        name: "INVU Polarized Round Women's Sunglasses - (T2701A|52|GREY Color Lens)",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/61vz4kujooL._AC_UL320_.jpg",
        link: "https://www.amazon.in/INVU-Polarized-Round-Womens-Sunglasses/dp/B077Y4WYTZ/ref=sr_1_10438?qid=1679211459&s=apparel&sr=1-10438",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 2959.0,
        actual_price: 3540.0,
    },
    {
        id: 221,
        name: "Our Brand Pack of 4 Pure Cotton Socks for Men and Women Comfortable and Durable Unisex Design with Reinforced Toes and Hee...",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/61dDKmrr9YL._AC_UL320_.jpg",
        link: "https://www.amazon.in/dp/B0BYVXRNHG/ref=sr_1_2857?qid=1679211397&s=apparel&sr=1-2857",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 0,
        actual_price: 0,
    },
    {
        id: 222,
        name: "Caseria Men's Round Neck Cotton Half Sleeved T-Shirt with Printed Graphics - Be Communist",
        main_category: [2],
        sub_category: [22],
        image: "https://m.media-amazon.com/images/I/61TfAdMX4VL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Caseria-Cotton-Graphic-Printed-T-Shirt/dp/B07JF6SBTB/ref=sr_1_18400?qid=1679140720&s=apparel&sr=1-18400",
        ratings: "4.8",
        no_of_ratings: "9",
        discount_price: 439.0,
        actual_price: 999.0,
    },
    {
        id: 223,
        name: "Midea 8KG/5KG 5 Star Inverter Fully Automatic Washer Dryer (MF100D80B/T-IN, Titanium Silver, Inbuilt Heater)",
        main_category: [3], // Home & Living (Assuming appliances fall here)
        sub_category: [2], // Kitchen Essentials (Closest related)
        image: "https://m.media-amazon.com/images/I/519zMS-E-+L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Midea-Inverter-Automatic-MF100D80B-Titanium/dp/B0BLZ8QYWR/ref=sr_1_609?qid=1679134422&s=kitchen&sr=1-609",
        ratings: "5.0",
        no_of_ratings: "2",
        discount_price: 38990.0,
        actual_price: 54990.0,
    },
    {
        id: 224,
        name: "Titan Purple: Glam it Up Analog Rose Gold Dial Women's Watch-2664WM01",
        main_category: [2], // Fashion
        sub_category: [23], // Women
        image: "https://m.media-amazon.com/images/I/71-P+q7HJLL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Titan-Purple-Analog-Womens-Watch-2664WM01/dp/B09V591WXN/ref=sr_1_1302?qid=1679155667&s=watches&sr=1-1302",
        ratings: "1.0",
        no_of_ratings: "1",
        discount_price: 0,
        actual_price: 4495.0,
    },
    {
        id: 225,
        name: "NEUTRON Royal Analog Black and Silver Color Dial Girls Watch - G653-GX3 (Pack of 2)",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/717O6Zvdt3L._AC_UL320_.jpg",
        link: "https://www.amazon.in/NEUTRON-Royal-Analog-Black-Silver/dp/B0BMW6GWRY/ref=sr_1_15134?qid=1679156164&s=watches&sr=1-15134",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 239.0,
        actual_price: 655.0,
    },
    {
        id: 226,
        name: "Janasya Women's Red Cotton Tunic",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/81Isuf5RcYS._AC_UL320_.jpg",
        link: "https://www.amazon.in/Janasya-Womens-Cotton-Tunic-Red_Large/dp/B0943J3JDV/ref=sr_1_3243?qid=1679153556&s=apparel&sr=1-3243",
        ratings: "4.2",
        no_of_ratings: "35",
        discount_price: 477.0,
        actual_price: 1499.0,
    },
    {
        id: 227,
        name: "Miss Chase Women's Multicolored Base-Light Blue Square Neck Short Puff Sleeve Bohemian Fit & Flare Georgette Midi Dress",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/81c40IwpAYL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Miss-Chase-Multicolored-Base-Light-MCAW22D98-03-283-02/dp/B0BSQ6TL7L/ref=sr_1_9464?qid=1679153786&s=apparel&sr=1-9464",
        ratings: "0",
        no_of_ratings: "0",
        discount_price: 1198.0,
        actual_price: 2995.0,
    },
    {
        id: 228,
        name: "Zacharias Women's Fishermen Bucket Cotton Printed Cap Hat FC-02 (Multicolor; Free Size) (Pack of 1)",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/81avqEzg09L._AC_UL320_.jpg",
        link: "https://www.amazon.in/Zacharias-Womens-Fishermen-Printed-Multicolor/dp/B08X7B7NYV/ref=sr_1_18694?qid=1679212347&s=apparel&sr=1-18694",
        ratings: "3.2",
        no_of_ratings: "7",
        discount_price: 299.0,
        actual_price: 999.0,
    },
    {
        id: 229,
        name: "Hannah White Marble Dial Grey Watch",
        main_category: [2],
        sub_category: [23],
        image: "https://m.media-amazon.com/images/I/61oGZ+CQcwL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Joker-Witch-Hannah-White-Marble/dp/B086GRSCXC/ref=sr_1_4560?qid=1679212193&s=apparel&sr=1-4560",
        ratings: "4.2",
        no_of_ratings: "15",
        discount_price: 799.0,
        actual_price: 3199.0,
    },
    {
        id: 230,
        name: "Yonex 1445C Round Neck T-Shirt for Men",
        main_category: [4], // Sports
        sub_category: [27], // Indoor Sports (assuming T-Shirt for indoor sport)
        image: "https://m.media-amazon.com/images/I/61TOentwjhL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Yonex-1445C-Round-Neck-T-Shirt/dp/B09ZJ2GBZN/ref=sr_1_2590?qid=1679217883&s=sports&sr=1-2590",
        ratings: "3.8",
        no_of_ratings: "8",
        discount_price: 0,
        actual_price: 850.0,
    },
    {
        id: 231,
        name: "Madmax Compression Unisex Cycling Short for Yoga Multi Sports Gym Fitness Cycling Athletics Indoor & Outdoor Sports wear",
        main_category: [4],
        sub_category: [25], // Fitness Equipment (closest related)
        image: "https://m.media-amazon.com/images/I/41Jz6zLXXlL._AC_UL320_.jpg",
        link: "https://www.amazon.in/Madmax-Compression-Cycliing-Fitness-Athletics/dp/B08SM8RMP3/ref=sr_1_3546?qid=1679217900&s=sports&sr=1-3546",
        ratings: "4.2",
        no_of_ratings: "3",
        discount_price: 300.0,
        actual_price: 480.0,
    },
];

module.exports = data;
