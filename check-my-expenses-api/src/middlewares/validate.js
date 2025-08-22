import { validationResult } from "express-validator";

/**
 * Wraps an array of express-validator rules into a single middleware.
 * Example: router.post('/route', validate(rules), handler)
 */
export function validate(rules) {
    return async (req, res, next) => {
        await Promise.all(rules.map((rule) => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors.array(), // [{ msg, param, location, ... }]
            });
        }
        next();
    };
}