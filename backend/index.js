const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())
const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const categoryRouter = require('./routes/prodCategotyRoute');
const blogCategoryRouter = require('./routes/blogCatRoute');
const brandRouter = require('./routes/brandRoute');
const couponRouter = require('./routes/couponRoute');
const colorRouter = require('./routes/colorRoute');
const enqRouter = require('./routes/enqRoute');
const uploadRouter = require('./routes/uploadRoute');

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/blogcategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/color', colorRouter);
app.use('/api/enquiry', enqRouter);
app.use('/api/upload', uploadRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
