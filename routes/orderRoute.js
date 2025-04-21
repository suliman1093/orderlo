const express = require('express');
const {createCashOrder,getOrders
    ,createFilterObj
    ,getOrder
    ,checkIfUserIsOwnerOfOrder,updateOrderToPaid,updateOrderToDelivered} = require('../services/orderService');
const {protect,allowTo} = require('../services/authService');

const router = express.Router();


router.route("/:cartId").post(protect,allowTo("user"),createCashOrder);
router.route("/").get(protect,allowTo("user","admin"),createFilterObj,getOrders);
router.route("/:id").get(protect,allowTo("user","admin"),checkIfUserIsOwnerOfOrder,getOrder);
router.route("/:id/pay").put(protect,allowTo("admin"),updateOrderToPaid);
router.route("/:id/deliver").put(protect,allowTo("admin"),updateOrderToDelivered);
module.exports = router;
