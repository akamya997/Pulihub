import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.accessKeyId!,
    secretAccessKey: process.env.secretAccessKey!,
  },
});

export const testaws = async () => {
  const command = new GetObjectCommand({
    Bucket: "akamya-cloud",
    Key: "Resource/Live/sc_5th_day1/test.txt",
  });
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    console.log(url);
  } catch (err) {
    console.error(err);
  }
};
