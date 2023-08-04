const apiVali = (req, res, next) => {
    const { api_key } = req.headers;

    if (api_key !== process.env.api_key) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = apiVali;