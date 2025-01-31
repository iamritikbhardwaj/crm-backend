import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadOnS3 = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName, // File name to save in S3
        Body: fileContent,
        ACL: "public-read", // Make file publicly accessible (optional)
      };

      try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded to S3:', data.Location);
        return data.Location; // Return the URL of the uploaded file
      } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
      }
}