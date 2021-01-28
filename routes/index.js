const userRoutes = require("./userRoutes");
const managerRoutes = require("./managerRouter");
const adminRoutes = require("./adminRoute");
const passportRoutes = require("./passportRouter");

module.exports = (app, passport) => {
    app.use("/api/admin", adminRoutes);
    app.use("/api/manager", managerRoutes);
    app.use("/api/copywrite", userRoutes);
    app.use("/api/analitic", userRoutes);
    app.use("/api/selling", userRoutes);
    app.use("/api/auth", passportRoutes(passport));
};
