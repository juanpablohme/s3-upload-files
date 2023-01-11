const { uploadToBucket } = require('../helpers/s3');

const upload = async (req, res) => {
  console.log(req);
  const bucket = req.body.bucket;
  const file = req.files.file;

  const result = await uploadToBucket(bucket, file);

  res.json(result);
};

module.exports = {
  upload
}