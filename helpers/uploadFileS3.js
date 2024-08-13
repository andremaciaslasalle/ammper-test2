import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { credentials } from "./credentials";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials
});

export const uploadFileToS3 = async (file) => {
    const params = {
      Bucket: 'ammper-dev',
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };
  
    try {
      await s3Client.send(new PutObjectCommand(params));
      return `https://${params.Bucket}.s3.amazonaws.com/${encodeURIComponent(params.Key)}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  };
  