const userRoutes = require("./userRoutes");
const managerRoutes = require("./managerRouter");
const adminRoutes = require("./adminRoute");
const passportRoutes = require("./passportRouter");
const sellingRoutes = require("./sellingRouter");

module.exports = (app, passport) => {
    app.use("/api/admin", adminRoutes);
    app.use("/api/manager", managerRoutes);
    app.use("/api/sellingmanager", sellingRoutes);
    app.use("/api/copywrite", userRoutes);
    app.use("/api/analitic", userRoutes);
    app.use("/api/auth", passportRoutes(passport));
};
