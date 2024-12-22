import app from './app';
import config from './config';
import connectDB from './config/db';

async function main() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
