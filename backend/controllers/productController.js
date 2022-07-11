const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Product = require('../models/Product')
const AddonGroup = require('../models/AddonGroup')
const VariantGroup = require('../models/VariantGroup')
const Variant = require('../models/Variant')
const Tax = require('../models/Tax')
const Category = require('../models/Category')

exports.getProductList = async function (req, res) {
    try {
        var productList = await Product.getProductList()
        for (let item of productList) {
            item.taxInfo = await Tax.getTax(item.taxId)
            item.categoryInfo = await Category.getCategory(item.categoryId)
            item.addonGroupList = await AddonGroup.getAddonGroupsByProductId(item.Id)
            item.variantGroupList = await VariantGroup.getVariantGroupsByProductId(item.Id)
            item.baseVariantInfo = await Variant.getVariant(item.baseVariantId)
        }
        res.status(200).json({
            productList: productList,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.getProduct = async function (req, res) {
    try {
        var product = await Product.getProduct(req.params.id)
        product.addonGroupList = await AddonGroup.getAddonGroupsByProductId(product.Id)
        product.variantGroupList = await VariantGroup.getVariantGroupsByProductId(product.Id)
        product.taxInfo = await Tax.getTax(product.taxId)
        product.categoryInfo = await Category.getCategory(product.categoryId)
        product.baseVariantInfo = await Variant.getVariant(product.baseVariantId)
        res.status(200).json({
            product: product
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.createProduct = async function (req, res) {
    try {
        var info = {
            name: req.body.name,
            price: req.body.price,
            // taxId: req.body.taxId
        }
        var baseVariantId = await Variant.createVariant(info)

        info = {
            name: req.body.name,
            price: req.body.price,
            taxId: req.body.taxId,
            categoryId: req.body.categoryId,
            baseVariantId: baseVariantId
        }

        var productId = await Product.createProduct(info)

        if (req.body.addonGroupList.length > 0) {
            req.body.addonGroupList.forEach(async (id) => {
                await AddonGroup.editAddonGroup({ productId: productId }, id)
            })
        }

        if (req.body.variantGroupList.length > 0) {
            req.body.variantGroupList.forEach(async (id) => {
                await VariantGroup.editVariantGroup({ productId: productId }, id)
            })
        }

        var product = await Product.getProduct(productId)
        product.addonGroupList = await AddonGroup.getAddonGroupsByProductId(product.Id)
        product.variantGroupList = await VariantGroup.getVariantGroupsByProductId(product.Id)
        product.taxInfo = await Tax.getTax(product.taxId)
        product.categoryInfo = await Category.getCategory(product.categoryId)
        product.baseVariantInfo = await Variant.getVariant(baseVariantId)

        res.status(200).json({
            product: product,
            success: true,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.editProduct = async function (req, res) {
    try {
        var productId = req.body.Id
        var data = {
            name: req.body.name,
            price: req.body.price,
            taxId: req.body.taxId,
            status: req.body.status,
            categoryId: req.body.categoryId
        }
        await Product.editProduct(data, productId)
        data = {
            name: req.body.name,
            price: req.body.price,
        }
        await Variant.editVariant(data, req.body.baseVariantId)

        await AddonGroup.editAddonGroupByProductId({ productId: null }, productId)
        await VariantGroup.editVariantGroupByProductId({ productId: null }, productId)

        if (req.body.addonGroupList.length > 0) {
            req.body.addonGroupList.forEach(async (id) => {
                await AddonGroup.editAddonGroup({ productId: productId }, id)
            })
        }

        if (req.body.variantGroupList.length > 0) {
            req.body.variantGroupList.forEach(async (id) => {
                await VariantGroup.editVariantGroup({ productId: productId }, id)
            })
        }

        var product = await Product.getProduct(productId)
        product.addonGroupList = await AddonGroup.getAddonGroupsByProductId(product.Id)
        product.variantGroupList = await VariantGroup.getVariantGroupsByProductId(product.Id)
        product.taxInfo = await Tax.getTax(product.taxId)
        product.categoryInfo = await Category.getCategory(product.categoryId)
        product.baseVariantInfo = await Variant.getVariant(product.baseVariantId)

        res.status(200).json({
            product: product
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.deleteProduct = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async (id) => {
            let product = await Product.getProduct(id)
            await Variant.deleteVariant(product.baseVariantId)
            await Product.deleteProduct(id)
            await AddonGroup.editAddonGroupByProductId({ productId: null }, id)
            await VariantGroup.editVariantGroupByProductId({ productId: null }, id)
        });
        res.status(200).json({
            success: true,
            numDelete: idList.length
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.searchProduct = async function (req, res) {
    try {
        var searchString = req.body.searchString
        var productList = await Product.searchProduct(searchString)
        for (let item of productList) {
            item.taxInfo = await Tax.getTax(item.taxId)
            item.addonGroupList = await AddonGroup.getAddonGroupsByProductId(item.Id)
            item.variantGroupList = await VariantGroup.getVariantGroupsByProductId(item.Id)
            item.categoryInfo = await Category.getCategory(item.categoryId)
        }
        res.status(200).json({
            success: true,
            productList: productList
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};