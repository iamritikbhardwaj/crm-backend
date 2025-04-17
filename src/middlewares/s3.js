import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

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
    const data = await new Upload({
      client: s3,
      params,
    }).done();
    console.log("File uploaded to S3:", data.Location);
    fs.unlinkSync(filePath);
    return data.Location; // Return the URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    fs.unlinkSync(filePath);
    throw error;
  }
};

// async function deleteFilesFromS3(urls) {
//   const objectsToDelete = urls.map((s3Url) => {
//     const { bucketName: , fileKey } = parseS3Url(s3Url);
//     return { Key: fileKey };
//   });
// }

// export default deleteFilesFromS3;
