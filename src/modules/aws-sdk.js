import S3 from 'react-aws-s3-typescript'
import config from '../config.json'

window.Buffer = window.Buffer || require("buffer").Buffer;

const bucketConfig = {
    bucketName: 'krayo-filestorage',
    region: 'ap-south-1',
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretAccessKey
}

const ReactS3Client = new S3(bucketConfig)

export default ReactS3Client