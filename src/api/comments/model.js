import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const schema = new Schema(
  {
    owner: {
      ip: {
        type: String,
        required: false
      },
      gravatar: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    pageUrl: {
      type: String,
      required: true
    },
    pageId: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    secret: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

schema.methods.insert = function (data) {
  this.owner.gravatar = crypto.createHash('md5').update(data.owner.email).digest('hex');
  this.owner.email = data.owner.email;
  this.owner.name = data.owner.name;
  this.pageUrl = data.pageUrl;
  this.pageId = data.pageId;
  this.body = data.body;
  this.secret = crypto.randomBytes(20).toString('hex');
  return this;
};

const model = mongoose.model('Comment', schema);
export default model;
