import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Permission from "./models/Permission.js";

connectDB();

const newUsers = [
    {
        name: "Jon Collins",
        email: "jc@test.com",
        password: "123password"
    },{
        name: "Testy McTesterson",
        email: "testy@test.com",
        password: "123password"
    },{
        name: "Blueberry Millieton",
        email: "mydogs@test.com",
        password: "123password"
    }
];
const products = [
    {
        name: "Steamdeck OLED 1TB",
        description: "The nextgen handheld PC by Valve with a beautiful 7.4 inch antireflective OLED panel",
        price: 649.99,
        stock: 12,
        statusActive: true
    },{
        name: "Steamdeck LCD 512GB",
        description: "The handheld PC by Valve that changed it all, with a beautiful 7 inch glossy LCD panel",
        price: 449.99,
        stock: 0,
        statusActive: false
    },{
        name: "NESPI Retro Emulator Kit",
        description: "A raspi 4 prebuilt in a NESPI case with active cooling. RetroArch is preinstalled.",
        price: 129.99,
        stock: 21,
        statusActive: true
    }
]

let upseed = [
    {
        user: {},
        permissions: {
            viewUsers: true,
            viewProducts: true,
            viewPermissions: true
        }
    },{
        user: {},
        permissions: {
            viewUsers: false,
            viewProducts: true,
            viewPermissions: false
        }
    },{
        user: {},
        permissions: {
            viewUsers: false,
            viewProducts: false,
            viewPermissions: false
        }
    }
]

const importData = async () => {
    try {
        await User.deleteMany();
        await User.insertMany(newUsers);
        await Product.deleteMany();
        await Product.insertMany(products);
        await Permission.deleteMany();
        const users = await User.find({});
        users.forEach((u,i) => {
            let userObj = {id: u._id, name: u.name};
            upseed[i].user = userObj;
        })
        await Permission.insertMany(upseed);
        console.log('db data was imported successfully...');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        console.log('db data was destroyed...');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}