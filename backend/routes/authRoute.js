const express = require('express');
const { createUser, loginUser, getallUser, saveAddress, getaUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logoutUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, getOrderByUserId, removeProductCart, updateProductQuentityFromCart } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { checkout, paymentVerification } = require('../controller/paymentController');
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout",authMiddleware,checkout);
router.post("/order/paymentVerification",authMiddleware,paymentVerification)
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/forgot-pass-token", forgotPasswordToken);
router.post("/cart/create-order", authMiddleware,createOrder);

router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
// router.put("/order/update-order/:id", authMiddleware,isAdmin, updateOrderStatus);


router.get("/logout", logoutUser);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", getallUser);
router.get("/single-user/:id", authMiddleware, isAdmin, getaUser);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
// router.get("/get-orders", authMiddleware, getOrders);
// router.post("/getorderbyuser/:id", authMiddleware, getOrderByUserId);



// router.delete("/empty-cart", authMiddleware, emptyCart);
router.post("/delete-product-cart", authMiddleware, removeProductCart);
router.post("/update-product-cart", authMiddleware, updateProductQuentityFromCart);
router.delete("/delete-user/:id", deleteUser);


router.put("/update-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);


module.exports = router;