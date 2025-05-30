const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');
const sendEmail = require('./emailController');
const { generateRefreshToken } = require('../config/refreshToken');
const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const uniqid = require('uniqid');
const { Error } = require('mongoose');
// create user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    // console.log(email,!findUser);
    if (!findUser) {
        //create new user

        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error('User Already Exists');
    }
}
);

// login user
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser.id,
            { refreshToken: refreshToken },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            role: findUser?.role,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});

//Admin login 
const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email: email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorized");
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateUser = await User.findByIdAndUpdate(
            findAdmin.id,
            { refreshToken: refreshToken },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            role: findAdmin?.role,
            token: generateToken(findAdmin?._id)
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookie');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error('Invalid Refresh Token');
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {

        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token');
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken })
    })
});


// Logout functionality

const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookie');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204); // forbidden
    }
    console.log(refreshToken);
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(204); // forbidden

    // res.json({ message: 'Logged Out' });
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        throw new Error(error);
    }
});


// Get Single user

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete user

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

// Update user

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true,

        });

        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

//Save user address

const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,

        }, {
            new: true,

        });

        res.json(user);
    } catch (error) {
        throw new Error(error);
    }

})
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const block = await User.findByIdAndUpdate(id, { isBlocked: true }, {
            new: true,
        });
        res.json(block);
    } catch (error) {
        throw new Error(error);
    }
})
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const unblock = await User.findByIdAndUpdate(id, { isBlocked: false }, {
            new: true,
        });
        res.json(unblock);
    } catch (error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found with this email');
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            subject: 'Forgot Password Link',
            text: 'Hey User',
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error('Token Expired, Please try again later');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate('wishlist');
        res.json(findUser);
    } catch (error) {
        throw new Error(error)
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {

        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            quantity,
            price
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {

    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.find({ userId: _id }).populate("productId").populate("color");
        res.json(cart);
    } catch (error) {
        throw new Error(error)
    }
});

const removeProductCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.body;
    validateMongoDbId(_id);
    try {

        const deleteProdFromCart = await Cart.deleteOne({ userId: _id, _id: cartItemId })
        res.json(deleteProdFromCart);
    } catch (error) {
        throw new Error(error);
    }
})
const updateProductQuentityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } = req.body;
    console.log(newQuantity)
    validateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId })
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body.data;
    const { _id } = req.user;
    try {
        // console.log(req.body,shippingInfo)

        const order = await Order.create({ shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo, user: _id });
        res.json({
            order,
            success: true
        });
    } catch (error) {
        throw new Error(error);
    }
})

// const emptyCart = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     validateMongoDbId(_id);
//     try {
//         const user = await User.findOne({ _id });
//         const cart = await Cart.findOneAndDelete({ orderby: user._id });
//         res.json(cart);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// const applyCoupon = asyncHandler(async (req, res) => {
//     const { coupon } = req.body;
//     const { _id } = req.user;
//     validateMongoDbId(_id);
//     const validCoupon = await Coupon.findOne({ name: coupon });
//     if (validCoupon == null) {
//         throw new Error("Invalid Coupon");
//     }
//     const user = await User.findOne({ _id });
//     let { products, cartTotal } = await Cart.findOne({
//         orderby: user._id,
//     }).populate("products.product");
//     let totalAfterDiscount = (
//         cartTotal -
//         (cartTotal * validCoupon.discount) / 100
//     ).toFixed(2);
//     await Cart.findOneAndUpdate(
//         { orderby: user._id },
//         { totalAfterDiscount },
//         { new: true }
//     );
//     res.json(totalAfterDiscount);
// });

// const createOrder = asyncHandler(async (req, res) => {
//     const { COD, couponApplied } = req.body;
//     const { _id } = req.user;
//     validateMongoDbId(_id);
//     try {
//         if (!COD) throw new Error("Create case order failed");
//         const user = await User.findById(_id);
//         let userCart = await Cart.findOne({ orderby: user._id });
//         let finalAmount = 0;

//         if (couponApplied && userCart.totalAfterDiscount) {
//             finalAmount = userCart.totalAfterDiscount;
//         } else {
//             finalAmount = userCart.cartTotal;
//         }

//         let newOrder = await new Order({
//             products: userCart.products,
//             paymentIntent: {
//                 id: uniqid(),
//                 method: "COD",
//                 amount: finalAmount,
//                 status: "Cash On Delivery",
//                 created: Date.now(),
//                 currency: "usd",
//             },
//             orderby: user._id,
//             orderStatus: "Cash On Delivery",
//         }).save();

//         let update = userCart.products.map((item) => {
//             return {
//                 updateOne: {
//                     filter: { _id: item.product._id },
//                     update: { $inc: { quantity: -item.count, sold: +item.count } },
//                 },
//             };
//         });

//         const updated = await Product.bulkWrite(update, {});
//         res.json({ message: "success" });

//     } catch (error) {
//         throw new Error(error)
//     }
// });

// const getOrders = asyncHandler(async (req, res) => {
//     const { _id, role } = req.user;
//     validateMongoDbId(_id);
//     try {
//         let userOrders;
//         if (role === 'admin') {
//             // If user is admin, get all orders
//             userOrders = await Order.find().populate("products.product").populate("orderby").exec();
//         } else {
//             // If regular user, get only their orders
//             userOrders = await Order.findOne({ orderby: _id }).populate("products.product").exec();
//         }
//         res.json(userOrders);
//     } catch (error) {
//         throw new Error(error);
//     }
// });
// const getOrderByUserId = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id);
//     try {
//         let userOrders = await Order.find({ _id: id }).populate("products.product").populate("orderby").exec();

//         res.json(userOrders);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     const { id } = req.params;
//     validateMongoDbId(id);
//     try {
//         const updateOrderStatus = await Order.findByIdAndUpdate(id, {
//             orderStatus: status,
//             paymentIntent: {
//                 status: status
//             }
//         }, { new: true });
//         res.json(updateOrderStatus);
//     } catch (error) {
//         throw new Error(error);
//     }
// });


module.exports = {
    createUser,
    removeProductCart,
    updateProductQuentityFromCart,
    // updateOrderStatus,
    // getOrders,
    saveAddress,
    createOrder,
    // getOrderByUserId,
    // emptyCart,
    // applyCoupon,
    getUserCart,
    userCart, 
    loginUser, 
    getallUser, 
    getaUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logoutUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList
};