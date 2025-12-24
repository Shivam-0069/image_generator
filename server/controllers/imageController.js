import { response } from "express";
import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
    try {
        const { prompt, userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: "missing details" });
        }

        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({
                success: false,
                 creditBalance: user.creditBalance,
                message: "insufficient credits"
               
            });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        res.json({
            success: true,
            message: "image generated",
             creditBalance: updatedUser.creditBalance,
            resultImage,
           
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default generateImage;
