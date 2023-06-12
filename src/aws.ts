import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

function getCredentials() {
  if (process.env.accessKeyId == null || process.env.secretAccessKey == null) {
    throw Error("AWS Credential is not set in .env");
  }
  return {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  };
}

const client = new S3Client({
  region: "ap-northeast-1",
  credentials: getCredentials(),
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
