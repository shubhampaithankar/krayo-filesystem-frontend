import AWS from 'aws-sdk'
import config from '../config.json'

const S3_BUCKET ='krayo-filestorage'
const REGION ='ap-south-1'

AWS.config.update({
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretAccessKey
})

const bucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

export { bucket }