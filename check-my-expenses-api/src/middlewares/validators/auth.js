import { check } from "express-validator";

export const registrationRules = [
    check("login")
        .exists({ checkFalsy: true }).withMessage("Login is required")
        .isString().withMessage("Login must be a string")
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Login can't be less than 3 or more than 50 symbols"),

    check("password")
        .exists({ checkFalsy: true }).withMessage("Password is required")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 5, max: 100 })
        .withMessage("Password can't be less than 5 or more than 100 symbols"),
];

export const loginRules = [
    check("login")
        .exists({ checkFalsy: true }).withMessage("Login is required")
        .isString().withMessage("Login must be a string")
        .trim(),

    check("password")
        .exists({ checkFalsy: true }).withMessage("Password is required")
        .isString().withMessage("Password must be a string"),
];