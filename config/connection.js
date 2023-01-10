// const mongoose = require('mongoose');


// const connectDB = async () => {
//   try {
//     mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mglDB', {
//       useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       // useCreateIndex: true,
//       // useFindAndModify: false
//     });
//     console.log('DB connection')
//   } catch (error) {
//     console.log(`Error: ${ error.message }`.red.underline.bold);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mglDB');
mongoose.set('strictQuery', false);

module.exports = mongoose.connection;

