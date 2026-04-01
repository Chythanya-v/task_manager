
import { hashSync } from "bcrypt";
import { prisma } from "../prisma.js";

export const signup = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);

    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    user = await prisma.user.create({
        data: {
            email,
            password: hashSync(password, 10)
        }
    });

    return res.status(201).json({ message: "User created successfully", user });
};
