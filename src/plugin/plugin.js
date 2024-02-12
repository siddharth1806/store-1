import moment from 'moment';

export const momentTimeStampPlugin = (schema) => {
  schema.pre('save', function timeStamp(next) {
    this.updatedAt = moment.now();
    this.createdAt = moment.now();
    next();
  });

  schema.pre('updateOne', function timeStamp(next) {
    this.update({}, { $set: { updatedAt: moment.now() } });
    next();
  });
};

