import DeliveryAddress from '../models/deliveryAddressModel.js'
import { validationResult } from 'express-validator';

// @desc create a delivery address
// @route POST /api/deliveryAddress
// @access Private 

const createDeliveryAddress = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        var { name, phone, address } = req.body

        var user = req.user._id
        var newDeliveryAddress = {
            name,
            phone,
            address
        }
        var deliveryAddressExist = await DeliveryAddress.findOne({ user: user })
        if (deliveryAddressExist) {
            var listAddress = deliveryAddressExist.list
            for (let i = 0; i < listAddress.length; i++) {
                if (JSON.stringify(listAddress[i].address) === JSON.stringify(newDeliveryAddress.address)) {
                    return res.status(400).json("delivery address exist, try again")
                }
            }
            deliveryAddressExist.list.push(newDeliveryAddress)
            await deliveryAddressExist.save()
            return res.status(200).json("add other delivery address success")
        } else {
            var firstDeliveryAddress = await DeliveryAddress.create({
                user,
                list: [newDeliveryAddress]
            })
            if (firstDeliveryAddress) {
                return res.status(200).json("add first delivery address success")
            } else {
                return res.status(400).json("fail to add delivery address, try again")
            }
        }


    } catch (error) {
        return res.status(400).json("fail to add delivery address, try again")
    }
}

// @desc create a delivery address
// @route Get /api/deliveryAddress
// @access Private 

const getDeliveryAddressList = async (req, res, next) => {
    try {

        var user = req.user._id
        var deliveryAddressList = await DeliveryAddress.findOne({ user: user }).select("-user -_id")
        if (deliveryAddressList) {
            return res.status(200).json(deliveryAddressList)
        } else {
            return res.status(400).json("fail get list delivery address, try again")
        }


    } catch (error) {
        return res.status(400).json("fail get list delivery address, try again")
    }
}

// @desc create a delivery address
// @route Delete /api/deliveryAddress/deleteDeliveryAddress
// @access Private 

const deleteDeliveryAddress = async (req, res, next) => {
    try {

        var item = req.query.item || 1
        var user = req.user._id
        var deliveryAddressList = await DeliveryAddress.findOne({ user: user }).select("-user -_id")

        if (deliveryAddressList) {

            const { list } = deliveryAddressList
            const newList = list.filter((ele, index) => index !== (parseInt(item) - 1))

            const response = await DeliveryAddress.updateOne(
                { user: user },
                { list: newList },
            );

            if (response) return res.status(200).json({ message: 'success' });

            return res.status(400).json("fail to delete one delivery address, try again")
        } else {
            return res.status(400).json("Do not have address to delete")
        }

    } catch (error) {
        return res.status(400).json("fail to delete one delivery address, try again")
    }
}


// @desc update a delivery address
// @route PUT /api/deliveryAddress/:item
// @access Private 

const updateDeliveryAddress = async (req, res, next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
      
        var item = Number(req.params.item)
        if (item) {
            
            var { name, phone, address } = req.body
            var user = req.user._id
            var newDeliveryAddress = {
                name,
                phone,
                address
            }
            
            var deliveryAddressExist = await DeliveryAddress.findOne({ user: user })
            
            if (deliveryAddressExist) {
                if (item >= 1) {
                    deliveryAddressExist.list[item - 1] = newDeliveryAddress
                    await deliveryAddressExist.save()
                    return res.status(200).json("update delivery address success")
                }
            }
        }

        return res.status(400).json("fail to update delivery address, try again")

    } catch (error) {      
        return res.status(400).json("fail to update delivery address, try again")
    }
}

export { createDeliveryAddress, getDeliveryAddressList, deleteDeliveryAddress, updateDeliveryAddress }